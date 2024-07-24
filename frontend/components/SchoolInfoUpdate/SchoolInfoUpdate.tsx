'use client';
import BackHome from '@/components/BackHome/BackHome';
import Titles from '@/components/Titles/Titles';
import SchoolInfoUpdateMap from '../SchoolInfoUpdateMap/SchoolInfoUpdateMap';
// import { submit } from './SubmitAction';
import { Button, Loader, Modal, Paper, PasswordInput, SegmentedControl, Stack, Text, TextInput, Textarea, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import { useState } from 'react';
import { SchoolInfoUpdateCalendar } from '../SchoolInfoUpdateCalendar/SchoolInfoUpdateCalendar';
import SchoolCycleItem from './SchoolCycleItem';
import styles from './SchoolInfoUpdate.module.css';
import { isPasswordCorrect, submit } from './SubmitAction';
import { FormType, SchoolCicle, SchoolCicleObjects, SchoolData, schoolCicles } from './types';
import { FormValidateInput } from '@mantine/form/lib/types';
import { useRouter } from 'next/navigation';

export default function SchoolInfoUpdate({ school_id, schoolData }: { school_id: string, schoolData: SchoolData}) {
	//

	//
	// A. Setup variables
	const [submitState, setSubmitState] = useState<'no'|'done'|'processing'|'error'>('no');
	const [formOpen, setFormOpen] = useState(false);
	const [successMessage, setSuccessMessage] = useState<string|null>(null);
	const router = useRouter();

	//
	// B. Fetch data

	//
	// C. Transform data
	const defaultCicle = {} as SchoolCicleObjects;
	schoolCicles.forEach(cicle => {
		defaultCicle[cicle] = { hasCicle: schoolData.cicles.includes(cicle), morningEntry: '', morningExit: '', afternoonEntry: '', afternoonExit: '' };
	});

	// C.1) Form validation for school cicles
	const verifiers = {} as {
    // eslint-disable-next-line no-unused-vars
    [key in SchoolCicle]: {
      // hasCicle:(value:boolean,values:FormType)=>null|string,
      type:(_value:string, _values:FormType)=>null|string,
      morningEntry:(_value:string, _values:FormType)=>null|string,
      morningExit:(_value:string, _values:FormType)=>null|string,
			afternoonEntry:(_value:string, _values:FormType)=>null|string,
			afternoonExit:(_value:string, _values:FormType)=>null|string,
    }
  };
	schoolCicles.forEach(cicle => {
		verifiers[cicle] = {
			// "hasCicle":(value,values) => (values[cicle]["type"] !=null || !value ? null : 'Indique se o ensino é semestral ou trimestral'),
			type: (value, values) => values[cicle].hasCicle === false || value !== null ? null : 'Indique se o ensino é semestral ou trimestral',
			morningEntry: (value, values) => values[cicle].hasCicle === false || value !== '' ? null : 'Indique a hora de entrada',
			morningExit: (value, values) => values[cicle].hasCicle === false || value !== '' ? null : 'Indique a hora de saída',
			afternoonEntry: (value, values) => values[cicle].hasCicle === false || value !== '' ? null : 'Indique a hora de entrada',
			afternoonExit: (value, values) => values[cicle].hasCicle === false || value !== '' ? null : 'Indique a hora de saída',
		};
	});

	// C.2) Rest of form validation
	const validate:FormValidateInput<FormType> = {
		correctLocation: value => value !== '' ? null : 'Indique se a localização está correta',
		email: value => /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(value) ? null : 'Email inválido',
		url: value => value === '' || /^\S+\.\S+$/.test(value) ? null : 'Website inválido, tem de conter um ponto',
		fillerIdentifier(value, _values, _path) {
			if (value === '') {
				return 'Indique o seu nome';
			}
			return null;
		},
		fillerIdentifierPosition(value, _values, _path) {
			if (value === '') {
				return 'Indique o seu cargo';
			}
			return null;
		},
		calendar: {
			cycleFrequency: value => value === 'semester' || value === 'trimester' ? null : 'Indique se o ensino é semestral ou trimestral',
			dates(value, values) {
				if (values.calendar.cycleFrequency === 'semester') {
					return value.length === 2 && value.every(d => d.every(d => d !== null)) ? null : 'Indique os intervalos de datas dos semestres';
				}
				if (values.calendar.cycleFrequency === 'trimester') {
					return value.length === 3 && value.every(d => d.every(d => d !== null)) ? null : 'Indique os intervalos de datas dos trimestres';
				}
				return null;
			},
			vacations(value, values) {
				// Make sure they are contained within the picked "dates" intervals
				const schoolIntervals = values.calendar.dates;
				const isCorrect = value.every(vacationInterval => schoolIntervals.some(schoolInterval => {
					if (vacationInterval[0] === null || vacationInterval[1] === null) {
						return true;
					}
					if (vacationInterval[0] >= schoolInterval[0] && vacationInterval[1] <= schoolInterval[1]) {
						return true;
					}
					return false;
				}));
				return isCorrect ? null : `
					Os intervalos têm de estar contidos nos ${values.calendar.cycleFrequency === 'semester' ? 'semestres' : 'trimestres'}.
					Não indique férias entre ${values.calendar.cycleFrequency === 'semester' ? 'semestres' : 'trimestres'}.`;
			},
		},
		...verifiers,
	};

	const form = useForm<FormType>({
		initialValues: {
			password: '',
			id: school_id,
			fillerIdentifier: '',
			fillerIdentifierPosition: '',
			correctLocation: '',
			submissionDate: '', // gets populated server side
			postal_code: schoolData.postal_code || '',
			email: schoolData.email || '',
			phone: schoolData.phone || '',
			url: schoolData.url || '',
			comment: '',
			calendar: {
				cycleFrequency: '',
				dates: [],
				vacations: [[null, null]],
			},
			...defaultCicle,
		},
		validate: validate,
	});

	const onSubmit = async (values:FormType) => {
		if (submitState === 'processing') {
			return;
		}
		setSubmitState('processing');
		const res = await submit(values);
		const title = res.success ? 'Submissão efetuada' : 'Erro';
		const body = res.message;
		if (res.success) {
			setSuccessMessage(body);
		} else {
			notifications.show({ title: title, message: body, color: 'red' });
		}
		if (res.success) {
			setSubmitState('done');
		} else {
			setSubmitState('error');
		}
	};

	const checkPassword = async (password:string) => {
		const isCorrect = await isPasswordCorrect(form.getValues().password);

		if (!isCorrect) {
			notifications.show({ title: 'Código de acesso inválido', message: '', color: 'red' });
		} else {
			notifications.show({ title: 'Código de acesso aceite', message: '', color: 'blue' });
		}
		setFormOpen(isCorrect);
	};

	//
	// D. Render components

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 8, textAlign: 'left' }}>
			<div>
				<Titles municipality_name={schoolData.municipality_name} school_name={schoolData.name} />
			</div>

			<Paper shadow='sm' radius='md' p={16}>
				<Title order={3} fw={700}>Código de acesso</Title>
				{form.getInputProps('password').error && <Text c='red' size='xs'>{form.getInputProps('password').error}</Text>}
				<PasswordInput
					placeholder='********'
					{...form.getInputProps('password')}
					onKeyDown={e => {
						if (e.key === 'Enter') {
							checkPassword(form.getValues().password);
						}
					}}
				/>
				<Button mt={20} onClick={async () => {
					checkPassword(form.getValues().password);
				}} size='md'>Verificar</Button>
			</Paper>
			{formOpen &&
				<>
					<form onSubmit={form.onSubmit(onSubmit, errors => {
						const firstErrorPath = Object.keys(errors)[0];
						form.getInputNode(firstErrorPath)?.focus();
					})}
					style={{ display: 'flex', flexDirection: 'column', gap: 8, textAlign: 'left' }}>
						<Paper shadow='sm' radius='md'>
							<SchoolInfoUpdateMap schoolData={schoolData} />
						</Paper>

						<Paper shadow='sm' radius='md' p={16}>
							<Title order={3} fw={700}>Localização</Title>
							<Text size='xs' c='dimmed'>A posição da escola no mapa corresponde com a posição da porta príncipal de entrada da escola?</Text>
							{form.getInputProps('correctLocation').error && <Text c='red' size='xs'>{form.getInputProps('correctLocation').error}</Text>}
							<SegmentedControl
								style={{ flexShrink: 0 }}
								size='xs'
								data={[
									{ label: 'Sim', value: 'sim' },
									{ label: 'Quase', value: 'quase' },
									{ label: 'Não', value: 'nao' },
								]}

								{...form.getInputProps('correctLocation', { type: 'input' })}

							/>
							<TextInput
								label='Código Postal'
								placeholder='1234-567'
								{...form.getInputProps('postal_code')}
							/>
						</Paper>
						<Paper shadow='sm' radius='md' p={16}>
							<Title order={3} fw={700}>Dados de contacto</Title>
							<Stack gap={6}>
								<TextInput
									label='Email'
									description='Email(s) separados por vírgulas'
									placeholder='email@exemplo.pt'
									{...form.getInputProps('email')}
								/>
								<TextInput
									label='Website'
									placeholder='www.escola.pt'
									{...form.getInputProps('url')}
								/>
								<TextInput
									label='Telefone'
									placeholder='910001337'
									{...form.getInputProps('phone')}
								/>
								<TextInput
									label='Nome do responsável pela submissão do formulário'
									placeholder='João Silva'
									{...form.getInputProps('fillerIdentifier')}
								/>
								<TextInput
									label='Cargo do responsável pela submissão do formulário'
									placeholder='Diretor da Escola'
									{...form.getInputProps('fillerIdentifierPosition')}
								/>
							</Stack>
						</Paper>
						{SchoolInfoUpdateCalendar({ form })}
						<Paper shadow='sm' radius='md' p={16}>
							<Stack gap={6}>
								<Title order={3} fw={700}>Modalidades de ensino</Title>
								<Text size='xs' c='dimmed'>Indique os ciclos e outros tipos de ensino presentes na escola</Text>
								<Stack gap='xs'>
									<SchoolCycleItem form={form} label='Pré-escolar' k='pre_school' />
									<SchoolCycleItem form={form} label='1º Ciclo' k='basic_1' />
									<SchoolCycleItem form={form} label='2º Ciclo' k='basic_2' />
									<SchoolCycleItem form={form} label='3º Ciclo' k='basic_3' />
									<SchoolCycleItem form={form} label='Secundário' k='high_school' />
									<SchoolCycleItem form={form} label='Profissional' k='professional' />
									<SchoolCycleItem form={form} label='Especial' k='special' />
									<SchoolCycleItem form={form} label='Artístico' k='artistic' />
									<SchoolCycleItem form={form} label='Universitário' k='university' />
									<SchoolCycleItem form={form} label='Outro' k='other' />
								</Stack>
							</Stack>
						</Paper>
						<Paper shadow='sm' radius='md' p={16}>
							<Title order={3} fw={700}>Informação adicional</Title>
							<Textarea
								label='Comentário'
								description='Informação extra que queira transmitir sobre a escola'
								placeholder='A Escola tem horário noturno desde as 18:35 até às 22:40/Há muitos estudantes que vêm de sitio X/Não há aulas sextas-feiras/etc'
								{...form.getInputProps('comment')}
							/>
						</Paper>
						<Button leftSection={
							(<div>{submitState === 'processing' && <Loader size={16} color='white' />}
								{submitState === 'done' && '✓'}{submitState === 'error' && <IconX size={20}/>}</div>)
						}
						type='submit' size='md'>
					Enviar
						</Button>

					</form>
				</>
			}
			<Modal opened={successMessage != null} onClose={() => {
				setSuccessMessage(null);
			}} centered withCloseButton={false}>
				<div className={styles.modal}>
					<h1>Obrigado pela sua submissão.</h1>
					<p>{successMessage}</p>
					<Button onClick={() => {
						router.push('/portal-escolas');
					}}>Fechar</Button>
					<Button variant='subtle' onClick={() => {
						setSuccessMessage(null);
					}}>Voltar ao formulário</Button>
				</div>
			</Modal>
			<BackHome />
		</div>
	);

	//
}