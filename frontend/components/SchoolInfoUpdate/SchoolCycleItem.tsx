'use client';
import { Checkbox, Collapse, Paper, SegmentedControl, Stack, Text } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { TimeInput } from '@mantine/dates';
import { FormType } from './types';

// eslint-disable-next-line no-unused-vars
export default function SchoolCycleItem({ form, label, k }:{form:UseFormReturnType<FormType, (_: FormType) => FormType>, label:string, k:string}) {
	// k stands for key, which cannot be used as it is a reserved react prop
	// console.log(form.values[k])
	// console.log(form.getInputProps(k, { type: 'checkbox' }))

	// Reset values when unchecked
	// A. Setup Variables
	if (!form.values[k]['hasCicle']) {
		form.values[k]['type'] = null;
		form.values[k]['entry'] = '';
		form.values[k]['exit'] = '';
	}
	const typeProps = form.getInputProps(k + '.type', { type: 'input' });
	const entryProps = form.getInputProps(k + '.entry', { type: 'input' });
	const exitProps = form.getInputProps(k + '.exit', { type: 'input' });

	console.log(form.values[k]['entry']);
	const checked = form.values[k]['hasCicle'];

	// B. Render
	return <Paper bg={checked ? 'var(--mantine-color-blue-light)' : ''} shadow='none' >
		<Stack p={8}>
			<Checkbox
				c={checked ? 'blue' : ''}
				fw={700}
				label={label}
				k={form.key(k + '.hasCicle')}
				{...form.getInputProps(k + '.hasCicle', { type: 'checkbox' })} />

			<Collapse
				in={checked}
			>
				<Stack gap={10}>
					<div>
						<Text size='sm'>Modo de funcionamento</Text>
						<SegmentedControl
							size='xs'
							color='blue'
							bg='white'
							data={[
								{ label: 'Semestral', value: 'semester' },
								{ label: 'Trimestral', value: 'trimester' },
							]}
							{...typeProps}
						/>
						{typeProps.error && <Text c='red' size='xs'>{typeProps.error}</Text>}
					</div>
					<div>
						<Text size='sm'>Principal hora de entrada</Text>
						<TimeInput
							maw={100}
							{...entryProps}
						/>
					</div>
					<div>
						<Text size='sm'>Principal hora de saída</Text>
						<TimeInput
							maw={100}
							{...exitProps}
						/>
					</div>
				</Stack>
			</Collapse>
		</Stack>
	</Paper>;
}