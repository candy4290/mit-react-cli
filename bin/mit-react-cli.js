#!/usr/bin/env node
'use strict';
const program = require('commander')
const create = require('../src/create')
const inquirer = require('../src/inquirer')
const utils = require( '../utils/index' )
var pjson = require('../package.json')
const { green, yellow, blue } = utils

/* create a project */
program
.command('create')
.description('创建项目')
.action(function(){
	green(`欢迎使用mit-react-cli ${pjson.version},轻松构建react ts项目～`)
	inquirer.create().then(res=>{
        if(res){
            create( res )
		}
	})
})

program.usage("[commands] [options]").version(pjson.version, "-v, --version", "输出版本号").helpOption("-h, --help", "输出所有命令");

program.parse(process.argv)