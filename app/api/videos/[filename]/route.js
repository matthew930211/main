import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request, { params }) {
    const { filename } = params;
    
    const videoPath = path.join("C:/Users/AB/Downloads", filename); // Path to your local video directory

    try {
        const stat = fs.statSync(videoPath);
        const file = fs.createReadStream(videoPath);

        return new NextResponse(file, {
            status: 200,
            headers: {
                'Content-Type': 'video/mp4',
                'Content-Length': stat.size,
            },
        });
    } catch (error) {
        return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }
}