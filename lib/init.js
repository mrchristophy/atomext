/**
 * Initialize Atomext
 * @param args
 * @param options
 * @param logger
 * @returns {Promise<void>}
 */

import inquirer from "inquirer";
import * as fs from "fs";
import InquirerFuzzyPath from "inquirer-fuzzy-path"
import shell from "shelljs";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { write } from "node-yaml"


export default async (args) => {

    inquirer.registerPrompt('fuzzypath', InquirerFuzzyPath);

    const usingSrc = fs.existsSync('src');
    const localPath = process.cwd();
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);


    // Todo: add validation
    const directoryChoices = [
        {'name': 'Atoms', 'value': 'atoms', 'checked': true},
        {'name': 'Molecules', 'value': 'molecules', 'checked': true},
        {'name': 'Organisms', 'value': 'organisms', 'checked': true},
        {'name': 'Templates', 'value': 'templates'},
        {'name': 'Pages', 'value': 'pages'},
    ]

    const questions = [
        {
            type: 'fuzzypath',
            name: 'component_directory',
            message: "Component directory path",
            itemType: 'directory',
            excludeFilter: nodePath => nodePath.startsWith('node_modules') || nodePath.startsWith('.'),
            suggestOnly: true,
            default(){
                return usingSrc ? 'src/components' : 'components';
            }
        },
        {
            type: 'checkbox',
            name: 'directories',
            message: "Which default directories should be included?",
            choices: directoryChoices
        },
        {
            type: 'input',
            name: 'custom_directories',
            message: "Add any other custom directories (comma separated)",
        },
    ];

    inquirer.prompt(questions).then(async answers => {

        // Todo: check component_directory exists
        const componentPath = `${localPath}/${answers.component_directory}`;

        // Todo: check if directory exists and/or has files
        await shell.mkdir('-p', `${componentPath}`);

        let directories = answers.directories;

        if(answers.custom_directories){
            const customDirectories = answers.custom_directories.toLowerCase().replace(/ /g,'').split(',');
            directories = [...directories, ...customDirectories];
        }

        for(const directory of directories){
            await shell.cp('-R', `${__dirname}/../templates/componentDirectory`, `${componentPath}/${directory}`);
        }

        // Write yaml file config
        await write(`./atomext.yaml`, {
            component_path: answers.component_directory,
            directories: directories
        });

        console.log(JSON.stringify(answers, null, '  '));
    })

}
