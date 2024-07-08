import { IconClockPlay } from '@tabler/icons-react';
import styles from './CustomTimeInput.module.css';
import { TextInput } from '@mantine/core';
import { GetInputPropsReturnType } from '@mantine/form/lib/types';
import { ChangeEventHandler } from 'react';

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
		// Remove any non-digit characters from the value
		formattedValue = formattedValue.replace(/\D/g, '');
		// Clip the value to 6 digits
		formattedValue = formattedValue.slice(0, 4);
		// Split the value into hours and minutes
		let hoursString = formattedValue.slice(0, 2);
		let minutesString = formattedValue.slice(2, 4);
		// Parse the hours
		if (hoursString && hoursString.length == 2) {
			// Format the hours
			let hoursInt = parseInt(hoursString);
			// If the hours are bigger than 27, clamp to 27
			if (hoursInt > 27) hoursString = '27';
			// If the hours are smaller than 4, clamp to 4
			else if (hoursInt < 4) hoursString = '04';
			// Add the : if hours is in range
			else hoursString = `${hoursString}`;
		}
		// Parse the minutes
		console.log('minutesString', minutesString);
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
		// Save the value to the form
		console.log('val', formattedValue);
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