'use client';
import { ActionIcon, Box, Button, Group, Paper, SegmentedControl, Stack, Switch, Text, TextInput, Title } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { UseFormReturnType } from '@mantine/form/lib/types';
import '@mantine/dates/styles.css';
import { FormType } from '../SchoolInfoUpdate/types';
import { IconTrash } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { randomId } from '@mantine/hooks';

export function SchoolInfoUpdateCalendar({ form }:{form:UseFormReturnType<FormType, (_: FormType) => FormType>}) {
	const cycleFrequencyProps = form.getInputProps('calendar.cycleFrequency', { type: 'input' });
	const cycleFrequency:''|'trimester'|'semester' = cycleFrequencyProps.value;

	const datesProps = form.getInputProps('calendar.dates');
	const vacationsProps = form.getInputProps('calendar.vacations');

	return <Paper shadow='sm' radius='md' p={16}>
		<Title order={3} fw={700}>Calendário Escolar</Title>
		<Stack gap={6}>
			<Text size='xs'>Modo de funcionamento</Text>
			<SegmentedControl
				size='xs'
				w={200}
				color='blue'
				data={[
					{ label: 'Semestral', value: 'semester' },
					{ label: 'Trimestral', value: 'trimester' },
				]}
				{...cycleFrequencyProps} />
			{cycleFrequencyProps.error && <Text c='red' size='xs'>{cycleFrequencyProps.error}</Text>}
			{datesProps.error && <Text c='red' size='xs'>{datesProps.error}</Text>}
			{cycleFrequency === 'semester' && <Stack gap={6}>
				<Text size='xs'>Intervalo de Datas do Primeiro Semestre</Text>
				<DatePickerInput
					type='range'
					maw={300}
					{...form.getInputProps('calendar.dates.0')}
				/>
				<Text size='xs'>Intervalo de Datas do Segundo Semestre</Text>
				<DatePickerInput
					type='range'
					maw={300}
					{...form.getInputProps('calendar.dates.1')}
				/>
			</Stack>
			}
			{cycleFrequency === 'trimester' && <Stack gap={6}>
				<Text size='xs'>Intervalo de Datas do Primeiro Período</Text>
				<DatePickerInput
					type='range'
					maw={300}
					{...form.getInputProps('calendar.dates.0')}
				/>
				<Text size='xs'>Intervalo de Datas do Segundo Período</Text>
				<DatePickerInput
					type='range'
					maw={300}
					{...form.getInputProps('calendar.dates.1')}
				/>
				<Text size='xs'>Intervalo de Datas do Terceiro Período</Text>
				<DatePickerInput
					type='range'
					maw={300}
					{...form.getInputProps('calendar.dates.2')}
				/>
			</Stack>
			}
			<Stack gap={4}>
				<Text size='md' fw={500}>Lista de Férias/Interrupções Escolares</Text>
				{vacationsProps.error && <Text c='red' size='xs'>{vacationsProps.error}</Text>}
				{form.getValues().calendar.vacations.map((item, index) => <Group key={index}>
					<DatePickerInput
						style={{ flex: 1 }}
						type='range'
						{...form.getInputProps(`calendar.vacations.${index}`)}/>

					<ActionIcon size='lg' color='red' onClick={() => form.removeListItem('calendar.vacations', index)}>
						<IconTrash size='1rem' />
					</ActionIcon>
				</Group>)
				}
				<Group justify='flex-end'>

					<Button
						onClick={() => form.insertListItem('calendar.vacations', [null, null])}
					>
          Adicionar Interrupção
					</Button>
				</Group>
			</Stack>
		</Stack>
	</Paper>;
}

export function SchoolInfoUpdateCalendarr() {
	const form = useForm({
		mode: 'uncontrolled',
		initialValues: {
			employees: [{ name: '', active: false, key: randomId() }],
		},
	});

	const fields = form.getValues().employees.map((item, index) => <Group key={item.key} mt='xs'>
		<TextInput
			placeholder='John Doe'
			withAsterisk
			style={{ flex: 1 }}
			key={form.key(`employees.${index}.name`)}
			{...form.getInputProps(`employees.${index}.name`)}
		/>
		<Switch
			label='Active'
			key={form.key(`employees.${index}.active`)}
			{...form.getInputProps(`employees.${index}.active`, { type: 'checkbox' })}
		/>
		<ActionIcon color='red' onClick={() => form.removeListItem('employees', index)}>
			<IconTrash size='1rem' />
		</ActionIcon>
	</Group>);

	return (
		<Box maw={500} mx='auto'>
			{fields.length > 0 ?
				<Group mb='xs'>
					<Text fw={500} size='sm' style={{ flex: 1 }}>
            Name
					</Text>
					<Text fw={500} size='sm' pr={90}>
            Status
					</Text>
				</Group> :
				<Text c='dimmed' ta='center'>
          No one here...
				</Text>
			}

			{fields}

			<Group justify='center' mt='md'>
				<Button
					onClick={() => form.insertListItem('employees', { name: '', active: false, key: randomId() })
					}
				>
          Add employee
				</Button>
			</Group>
		</Box>
	);
}