'use client';

import { useParams } from 'next/navigation';
import SchoolPDF from '@/components/SchoolPDF/SchoolPDF';

export default function Page() {
	//

	//
	// A. Setup variables

	const { school_id } = useParams();

	//
	// B. Render components

	return <SchoolPDF school_id={school_id} />;

	//
}