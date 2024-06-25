'use client';

import { useParams } from 'next/navigation';
import Layout from '@/components/Layout/Layout';
import SchoolInfo from '@/components/SchoolInfo/SchoolInfo';

export default function Page() {
	//

	//
	// A. Setup variables

	const { school_id } = useParams();

	//
	// B. Render components

	return (
		<Layout>
			<SchoolInfo school_id={school_id} />
		</Layout>
	);

	//
}