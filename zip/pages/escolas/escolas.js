import Link from 'next/link';
import Head from 'next/head';
import Layout from '../../components/layout';
//import Teste from '../../components/Teste';
import React from 'react'
import Select from 'react-select'

export default function Escolas() {


    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    const handleChange = (value) => {
    //    Handle the Select2 value change
        console.log(value);
    };

    return (
        <Layout>

            <Head>
                <title>Escolas CM</title>
            </Head>

            {/* <Teste /> */}

            <h1>Escolha uma escola</h1>
            <Select options={options} onChange={handleChange} />

            <p>
                usar
                <Link href='https://github.com/carrismetropolitana/schedules-api'>API</Link>
                da Carris Metropolitana
            </p>

        </Layout>
    );
}