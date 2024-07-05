'use client';
import { useRouter } from 'next/navigation';
import SelectMunicipalityAndSchool from '../SelectMunicipalityAndSchool/SelectMunicipalityAndSchool';
import { useState } from 'react';
import styles from './HomeUpdate.module.css';
import { Button } from '@mantine/core';

export default function HomeUpdate() {
	const router = useRouter();
	const [selectedMunicipalityId, setSelectedMunicipalityId] = useState(null);
	const [selectedEducationLevel, setSelectedEducationLevel] = useState(null);
	const [selectedSchool, _setSelectedSchool] = useState();

	const [activePage, setActivePage] = useState<'intro'|'select'>('intro');

	//
	// B. Handle actions

	const handleSelectSchool = (schooldId: string) => {
		if (schooldId) router.push(`/portal-escolas/${schooldId}`);
	};

	return (
		<div>
			{activePage === 'intro' &&
			<div className={styles.intro}>
				<div className={styles.header}>
					{/* <div className={styles.video}></div> */}
					<div className={styles.text}>
						<h1>Área Reservada</h1>
						<h2>CMetropolitana mais próxima das escolas</h2>
						<p>A Carris Metropolitana trabalha com os municípios e escolas para garantir que o regresso às aulas corre sobre rodas.</p>
						<p>É solicitada a colaboração de todas as escolas para a partilha de informação necessária de modo a garantir uma resposta eficiente da rede da CMetropolitana.</p>
						<div>
						Próximos passos:
							<div>
								<div>1</div><div>Carregue em <span onClick={() => setActivePage('select')}>Selecionar Escola</span> para preencher o formulário</div>
							</div>
							<div>
								<div>2</div><div>Receba o email de confirmação</div>
							</div>
							<div>
								<div>3</div><div>Em caso de dúvida, procure o Departamento de Mobilidade do município</div>
							</div>
						</div>
					</div>
				</div>
				<Button onClick={() => setActivePage('select')}>Selecionar Escola</Button>
			</div>
			}

			{activePage === 'select' &&
			<div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
				<SelectMunicipalityAndSchool
					title='Selecione a escola ou universidade que representa.'
					selectedMunicipalityId={selectedMunicipalityId}
					onSelectMunicipalityId={setSelectedMunicipalityId}
					selectedEducationLevel={selectedEducationLevel}
					onSelectEducationLevel={setSelectedEducationLevel}
					onSelectSchool={handleSelectSchool}
				/>
				<Button onClick={() => setActivePage('intro')}>Voltar</Button>
			</div>
			}
		</div>
	);
}