import Link from 'next/link';
import Head from 'next/head';
import Script from 'next/script';
import Layout from '../../components/layout';

export default function Municipios() {
    return (
        <Layout>

            <Head>
                <title>Municípios CM</title>
            </Head>

            <Script 
            // https://nextjs.org/docs/pages/building-your-application/optimizing/scripts

                src=""
                strategy="afterInteractive"
                onLoad={() => {
                    console.log(`Vou descarregar o stop_id 010001`)
                    fetch('https://schedules.carrismetropolitana.pt/api/stops/010001')
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                    });
    
                }
                }
            />

            <p>Saiba como chegar à sua escola ou universidade com a Carris Metropolitana</p>
            
            <p>Explorar aqui: <a href="https://www.creative-tim.com/learning-lab/nextjs/react-select-2-wrapper/argon-dashboard" target="_blank">select</a></p>
            
        </Layout>
    );
  }