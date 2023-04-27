import { read } from "node-yaml"
import * as fs from "fs";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import shell from "shelljs";
import inquirer from "inquirer";

/**
 * Create a new component
 * @returns {Promise<void>}
 */
export default async () => {

    const questions = [];

    const config = await read('./atomext.yaml');
    let createType;
    let componentName;
    let useCss = false;
    let useClient = false;

    //if(createType === undefined){
        questions.push({
            type: 'list',
            name: 'create_type',
            message: "Select component type",
            choices: config.directories.map((directory) => directory.replace(/s$/, ''))
        });
    //}

    //if(createType === undefined){
        questions.push({
            type: 'input',
            name: 'component_name',
            message: "Component Name",
            validate: function(value){
                if(/(^[A-Z][a-z]+)+/.test(value)){
                    return true;
                }else{
                    return "Component name must be in ReactFormat <-- like this";
                }

            }
        });
    //}

    //if(options.css === undefined){
        questions.push({
            type: 'confirm',
            name: 'use_css',
            message: "Add a SCSS module file?",
        });
    // }else{
    //     useCss = options.css;
    // }

    //if(options.client === undefined){
        questions.push({
            type: 'confirm',
            name: 'use_client',
            message: "Is this a client component?",
        });
    // }else{
    //     useClient = options.client;
    // }

    if(questions.length > 0){
        const answers = await inquirer.prompt(questions);
        if(answers.create_type){
            createType = answers.create_type;
        }
        if(answers.component_name){
            componentName = answers.component_name;
        }
        if(answers.use_css){
            useCss = answers.component_name;
        }
        if(answers.use_client){
            useClient = answers.use_client;
        }
    }

    const useClientString = useClient ? '"use client";' : '';

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const localPath = process.cwd();

    if(!fs.existsSync('./atomext.yaml')){
        console.log('Please run atomext init first');
        process.exit(1);
    }



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
    if(useCss){
        templatePath = `${__dirname}/../templates/componentWithCss`;
    }else{
        templatePath = `${__dirname}/../templates/component`;
    }

    await shell.mkdir('-p', directoryPath);
    await shell.cp('-R', `${templatePath}/*`, `${directoryPath}/`);

    if(useCss){
        await shell.mv(`${directoryPath}/style.module.scss`, `${directoryPath}/${componentName}.module.scss`);
    }


    shell.ls('-Rl', `${directoryPath}`).forEach(entry => {

        if(entry.isFile()){
            shell.sed('-i', `\\[NAME\\]`, componentName, `${directoryPath}/${entry.name}`);
            shell.sed('-i', `\\[CLIENT\\]`, useClientString, `${directoryPath}/${entry.name}`);
        }
    });


    console.log(`${createTypeMachine}/${componentName} created!`);



}