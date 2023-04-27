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
    await create();
}