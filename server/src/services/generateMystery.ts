import {GoogleGenAI} from '@google/genai';
import {mysteryPrompt} from '../prompts/mysteryPrompt.js';
import {mysterySchema} from '../validators/mystery.js';
import type {CaseData} from '../types.js';
const pause=(ms:number)=>new Promise(resolve=>setTimeout(resolve,ms));
export async function generateMystery(scenario:string,category:string,difficulty:string,suspectCount:number):Promise<CaseData>{
 const key=process.env.GEMINI_API_KEY;
 if(!key)throw new Error('Gemini is not configured. Add GEMINI_API_KEY to server/.env.');
 const ai=new GoogleGenAI({apiKey:key});
 const models=[...new Set([process.env.GEMINI_MODEL||'gemini-3.8-flash','gemini-3.6-flash','gemini-3.5-flash-lite'])];
 let last:unknown;
 for(const model of models){for(let attempt=0;attempt<2;attempt++){try{
  const out=await ai.models.generateContent({model,contents:mysteryPrompt(scenario,category,difficulty,suspectCount),config:{responseMimeType:'application/json',temperature:0.7}});
  if(!out.text)throw new Error('Gemini returned an empty response.');
  const valid=mysterySchema.parse(JSON.parse(out.text));
  if(valid.suspects.length!==suspectCount)throw new Error(`Gemini returned ${valid.suspects.length} suspects; ${suspectCount} were requested.`);
  return valid as CaseData;
 }catch(error){last=error;if(attempt===0)await pause(900);}}}
 throw last instanceof Error?last:new Error('Mystery generation failed.');
}
