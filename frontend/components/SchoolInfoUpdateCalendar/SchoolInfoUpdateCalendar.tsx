'use client';
import { ActionIcon, Button, Group, Paper, SegmentedControl, Stack, Text, Title } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { UseFormReturnType } from '@mantine/form/lib/types';
import '@mantine/dates/styles.css';
import { FormType } from '../SchoolInfoUpdate/types';
import { IconTrash } from '@tabler/icons-react';

export function SchoolInfoUpdateCalendar({ form }:{form:UseFormReturnType<FormType, (_: FormType) => FormType>}) {
	// A. Setup Variables
	const cycleFrequencyProps = form.getInputProps('calendar.cycleFrequency', { type: 'input' });
	const cycleFrequency:''|'trimester'|'semester' = cycleFrequencyProps.value;

	const datesProps = form.getInputProps('calendar.dates');
	const vacationsProps = form.getInputProps('calendar.vacations');

	// B. Render

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
				<Text size='xs'>Periodo letivo do Primeiro Semestre</Text>
				<DatePickerInput
					type='range'
					maw={300}
					{...form.getInputProps('calendar.dates.0')}
				/>
				<Text size='xs'>Periodo letivo do Segundo Semestre</Text>
				<DatePickerInput
					type='range'
					maw={300}
					{...form.getInputProps('calendar.dates.1')}
				/>
			</Stack>
			}
			{cycleFrequency === 'trimester' && <Stack gap={6}>
				<Text size='xs'>Periodo letivo do Primeiro Período</Text>
				<DatePickerInput
					type='range'
					maw={300}
					{...form.getInputProps('calendar.dates.0')}
				/>
				<Text size='xs'>Periodo letivo do Segundo Período</Text>
				<DatePickerInput
					type='range'
					maw={300}
					{...form.getInputProps('calendar.dates.1')}
				/>
				<Text size='xs'>Periodo letivo do Terceiro Período</Text>
				<DatePickerInput
					type='range'
					maw={300}
					{...form.getInputProps('calendar.dates.2')}
				/>
			</Stack>
			}
			<Stack gap={4}>
				<Text size='md' fw={500}>Lista de Interrupções dentro do período escolar</Text>
				{vacationsProps.error && <Text c='red' size='xs'>{vacationsProps.error}</Text>}
				{form.getValues().calendar.vacations.map((item, index) => <Group key={index}>
					<DatePickerInput
						style={{ flex: 1 }}
						type='range'
						allowSingleDateInRange={true}
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