'use client';
import { Checkbox, Collapse, Paper, Stack, Text } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import CustomTimeInput from '../CustomTimeInput/CustomTimeInput';
import { FormType, SchoolCicle } from './types';

// eslint-disable-next-line no-unused-vars
export default function SchoolCycleItem({ form, label, k }:{form:UseFormReturnType<FormType, (_: FormType) => FormType>, label:string, k:SchoolCicle}) {
	// k stands for key, which cannot be used as it is a reserved react prop
	// console.log(form.values[k])
	// console.log(form.getInputProps(k, { type: 'checkbox' }))

	// Reset values when unchecked
	// A. Setup Variables
	const morningEntryProps = form.getInputProps(k + '.morningEntry', { type: 'input' });
	const morningExitProps = form.getInputProps(k + '.morningExit', { type: 'input' });
	const afternoonEntryProps = form.getInputProps(k + '.afternoonEntry', { type: 'input' });
	const afternoonExitProps = form.getInputProps(k + '.afternoonExit', { type: 'input' });

	const checked = form.values[k].hasCicle;

	// B. Render
	return <Paper bg={checked ? 'var(--mantine-color-blue-light)' : ''} shadow='none' >
		<Stack p={8}>
			<Checkbox
				c={checked ? 'blue' : ''}
				fw={700}
				label={label}
				{...form.getInputProps(k + '.hasCicle', { type: 'checkbox' })} />

			<Collapse
				in={checked}
			>
				<Stack gap={10}>
					<div>
						<Text size='sm'>Principal hora de entrada de manhã</Text>
						<CustomTimeInput
							inputProps={ morningEntryProps }
						/>
					</div>
					<div>
						<Text size='sm'>Principal hora de saída de manhã</Text>
						<CustomTimeInput
							inputProps={ morningExitProps }
						/>
					</div>
					<div>
						<Text size='sm'>Principal hora de entrada de tarde</Text>
						<CustomTimeInput
							inputProps={ afternoonEntryProps }
						/>
					</div>
					<div>
						<Text size='sm'>Principal hora de saída de tarde</Text>
						<CustomTimeInput
							inputProps={ afternoonExitProps }
						/>
					</div>
				</Stack>
			</Collapse>
		</Stack>
	</Paper>;
}