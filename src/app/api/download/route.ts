import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import JSZip from 'jszip';

// In a real application, you would store these in a database
const PROJECT_PASSWORDS: Record<string, string> = {
  'sa-page-design': 'sapage2024',
  'sa-homepage-design': 'sahomepage2024',
  'plechovka-o': 'plechovka2024',
  'plechovka-p': 'plechovka2024',
  'plechovka-g': 'plechovka2024',
  'maco': 'illustration2024',
  'zajac': 'illustration2024',
  'srdce': 'illustration2024',
  'hlavickovypapier': 'brand2024',
  'inicialky': 'brand2024',
  'dizajnmanual': 'brand2024',
  'login-stranka': 'webdesign2024',
  'travel-slovakia': 'webdesign2024',
  'discord-logo': 'creative2024',
  'caricatura': 'creative2024',
  'kniha': 'creative2024',
};

// File configurations with proper MIME types and extensions
const PROJECT_FILES: Record<string, { path: string; filename: string; mimeType: string }> = {
  'sa-page-design': {
    path: '/downloads/sa-page-design.ai',
    filename: 'sa-page-design.ai',
    mimeType: 'application/postscript'
  },
  'sa-homepage-design': {
    path: '/downloads/sa-homepage-design.ai',
    filename: 'sa-homepage-design.ai',
    mimeType: 'application/postscript'
  },
  'plechovka-o': {
    path: '/downloads/plechovka-o.ai',
    filename: 'plechovka-o.ai',
    mimeType: 'application/postscript'
  },
  'plechovka-p': {
    path: '/downloads/plechovka-p.ai',
    filename: 'plechovka-p.ai',
    mimeType: 'application/postscript'
  },
  'plechovka-g': {
    path: '/downloads/plechovka-g.ai',
    filename: 'plechovka-g.ai',
    mimeType: 'application/postscript'
  },
  'maco': {
    path: '/downloads/maco more.ai',
    filename: 'maco-illustration.ai',
    mimeType: 'application/postscript'
  },
  'zajac': {
    path: '/downloads/zajac.ai',
    filename: 'zajac-illustration.ai',
    mimeType: 'application/postscript'
  },
  'srdce': {
    path: '/downloads/srdce.ai',
    filename: 'srdce-illustration.ai',
    mimeType: 'application/postscript'
  },
  'hlavickovypapier': {
    path: '/downloads/Hlavickově papier.ai',
    filename: 'letterhead-design.ai',
    mimeType: 'application/postscript'
  },
  'inicialky': {
    path: '/downloads/inicialky.ai',
    filename: 'monogram-design.ai',
    mimeType: 'application/postscript'
  },
  'dizajnmanual': {
    path: '/downloads/dizajnmanual.ai',
    filename: 'design-manual.ai',
    mimeType: 'application/postscript'
  },
  'login-stranka': {
    path: '/downloads/login stranka oblaky.ai',
    filename: 'login-page-design.ai',
    mimeType: 'application/postscript'
  },
  'travel-slovakia': {
    path: '/downloads/travel to slovakia landing page.psd',
    filename: 'travel-slovakia-landing.psd',
    mimeType: 'image/vnd.adobe.photoshop'
  },
  'discord-logo': {
    path: '/downloads/discord logo.psd',
    filename: 'discord-logo-design.psd',
    mimeType: 'image/vnd.adobe.photoshop'
  },
  'caricatura': {
    path: '/downloads/caricatura.psd',
    filename: 'caricature-artwork.psd',
    mimeType: 'image/vnd.adobe.photoshop'
  },
  'kniha': {
    path: '/downloads/kniha.ai',
    filename: 'book-design-project.ai',
    mimeType: 'application/postscript'
  },
};

// Shared files that should be included with specific projects
const SHARED_FILES: Record<string, { path: string; filename: string; mimeType: string }> = {
  'plechovka-mockup': {
    path: '/downloads/plechovka mockup.psd',
    filename: 'plechovka-mockup.psd',
    mimeType: 'image/vnd.adobe.photoshop'
  },
};

// Projects that should include shared files
const PROJECTS_WITH_SHARED_FILES = ['plechovka-o', 'plechovka-p', 'plechovka-g'];

export async function POST(request: NextRequest) {
  try {
    const { projectId, password } = await request.json();

    if (!projectId || !password) {
      return NextResponse.json(
        { error: 'Project ID and password are required' },
        { status: 400 }
      );
    }

    const correctPassword = PROJECT_PASSWORDS[projectId];
    
    if (!correctPassword) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    if (password !== correctPassword) {
      return NextResponse.json(
        { error: 'Incorrect password' },
        { status: 401 }
      );
    }

    const fileConfig = PROJECT_FILES[projectId];
    
    if (!fileConfig) {
      return NextResponse.json(
        { error: 'Download file not found' },
        { status: 404 }
      );
    }

    // Check if project should include shared files
    const shouldIncludeSharedFiles = PROJECTS_WITH_SHARED_FILES.includes(projectId);
    
    if (shouldIncludeSharedFiles) {
      // Create a ZIP file with multiple files
      const zip = new JSZip();
      
      // Add the main project file
      const mainFilePath = join(process.cwd(), 'public', fileConfig.path);
      if (!existsSync(mainFilePath)) {
        return NextResponse.json(
          { error: 'Main project file not found on server' },
          { status: 404 }
        );
      }
      const mainFileBuffer = readFileSync(mainFilePath);
      zip.file(fileConfig.filename, mainFileBuffer);
      
      // Add the shared mockup file
      const sharedFileConfig = SHARED_FILES['plechovka-mockup'];
      const sharedFilePath = join(process.cwd(), 'public', sharedFileConfig.path);
      if (existsSync(sharedFilePath)) {
        const sharedFileBuffer = readFileSync(sharedFilePath);
        zip.file(sharedFileConfig.filename, sharedFileBuffer);
      }
      
      // Generate ZIP buffer
      const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });
      
      // Create response with ZIP file
      const response = new NextResponse(zipBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'application/zip',
          'Content-Disposition': `attachment; filename="${projectId}-files.zip"`,
          'Content-Length': zipBuffer.length.toString(),
        },
      });

      return response;
    } else {
      // Single file download (for non-plechovka projects)
      const filePath = join(process.cwd(), 'public', fileConfig.path);
      if (!existsSync(filePath)) {
        return NextResponse.json(
          { error: 'File not found on server' },
          { status: 404 }
        );
      }

      const fileBuffer = readFileSync(filePath);

      const response = new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          'Content-Type': fileConfig.mimeType,
          'Content-Disposition': `attachment; filename="${fileConfig.filename}"`,
          'Content-Length': fileBuffer.length.toString(),
        },
      });

      return response;
    }
  } catch (error) {
    console.error('Download API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 