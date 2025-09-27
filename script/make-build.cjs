
var fs = require('fs');
var fs2 = require('fs/promises');
var path = require('path');
var packageTmp = require('./package-tmp.json');
var packageJson = require('../package.json');

function copyFile(sourceFile, targetFile){
    const umdjs1 = path.join(__dirname, sourceFile);
    const umdjs2 = path.join(__dirname, targetFile);
    fs.copyFileSync(umdjs1, umdjs2)
}

function toBrowserJS(sourceFile, targetFile, version){
    const umdjs1 = path.join(__dirname, sourceFile);
    const umdjs2 = path.join(__dirname, targetFile);
    const contentString = fs.readFileSync(umdjs1,'utf-8');
    const versionString = `globalThis.FatDesign.version='${version}' ;`;
    const newContent = `
(function(){ 
    var globalThis = window;
    var self = window; 
    
    ${contentString} 
    
    ${versionString} 
 
})();\n\n`;
    fs.writeFileSync(umdjs2, newContent, 'utf-8');
}


function getDateTimeString() {
    const now = new Date()
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    return [year, month, day, hours, minutes, seconds].map((num) => {
        if (num < 10) {
            return '0' + num;
        }
        return num;
    }).join('')
}




// 方法1：使用原生fs模块实现
async function copyFolder(src, dest) {
    try {
        // 检查源文件夹是否存在
        await fs2.access(src);

        // 创建目标文件夹（如果不存在）
        await fs2.mkdir(dest, { recursive: true });

        // 读取源文件夹内容
        const entries = await fs2.readdir(src, { withFileTypes: true });

        for (const entry of entries) {
            const srcPath = path.join(src, entry.name);
            const destPath = path.join(dest, entry.name);

            if (entry.isDirectory()) {
                // 如果是文件夹，递归复制
                await copyFolder(srcPath, destPath);
            } else {
                // 如果是文件，直接复制
                await fs2.copyFile(srcPath, destPath);
                // console.log(`复制文件: ${srcPath} -> ${destPath}`);
            }
        }

        // console.log(`文件夹复制完成: ${src} -> ${dest}`);
        return true;
    } catch (err) {
        console.error('复制文件夹时出错:', err);
        return false;
    }
}

async function copyFolderEntry(src, dest){
    const srcPath = path.join(__dirname, src);
    const destPath = path.join(__dirname, dest);
    await copyFolder(srcPath, destPath);
    console.log(`文件夹复制完成: ${src} -> ${dest}`);
}

async function main(){
    const args = process.argv.slice(2);

    console.log('[make-build.js]  args   ' +  JSON.stringify(args), typeof args, Array.isArray(args))
    const betaVersion = getDateTimeString();

    if (args.includes('-p')) {
        packageTmp.version = packageJson.version;
    } else {
        packageTmp.version = packageJson.version + '-beta.' + betaVersion;
    }

    // packageTmp.version = '1.0.3-beta.3'


    packageTmp.buildTime = new Date().toUTCString()
    packageTmp.dependencies = packageJson.npmPackageDependencies;
    packageTmp.peerDependencies = packageJson.npmPackageDependencies;

    const targetPath = path.join(__dirname, '../dist/package.json');
    fs.writeFileSync(targetPath, JSON.stringify(packageTmp, null,4), 'utf-8');

    console.log('[make-build.js] build version :   ' + packageTmp.version);
    console.log('[make-build.js] build time :   ' + packageTmp.buildTime);

    toBrowserJS('../dist/index.umd.cjs', '../dist/index.browser.js', packageTmp.version);

    copyFile('../dist/index.umd.cjs', '../dist/index.umd.js');
    copyFile('../README.md', '../dist/README.md');


    // distTmp/0buildTypes types/
    await copyFolderEntry('../distTmp/0buildTypes', '../types/0buildTypes')
    //cp -r types dist/
    await copyFolderEntry('../types','../dist/types')
    // cp -r libs dist/
    await copyFolderEntry('../libs','../dist/libs')

}


main();
