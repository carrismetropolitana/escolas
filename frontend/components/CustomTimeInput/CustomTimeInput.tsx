import { IconClockPlay } from '@tabler/icons-react';
import styles from './CustomTimeInput.module.css';
import { TextInput } from '@mantine/core';
import { GetInputPropsReturnType } from '@mantine/form/lib/types';
import { ChangeEventHandler } from 'react';
import { format } from 'path';

export default function CustomTimeInput({ inputProps }:{inputProps:GetInputPropsReturnType}) {
	//

	//
	// A. Setup variables

	//
	// B. Handle actions

	const handleUpdateStartTime:ChangeEventHandler<HTMLInputElement> = event => {
		// Setup the raw value
		const target = event.target;
		let formattedValue = target.value;
		let endsWithColon = formattedValue.endsWith(':');
		// Add leading 0 if the person writes a single number then :
		if (formattedValue.length <= 2 && formattedValue.endsWith(':')) formattedValue = formattedValue.padStart(3, '0');
		// Remove any non-digit characters from the value
		formattedValue = formattedValue.replace(/\D/g, '');
		// Clip the value to 4 digits
		formattedValue = formattedValue.slice(0, 4);
		// Split the value into hours and minutes
		let hoursString = formattedValue.slice(0, 2);
		let minutesString = formattedValue.slice(2, 4);
		// Parse the hours
		if (hoursString && hoursString.length == 2) {
			// Format the hours
			let hoursInt = parseInt(hoursString);
			// If the hours are bigger than 27, clamp to 27
			if (hoursInt > 25) hoursString = '24';
			// If the hours are smaller than 4, clamp to 4
			else if (hoursInt < 0) hoursString = '00';
			// Add the : if hours is in range
			else hoursString = `${hoursString}`;
		}
		// Parse the minutes
		if (minutesString && minutesString.length == 2) {
			// Format the minutes
			let minutesInt = parseInt(minutesString);
			// If the minutes are bigger than 59, clamp to 59
			if (minutesInt > 59) minutesString = '59';
			// If the minutes are smaller than 0, clamp to 0
			else if (minutesInt < 0) minutesString = '00';
		}
		// Add the : double dots
		if (hoursString.length && !minutesString.length) formattedValue = `${hoursString}`;
		else if (hoursString.length && minutesString.length) formattedValue = `${hoursString}:${minutesString}`;
		// if it previously had ended with :, keep them, since the person intended to write them
		if (!formattedValue.includes(':') && endsWithColon) {
			formattedValue = formattedValue + ':';
		}
		// Save the value to the form
		target.value = formattedValue;
		inputProps.onChange(event);
		//
	};

	//
	// C. Render components

	return (
		<div className={styles.column}>
			<TextInput leftSection={<IconClockPlay size={18} />} placeholder={'12:00'} {...inputProps} onChange={handleUpdateStartTime} w='120' />
		</div>
	);

	//
}