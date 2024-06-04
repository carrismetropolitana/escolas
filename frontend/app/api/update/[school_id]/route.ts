import {google} from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request:NextRequest,{ params }:{params:{school_id:string}}):Promise<NextResponse> {
  const {school_id} = params;
  const json = await request.json();
  const route = "Hello World!";
	
	const client = new google.auth.JWT(
		process.env.GOOGLE_SERVICE_EMAIL,
		null,
		process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
		['https://www.googleapis.com/auth/spreadsheets']
	);
  const sheets = google.sheets({version: 'v4',auth:client});

  const res = await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
		range: `Sheet1`,
		valueInputOption: 'RAW',
		requestBody: {
			values: [[route]]
		} 
  });
		

  return new NextResponse(JSON.stringify(res.data), {status: 200});
}