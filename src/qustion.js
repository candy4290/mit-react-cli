const fs = require('fs');
const utils = require('../utils/index')

const create = [
    {
        type:'input',
        name:'name',
        message:'请输入项目名称？',
        default: 'my-app',
        validate: (input) => {
            const fileName = `${process.cwd()}\\${input || name}`; // 文件名称路径
            if (fs.existsSync(fileName)) {
              utils.yellow("项目名称已存在");
              return false;
            } else {
              return true;
            }
        }
    },{
        type:'input',
        name:'author',
        message:'请输入作者？',
        default: 'mit-frontend-developer'
    },{
        type:'input',
        name:'version',
        message:'请输入版本？',
        default: '0.1.0'
    },{
        type: 'list',
        name: 'templateVersion',
        message: '请选择ts/js',
        choices: ['js', 'ts'],
        default: 1
    }
]
module.exports = {
    create
}