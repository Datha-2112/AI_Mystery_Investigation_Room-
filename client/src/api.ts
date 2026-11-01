import axios from 'axios';
export const api=axios.create({baseURL:import.meta.env.VITE_API_URL||'http://localhost:4000/api/v1'});
api.interceptors.request.use(config=>{const token=localStorage.getItem('case-token');if(token)config.headers['x-investigation-token']=token;return config;});
export type Suspect={id:string;name:string;age:number;occupation:string;relationship:string;background:string;motive:string;initials:string;color:string};
export type Evidence={id:string;type:string;title:string;description:string;content:string;timestamp:string;relatedSuspectIds:string[];significance:string;reviewed?:boolean};
export type Investigation={caseId:string;case:{title:string;description:string;category:string;difficulty:string;location:string;incidentDate:string;incidentTime:string};victim:{name:string;age:number;occupation:string;details:string};suspects:Suspect[];timeline:{time:string;event:string}[];evidence:Evidence[];progress:{total:number;reviewed:number};status:string;accusationSubmitted:boolean};
