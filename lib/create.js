import { read } from "node-yaml"
import * as fs from "fs";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import shell from "shelljs";

export default async (createType, componentName, options = {}) => {

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const localPath = process.cwd();

    if(!fs.existsSync('./atomext.yaml')){
        console.log('Please run atomext init first');
        process.exit(1);
    }

    const config = await read('./atomext.yaml');

    // Look for type with and without an 's'
    let createTypeMachine = createType;

    if(!config.directories.includes(createTypeMachine)){

        createTypeMachine = `${createTypeMachine}s`;

        if(!config.directories.includes(createTypeMachine)) {
            console.log(`${createType} does not exist in atomext.yaml`);
            process.exit(1);
        }
    }


    const directoryPath = `${localPath}/${config.component_path}/${createTypeMachine}/${componentName}`;

    // Check is component already exists
    if(fs.existsSync(`${directoryPath}`)){
        console.error(`${createTypeMachine}/${componentName} already exists`);
        process.exit(1);
    }

    let templatePath;
    if(options.css){
        templatePath = `${__dirname}/../templates/componentWithCss`;
    }else{
        templatePath = `${__dirname}/../templates/component`;
    }

    await shell.mkdir('-p', directoryPath);
    await shell.cp('-R', `${templatePath}/*`, `${directoryPath}/`);

    if(options.css){
        await shell.mv(`${directoryPath}/style.module.scss`, `${directoryPath}/${componentName}.module.scss`);
    }

    const useClient = options.client ? '"use client";' : '';

    shell.ls('-Rl', `${directoryPath}`).forEach(entry => {

        if(entry.isFile()){
            shell.sed('-i', `\\[NAME\\]`, componentName, `${directoryPath}/${entry.name}`);
            shell.sed('-i', `\\[CLIENT\\]`, useClient, `${directoryPath}/${entry.name}`);
        }
    });


    console.log(config);



}