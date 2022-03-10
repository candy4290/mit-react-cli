#!/usr/bin/env node
'use strict';
const program = require('commander')
const create = require('../src/create')
const inquirer = require('../src/inquirer')
const utils = require( '../utils/index' )
const { green, yellow, blue } = utils

/* create a project */
program
.command('create')
.description('create a project ')
.action(function(){
	green('欢迎使用mit-react-cli,轻松构建react ts项目～')
	inquirer.create().then(res=>{
        if(res){
            create( res )
		}
	})
})

program.parse(process.argv)