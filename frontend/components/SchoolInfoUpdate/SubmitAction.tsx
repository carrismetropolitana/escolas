'use server'
import { google } from 'googleapis';
import { FormType, schoolCicles } from './types';

const client = new google.auth.JWT(
	process.env.GOOGLE_SERVICE_EMAIL,
	null,
	process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
	['https://www.googleapis.com/auth/spreadsheets']
);
const sheets = google.sheets({version: 'v4',auth:client});

export async function submit(data:FormType):Promise<{success:boolean,error?:string}> {
	"use server"

	data.submissionDate = new Date().toISOString()

	const extractedCycles = schoolCicles.map((cicle)=>[cicle,data[cicle].hasCicle ? data[cicle].type+";"+data[cicle].entry+";"+data[cicle].exit : false])

	// make sure we don't pass null items, if some smartypants makes requests manually
	const toSubmit = [data.id,data.correctLocation,data.submissionDate,data.postal_code,data.email,data.phone,data.url,data.comment,...extractedCycles.map((c)=>c[1])]
	.map((v)=>v==null?"":v)

	try{
		await sheets.spreadsheets.values.append({
			spreadsheetId: process.env.GOOGLE_SHEET_ID,
			range: `Submissions`,
			valueInputOption: 'RAW',
			requestBody: {
				values: [toSubmit]
			}
		});
	} catch (e) {
		console.error(e)
		return {success:false,error:e.toString()}
	}

	return {success:true}
}