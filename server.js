import { createServer } from 'http';
import { readFile } from 'fs';
import { extname as _extname } from 'path';

const PORT = process.env.PORT || 3000;

const server = createServer((req, res) => {
    let filePath = './src/interface' + req.url;

    // Sirve index.html si es la raíz
    if (req.url === '/') {
        filePath = './src/interface/index.html';
    }

    // Si la solicitud es para archivos en 'domain', ajusta el path
    if (req.url.startsWith('/domain/')) {
        filePath = './src' + req.url; // Ajusta la ruta para servir archivos desde 'src/domain'
    }

    // Mapear las extensiones a los MIME types correctos
    const extname = String(_extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.jpg': 'image/jpg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.ico': 'image/x-icon',
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    // Leer el archivo y enviarlo como respuesta
    readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - Archivo no encontrado</h1>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end('Error del servidor: ' + error.code + ' ..\n');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
