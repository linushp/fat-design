const fs = require('fs');
const os = require('os');
const path = require('path');
const readline = require('readline');
const packageJson = require('../package.json');

function kebabToPascalCase(str) {
    return str
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
}


function copyFile(sourceFile, targetFile){
    const umdjs1 = path.join(__dirname, sourceFile);
    const umdjs2 = path.join(__dirname, targetFile);
    fs.copyFileSync(umdjs1, umdjs2)
}

function toBrowserJS(sourceFile, targetFile){
    const umdjs1 = path.join(__dirname, sourceFile);
    const umdjs2 = path.join(__dirname, targetFile);
    const contentString = fs.readFileSync(umdjs1,'utf-8');
    const versionName = "VersionOf" + kebabToPascalCase(packageJson.name)
    const versionString = `globalThis["${versionName}"]='${packageJson.version}-${Date.now()}' ;`;
    const newContent = `
(function(){ 
    var globalThis = window;
    var self = window; 
    
    ${contentString} 
    
    ${versionString} 
 
})();\n\n`;
    fs.writeFileSync(umdjs2, newContent, 'utf-8');
}


// const SERVER_DOMAIN = 'https://devops-admin.uifaas.com'
const SERVER_DOMAIN = packageJson.uifaasDeploy.serverOrigin;

const FOLDER_PATH = path.join(__dirname, '../dist');
const COOKIES_FILE_PATH = path.join(os.homedir(), '.uifaas-dev-cookies.txt')
const CSRF_TOKEN_FILE_PATH = path.join(os.homedir(), '.uifaas-dev-csrftoken.txt')
console.log('COOKIES_FILE_PATH', COOKIES_FILE_PATH)
console.log('CSRF_TOKEN_FILE_PATH', CSRF_TOKEN_FILE_PATH)
const LOGIN_URL = `${SERVER_DOMAIN}/ns/api/auth/login`;
const UPLOAD_URL = `${SERVER_DOMAIN}/ns/api/manage/deploy/uploadAssets`;
const RELEASE_ASSETS_URL = `${SERVER_DOMAIN}/ns/api/manage/deploy/releaseAssets`;


function getCsrfTokenHeaders() {
    const csrfToken = fs.readFileSync(CSRF_TOKEN_FILE_PATH, 'utf8').trim();
    return {
        "fatcmscsrftoken": csrfToken
    }
}


function traverseDirectorySync(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            traverseDirectorySync(filePath, fileList);
        } else if (stat.isFile()) {
            fileList.push(filePath);
        }
    });
    return fileList;
}


class DeployAssets {
    constructor() {
    }

    async traverseUploadAssets() {
        await this.checkCookiesAndLogin();
        const allFiles = traverseDirectorySync(FOLDER_PATH).filter((f) => {
            return !f.endsWith('.DS_Store');
        })
        console.log('发现文件列表:', allFiles);
        for (let i = 0; i < allFiles.length; i++) {
            const filePath = allFiles[i];
            await this.uploadFile(filePath, UPLOAD_URL, i);
        }
        console.log('任务结束');
    }


    async uploadFile(filePath, uploadUrl, index) {

        const fileBuffer = fs.readFileSync(filePath);
        const fileName = path.basename(filePath);

        const fileBlob = new Blob([fileBuffer]);

        const distPath = path.join(__dirname, '../dist')
        const ss = filePath.replace(distPath, '');
        const ss2 = ss.replace(/\\/g, '/');
        const uploadPath = packageJson.name + '/' + packageJson.version + '' + ss2;

        console.log('uploadPath', uploadPath);

        const formData = new FormData();
        formData.append('file', fileBlob, fileName);
        formData.append('uploadPath', uploadPath);

        const cookies = fs.readFileSync(COOKIES_FILE_PATH, 'utf8');

        const response = await fetch(uploadUrl, {
            method: 'POST',
            body: formData,
            headers: {
                'Cookie': cookies,
                ...getCsrfTokenHeaders(),
            }
        });

        console.log('开始上传文件： ' + index + ' : ' + filePath)
        const responseText = await response.text();
        let responseData;
        try {
            responseData = JSON.parse(responseText);
        } catch (error) {
            console.error('上传失败： ' + filePath, responseText)
            throw new Error(responseText);
            return;
        }

        if (!responseData.success && responseData.code === 'NOT_LOGIN') {
            fs.unlinkSync(COOKIES_FILE_PATH);
            await this.traverseUploadAssets();
            return
        }

        if (!responseData.success) {
            console.error('开始上传失败： ' + filePath, responseData)
            throw new Error(responseData);
        } else {
            console.log('文件上传成功：' + responseData.data.storageUrl);
        }
    }

    async checkCookiesAndLogin() {
        const t = fs.existsSync(CSRF_TOKEN_FILE_PATH);
        if (!t) {
            await this.readAndSaveCsrfToken()
        }
        const s = fs.existsSync(COOKIES_FILE_PATH);
        if (!s) {
            await this.loginAndSaveCookies()
        }
    }

    async readAndSaveCsrfToken() {
        return new Promise((resolve, reject) => {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            rl.question('Enter csrftoken: ', (csrftoken) => {
                rl.close();
                fs.writeFileSync(CSRF_TOKEN_FILE_PATH, csrftoken.trim());
                console.log('csrftoken saved to', CSRF_TOKEN_FILE_PATH)
                resolve(csrftoken)
            });
        })
    }

