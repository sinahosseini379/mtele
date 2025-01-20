const fs = require('fs'); const path = require('path'); const archiver = require('archiver'); const fse = require('fs-extra'); async function createNextjsProject(html, styles, images) { const projectDir = path.join(__dirname, 'my-nextjs-project'); fse.ensureDirSync(path.join(projectDir, 'public', 'images')); fse.ensureDirSync(path.join(projectDir, 'pages')); fse.ensureDirSync(path.join(projectDir, 'styles')); fse.ensureDirSync(path.join(projectDir, 'components')); fs.writeFileSync(path.join(projectDir, 'pages', 'index.js'), `import styles from '../styles/Home.module.css'; export default function Home() { return ( <div className={styles.container}> <div dangerouslySetInnerHTML={{ __html: \`${html}\` }} /> </div> ); }`); fs.writeFileSync(path.join(projectDir, 'styles', 'globals.css'), styles.join('
')); images.forEach((image, index) => { const imagePath = path.join(projectDir, 'public', 'images', `image${index}.png`); fse.writeFileSync(imagePath, image.src); }); fs.writeFileSync(path.join(projectDir, 'package.json'), JSON.stringify({ name: 'my-nextjs-project', version: '1.0.0', scripts: { dev: 'next dev', build: 'next build', start: 'next start' }, dependencies: { next: '^12.0.0', react: '^17.0.0', 'react-dom': '^17.0.0' } }, null, 2)); } function zipProject(projectDir, outputFilePath) { const output = fs.createWriteStream(outputFilePath); const archive = archiver('zip', { zlib: { level: 9 } }); output.on('close', () => { console.log('پروژه فشرده شد.'); }); archive.pipe(output); archive.directory(projectDir, false); archive.finalize(); } module.exports = { createNextjsProject, zipProject };
