import { NextResponse } from 'next/server';

export async function GET(){
    const unchi = { unchi: `うんち` };
    return NextResponse.json(unchi);
}
