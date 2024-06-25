'use server';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import { FormType, schoolCicles } from './types';
import { env } from 'process';
import { body } from './template';

const client = new google.auth.JWT(
	env.GOOGLE_SERVICE_EMAIL,
	null,
	env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
	['https://www.googleapis.com/auth/spreadsheets'],
);
const sheets = google.sheets({ version: 'v4', auth: client });

const port = parseInt(env.EMAIL_SERVER_PORT);
const transporter = nodemailer.createTransport({
	host: env.EMAIL_SERVER_HOST,
	port: port,
	secure: port === 465,
	auth: {
		user: env.EMAIL_SERVER_USER,
		pass: env.EMAIL_SERVER_PASSWORD,
	},
});

export async function submit(data:FormType):Promise<{success:boolean, message:string}> {
	'use server';

	data.submissionDate = (new Date).toISOString();

	const emails = data.email.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@;, \t\r\n]+/);
	if (emails === null || emails.length === 0) {
		return { success: false, message: 'Email inválido' };
	}

	const extractedCycles = schoolCicles.map(cicle => [cicle, data[cicle].hasCicle ? JSON.stringify({ ...data[cicle], hasCicle: undefined }) : false]);
	const newCalendar = { ...data.calendar, vacations: data.calendar.vacations.filter((d:any) => d !== null && d[0] != null && d[1] != null) };
	// make sure we don't pass null items, if some smartypants makes requests manually
	const toSubmit = [data.id,
		data.correctLocation,
		data.submissionDate,
		data.postal_code,
		data.email,
		data.phone,
		data.url,
		data.comment,
		data.calendar.cycleFrequency,
		data.calendar.dates[0] ? data.calendar.dates[0][0] : '',
		data.calendar.dates[0] ? data.calendar.dates[0][1] : '',
		data.calendar.dates[1] ? data.calendar.dates[1][0] : '',
		data.calendar.dates[1] ? data.calendar.dates[1][1] : '',
		data.calendar.dates[2] ? data.calendar.dates[2][0] : '',
		data.calendar.dates[2] ? data.calendar.dates[2][1] : '',
		JSON.stringify(newCalendar.vacations),
		...extractedCycles.map(c => c[1])]
		.map(v => v == null ? '' : v);

	try {
		await sheets.spreadsheets.values.append({
			spreadsheetId: process.env.GOOGLE_SHEET_ID,
			range: `Submissions`,
			valueInputOption: 'RAW',
			requestBody: {
				values: [toSubmit],
			},
		});
	} catch (e) {
		console.error(e);
		return { success: false, message: e.toString() };
	}

	const fmtDate = (d:Date) => `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;

	const schoolCyclesHeader = ['Pré-escolar', '1º Ciclo', '2º Ciclo', '3º Ciclo', 'Secundário', 'Ensino Profissional', 'Ensino Especial', 'Ensino Artístico', 'Ensino Superior', 'Outro'];
	const to = emails[0];
	const mail = await transporter.sendMail({
		from: env.EMAIL_FROM,
		to: to,
		subject: 'Confirmação de submissão de calendário escolar',
		html: body({
			body: `<p style="margin-bottom:0">Localização correta: ${data.correctLocation}<br>
		Código postal: ${data.postal_code}<br>
		E-mail: ${data.email}<br>
		Telefone: ${data.phone}<br>
		Website: ${data.url}<br>
		Tipo de calendário: ${data.calendar.cycleFrequency === 'semester' ? 'Semestre' : 'Trimestre'}<br>
		${data.calendar.dates.map((d, i) => `${data.calendar.cycleFrequency === 'semester' ? 'Semestre' : 'Trimestre'} ${i + 1}: ${fmtDate(d[0])} a ${fmtDate(d[1])}`).join('<br>')}<br>
		Férias: ${newCalendar.vacations.length > 0 ? newCalendar.vacations.map((d:any) => `${d[0]} a ${d[1]}`).join('<br>') : 'Nenhuma preenchida'}<br>
		${schoolCicles.map((c, i) => data[c].hasCicle ? `${schoolCyclesHeader[i]}:
			<div style="padding-left:10px">Manhã: ${data[c].morningEntry} até ${data[c].morningExit}</div>
			<div style="padding-left:10px">Tarde: ${data[c].afternoonEntry} até ${data[c].afternoonExit}</div>` : null).filter(v => v !== null).join('<br>')}<br>
		Comentário: ${data.comment}
		</p>`,
		}),
	});
	console.log('Sent confirmation email to', to);
	return { success: true, message: `E-mail de confirmação enviado para ${to}` };
}