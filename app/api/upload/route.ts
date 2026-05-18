import { auth } from '@/auth';
import { writeFile, mkdir } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';

import path from 'path';

// we upload here
const uploadDir = path.join(process.cwd(), 'public', 'uploads');

let uploadDirReady = false;

async function ensureUploadDir() {
  if (!uploadDirReady) {
    await mkdir(uploadDir, { recursive: true });
    uploadDirReady = true;
  }
}

const extMap: Record<string, string> = {
  'image/png': '.png',
  'image/jpeg': '.jpg',
  'image/webp': '.webp',
};

export async function POST(req: NextRequest) {
  // does folder exist
  await ensureUploadDir();

  // you shall not pass!
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // get the file...
  const formData = await req.formData();
  const file = formData.get('file') || formData.get('image');

  if (!file) {
    return NextResponse.json(
      { error: 'Geen bestand' },
      { status: 400 }
    );
  }

    if (!(file instanceof File)) {
    return NextResponse.json(
      { error: 'Geen geldig bestand ontvangen (key moet "file" zijn)' },
      { status: 400 }
    );
  }

  // is file ok
  const ext = extMap[file.type];
  if (!ext) {
    return NextResponse.json(
      { error: 'Ongeldig bestandstype' },
      { status: 400 }
    );
  }

  // size
  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    return NextResponse.json(
      { error: 'Bestand te groot' },
      { status: 400 }
    );
  }

  // file to buffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // filename
  const filename = `${randomUUID()}${ext}`;
  const filepath = path.join(uploadDir, filename);

  // write the file
  await writeFile(filepath, buffer);

  // return the urlll
  return NextResponse.json({
    url: `/uploads/${filename}`,
  });
}