    async readLoginUserName() {
        return new Promise((resolve, reject) => {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            rl.question('Enter username: ', (loginName) => {
                rl.question('Enter password: ', (plainPwd) => {
                    rl.close();
                    resolve({loginName, plainPwd})
                });
            });
        })
    }


    async loginAndSaveCookies() {
        const loginData = await this.readLoginUserName();

        const response = await fetch(LOGIN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...getCsrfTokenHeaders(),
            },
            body: JSON.stringify(loginData),
        });

        // 检查响应是否成功
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const resBody = await response.json();

        if (!resBody.success) {
            throw new Error(`Biz error! message: ${resBody.message}`);
        }

        // 获取 'set-cookie' header
        const cookies = response.headers.get('set-cookie');
        if (cookies) {
            fs.writeFileSync(COOKIES_FILE_PATH, cookies);
            console.log('Cookies saved to cookies.txt', cookies);
        } else {
            console.log('No Set-Cookie header found');
        }
    }

}


class ReleaseAssets {
    constructor() {}

    extractCdnResourcesOfIndexHTMLContent(html) {
        // const cdnBase = '//cdnjsx.oss-cn-shanghai.aliyuncs.com/assets/fatcms-web/0.0.0/';
        const cdnBase = `${packageJson.uifaasDeploy.baseCdnUrl}/${packageJson.name}/${packageJson.version}/`;
        const jsRegex = new RegExp(`<script([^>]*)src="(${cdnBase}[^"]+)"`, 'g');
        const cssRegex = new RegExp(`<link([^>]*)href="(${cdnBase}[^"]+)"`, 'g');

        const cdnResources = [];
        let jsMatch;
        while ((jsMatch = jsRegex.exec(html))!== null) {
            const typeAttr = jsMatch[1].match(/type="([^"]+)"/);
            const isModule = (typeAttr && typeAttr[1] === 'module');
            cdnResources.push({ fileUrl: jsMatch[2], fileType: 'js', isModule: !!isModule });
        }

        let cssMatch;
        while ((cssMatch = cssRegex.exec(html))!== null) {
            cdnResources.push({ fileUrl: cssMatch[2], fileType: 'css', isModule: false });
        }

        return cdnResources;
    }

    extractCdnResourcesOfIndexHTML(){
        const htmlFilePath = path.join(__dirname, '../dist/index.html');
        const htmlContent =  fs.readFileSync(htmlFilePath,'utf-8');
        const cdnResources = this.extractCdnResourcesOfIndexHTMLContent(htmlContent);
        console.log("发现如下资源文件", cdnResources);
        return cdnResources
    }

    toBrowserJS(){
        if (this.isByIndexUmdCjs()) {
            toBrowserJS('../dist/index.umd.cjs', '../dist/index.browser.js');
        }
    }


    extractCdnResourcesOfUmdCjs() {
        const cdnBase = `${packageJson.uifaasDeploy.baseCdnUrl}/${packageJson.name}/${packageJson.version}/`;
        return [
            {
                fileUrl: `${cdnBase}index.browser.js`,
                fileType: 'js',
                isModule: false
            },
            {
                fileUrl: `${cdnBase}index.css`,
                fileType: 'css',
                isModule: false
            },
        ];
    }


    isByIndexHTML(){
        const htmlFilePath = path.join(__dirname, '../dist/index.html');
        const byHtml = fs.existsSync(htmlFilePath);
        return !!byHtml;
    }

    isByIndexUmdCjs(){
        const umdCjsPath = path.join(__dirname, '../dist/index.umd.cjs');
        const umdCssPath = path.join(__dirname, '../dist/index.css');
        const byUmdCjs = fs.existsSync(umdCjsPath);
        const byUmdCss = fs.existsSync(umdCssPath);
        return byUmdCjs && byUmdCss;
    }


    extractCdnResources() {
        if (this.isByIndexHTML()) {
            return this.extractCdnResourcesOfIndexHTML();
        }
        if (this.isByIndexUmdCjs()) {
            return this.extractCdnResourcesOfUmdCjs();
        }
        throw new Error("无法抽取CDN资源文件")
    }


    async releaseAssets(){
        const cdnResources = this.extractCdnResources();
        const cookies = fs.readFileSync(COOKIES_FILE_PATH, 'utf8');

        if (!cdnResources.length) {
            console.log("没有提取到资源文件");
            return
        }

        const response = await fetch(RELEASE_ASSETS_URL, {
            method: 'POST',
            body: JSON.stringify({
                cdnResources: cdnResources,
                packageName: packageJson.name,
                packageVersion: packageJson.version,
            }),
            headers: {
                'content-type': 'application/json',
                'Cookie': cookies,
                ...getCsrfTokenHeaders(),
            }
        });

        const responseText = await response.text();
        let responseData;
        try {
            responseData = JSON.parse(responseText);
        } catch (error) {
            console.error('发布失败： ', error)
            throw new Error(responseText);
            return;
        }

        if (responseData.success) {
            console.error('发布成功=> ', responseData.message);
        } else {
            console.error('发布失败=> ', responseData.message);
        }
    }
}


async function deployAssets(args) {

    const deployObj = new DeployAssets()
    const releaseObj = new ReleaseAssets()

    await releaseObj.toBrowserJS();

    console.log("deployAssets argv:" , args);

    if (args.includes('-upload')) {
        await deployObj.traverseUploadAssets();
    }

    if (args.includes('-deploy')) {
        await deployObj.checkCookiesAndLogin();
        await releaseObj.releaseAssets();
    }
}


const args = process.argv.slice(2); // 获取从索引2开始的所有参数

deployAssets(args);

