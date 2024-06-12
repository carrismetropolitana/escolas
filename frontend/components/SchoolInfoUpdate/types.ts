export type SchoolData = {
  id: string;
  name: string;
  lat: string;
  lon: string;
  nature: string;
  grouping: string;
  cicles: string[];
  address: string;
  postal_code: string;
  locality: string;
  parish_id: string;
  parish_name: string;
  municipality_id: string;
  municipality_name: string;
  district_id: string;
  district_name: string;
  region_id: string;
  region_name: string;
  url: string;
  email: string;
  phone: string;
  stops: string[];
}

export const schoolCicles = ['pre_school', 'basic_1', 'basic_2', 'basic_3', 'high_school', 'professional', 'special', 'artistic', 'university', 'other'] as const;
export type SchoolCicle = typeof schoolCicles[number]
export type SchoolCicleObjects = {
  // eslint-disable-next-line no-unused-vars
  [key in SchoolCicle]: {hasCicle:boolean, type:null|string, entry:null|string, exit:null|string}
}
export type FormType = {
  id: string;
  correctLocation: 'sim' | 'quase' | 'nao' | '';
  submissionDate: string;
  postal_code: string;
  email: string;
  phone: string;
  url: string;
  comment:string
} & SchoolCicleObjects