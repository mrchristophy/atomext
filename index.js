#!/usr/bin/env node

import init from './lib/init.js';
import create from './lib/create.js';
import minimist from 'minimist';

const args = minimist(process.argv.slice(2));

const action = args._[0];

if(action === 'init'){
    await init(args);
}

if(action === 'create'){

    const createType = args._[1];
    const componentName = args._[2];
    if(!createType){
        console.log('Please specify a type of component to create');
        process.exit(1);
    }
    if(!componentName){
        console.log('Please specify a name for the component');
        process.exit(1);
    }

    await create(createType, componentName, {css: args.css, client: args.client});
}