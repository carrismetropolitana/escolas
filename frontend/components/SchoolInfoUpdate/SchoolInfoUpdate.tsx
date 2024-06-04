'use client'
import Titles from '@/components/Titles/Titles';
import BackHome from '@/components/BackHome/BackHome';
import SchoolInfoUpdateMap from '../SchoolInfoUpdateMap/SchoolInfoUpdateMap';
// import { submit } from './SubmitAction';
import { Button, Paper, SegmentedControl, Stack, Text, TextInput, Textarea, Title } from '@mantine/core';
import { isEmail, useForm } from '@mantine/form';
import SchoolCycleItem from './SchoolCycleItem';
import { submit } from './SubmitAction';
import { FormType, SchoolCicle, SchoolCicleObjects, SchoolData, schoolCicles } from './types';



export default function SchoolInfoUpdate({ school_id,  schoolData }: { school_id: string, schoolData: SchoolData}) {
  //

  //
  // A. Setup variables
  const defaultCicle = {} as SchoolCicleObjects
  schoolCicles.forEach((cicle) => {
    defaultCicle[cicle] = {hasCicle:schoolData.cicles.includes(cicle),type:null,entry:"",exit:""}
  })
  const verifiers = {} as {
    // eslint-disable-next-line no-unused-vars
    [key in SchoolCicle]: {
      // hasCicle:(value:boolean,values:FormType)=>null|string,
      type:(value:string,values:FormType)=>null|string,
      entry:(value:string,values:FormType)=>null|string,
      exit:(value:string,values:FormType)=>null|string
    }
  }
  schoolCicles.forEach((cicle) => {
    verifiers[cicle] ={
      // "hasCicle":(value,values) => (values[cicle]["type"] !=null || !value ? null : 'Indique se o ensino é semestral ou trimestral'),
      type:(value,values) => (values[cicle].hasCicle === false || value!==null ? null : 'Indique se o ensino é semestral ou trimestral'),
      entry:(value,values) => (values[cicle].hasCicle === false || value!=="" ? null : 'Indique a hora de entrada'),
      exit:(value,values) => (values[cicle].hasCicle === false || value!=="" ? null : 'Indique a hora de saída')
    }
  })
  const form = useForm<FormType>({
    initialValues: {
      id:school_id,
      correctLocation: "nao",
      submissionDate: "", // gets populated server side
      postal_code: schoolData.postal_code||"",
      email: schoolData.email || "",
      phone: schoolData.phone || "",
      url: schoolData.url || "",
      comment: "",
      ...defaultCicle
    },
    validate: {
      email: (value) => isEmail(value) ? null : 'Email inválido',
      url: (value) => (value === "" || /^\S+\.\S+$/.test(value) ? null : 'Website inválido, tem de conter um ponto'),
      ...verifiers
    }
  });

  //
  // B. Fetch data


  //
  // C. Transform data


  //
  // D. Render components

  return (
    <div>
      <div>
        <Titles municipality_name={schoolData.municipality_name} school_name={schoolData.name} />
      </div>
      <form onSubmit={form.onSubmit((values) => {submit(values)})}
      style={{display:"flex",flexDirection:"column",gap:8,textAlign:"left"}}>
        <Paper shadow='sm' radius='md'>
          <SchoolInfoUpdateMap schoolData={schoolData} />
        </Paper>
        <Paper p={16}>
          <Title order={3} fw={700}>Confirmar Posição</Title>
          <Text size="xs" c="dimmed">A posição da escola no mapa corresponde com a posição real?</Text>
          <SegmentedControl
            style={{flexShrink:0}}
            size="xs"
            data={[
              { label: 'Sim', value: "sim"},
              { label: 'Quase', value: "quase" },
              { label: 'Não', value: "nao" },
            ]}

            {...form.getInputProps("correctLocation",{type: 'input'})}
          />
        </Paper>
        <Paper shadow='sm' radius='md' p={16}>
          <Title order={3} fw={700}>Dados de contacto</Title>
          <Stack gap={6}>
            <TextInput
              label="Email"
              placeholder="email@exemplo.pt"
              k={form.key('email')}
              {...form.getInputProps('email')}
              />
            <TextInput
              label="Website"
              placeholder="www.escola.pt"
              k={form.key('url')}
              {...form.getInputProps('url')}
              />
          </Stack>
        </Paper>
        <Paper shadow='sm' radius='md' p={16}>
          <Stack gap={6}>
            <div>
              <Title order={3} fw={700}>Modalidades de ensino</Title>
              <Text size="xs" c="dimmed">Indique os ciclos e outros tipos de ensino presentes na escola</Text>
              <Stack gap="xs">
                <SchoolCycleItem form={form} label="Pré-escolar" k="pre_school" />
                <SchoolCycleItem form={form} label="1º Ciclo" k="basic_1" />
                <SchoolCycleItem form={form} label="2º Ciclo" k="basic_2" />
                <SchoolCycleItem form={form} label="3º Ciclo" k="basic_3" />
                <SchoolCycleItem form={form} label="Secundário" k="high_school" />
                <SchoolCycleItem form={form} label="Profissional" k="professional" />
                <SchoolCycleItem form={form} label="Especial" k="special" />
                <SchoolCycleItem form={form} label="Artístico" k="artistic" />
                <SchoolCycleItem form={form} label="Universitário" k="university" />
                <SchoolCycleItem form={form} label="Outro" k="other" />
              </Stack>
            </div>
          </Stack>
        </Paper>
        <Paper shadow='sm' radius='md' p={16}>
          <Title order={3} fw={700}>Informação adicional</Title>
          <Textarea
            label="Comentário"
            description="Informação extra que queira transmitir sobre a escola"
            placeholder="Há muitos estudantes que vêm de sitio X/Não há aulas sextas-feiras/etc"
          />
        </Paper>
        <Button type="submit">Submit</Button>
      </form>
      <BackHome />
    </div>
  );

  //
}

