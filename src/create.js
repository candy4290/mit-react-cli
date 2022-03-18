const fs = require('fs')
const utils = require('../utils/index')
const npm = require('./install')
const git = require('./init')

/* 三变量判断异步操作 */
let fileCount = 0  /* 文件数量 */
let dirCount = 0   /* 文件夹数量 */
let flat = 0       /* readir数量 */
let isInstall = false
let targetPath;
const path = require('path');

module.exports = function(res){
    /* 创建文件 */
    utils.green('------开始构建-------')
    const sourcePath = __dirname.slice(0,-3)+ (res.templateVersion === 'ts' ? 'template' : 'template_js')
    utils.blue('当前路径:'+ process.cwd())
    const target = process.cwd() + '\\' + res.name;
    targetPath = target;
    fs.mkdir(target, () => {
        revisePackageJson( res ,sourcePath, target).then(()=>{
            copy(sourcePath , target ,npm())
        })
    })
    /* 修改package.json*/
}

function copy (sourcePath,currentPath,cb){
    flat++
    fs.readdir(sourcePath,(err,paths)=>{
        flat--
        if(err){
            throw err
        }
        paths.forEach(path=>{
            if(path !=='package.json' ) fileCount++
            const  newSoucePath = sourcePath + '/' + path
            const  newCurrentPath = currentPath + '/' + path
            fs.stat(newSoucePath,(err,stat)=>{
                if(err){
                    throw err
                }
                if(stat.isFile() && path !=='package.json' ){
                    const readSteam = fs.createReadStream(newSoucePath)
                    const writeSteam = fs.createWriteStream(newCurrentPath)
                    readSteam.pipe(writeSteam)
                    utils.green( '创建文件：'+ newCurrentPath  )
                    fileCount--
                    completeControl(cb)
                }else if(stat.isDirectory()){
                    if(path !=='package.json' ){
                        dirCount++
                        dirExist( newSoucePath , newCurrentPath ,copy,cb)
                    }
                }
            })
        })
    })
}

function dirExist(sourcePath,currentPath,copyCallback,cb){
    fs.exists(currentPath,(ext=>{
        if(ext){
            copyCallback( sourcePath , currentPath,cb)
        }else {
            fs.mkdir(currentPath,()=>{
                fileCount--
                dirCount--
                copyCallback( sourcePath , currentPath,cb)
                utils.yellow('创建文件夹：'+ currentPath )
                completeControl(cb)
            })
        }
    }))
}
function completeControl(cb){
    if(fileCount === 0 && dirCount ===0 && flat===0){
        utils.green('------构建完成-------')
        const gitignoreExists = fs.existsSync(path.join(targetPath, '.gitignore'));
        if (gitignoreExists) {
            // Append if there's already a `.gitignore` file there
            const data = fs.readFileSync(path.join(targetPath, 'gitignore'));
            fs.appendFileSync(path.join(targetPath, '.gitignore'), data);
            fs.unlinkSync(path.join(targetPath, 'gitignore'));
        } else {
            // Rename gitignore after the fact to prevent npm from renaming it to .npmignore
            // See: https://github.com/npm/npm/issues/1862
            fs.renameSync(
                path.join(targetPath, 'gitignore'),
                path.join(targetPath, '.gitignore'),
            );
        }
        if(cb && !isInstall ){
            const gitInit = git([ 'init' ], targetPath);
            utils.blue('-----开始git init-----')
            gitInit(() => {
                utils.blue('-----完成git init-----')
                isInstall = true
                utils.blue('-----开始install-----')
                cb(()=>{
                    utils.blue('-----完成install-----')
                    // /* 判断是否存在webpack  */
                    // runProject()
                }, targetPath)
            }, targetPath)
        }
    }
}

function runProject(){
    try{
        const doing = npm([ 'start' ])
        doing()
    }catch(e){
       utils.red('自动启动失败，请手动npm start 启动项目')
    }
}

function revisePackageJson(res,sourcePath, targetPath){
    return new Promise((resolve)=>{
        fs.readFile(sourcePath+'/package.json',(err,data)=>{
            if(err) throw err
            const { author , name, version  } = res
            let json = data.toString()
            json = json.replace(/demoName/g,name.trim())
            json = json.replace(/demoAuthor/g,author.trim())
            json = json.replace(/demoVersion/g,version.trim())
            const path = targetPath + '/package.json'
            fs.writeFile(path, new Buffer(json) ,()=>{
                utils.green( '创建文件：'+ path )
                resolve()
            })
        })
    })
}