#!/usr/bin/env node

import { createWorkspace } from 'create-nx-workspace';
import { prompt } from 'enquirer';

async function main() {
  try{
    let name = process.argv[2]; // TODO: use libraries like yargs or enquirer to set your workspace name
    if (!name) {
      name = (
        await prompt<{ name: string }>({
          required: true,
          type: 'input',
          name: 'name',
          message: 'What is the name of the project?',
        })
      ).name;
      // name = response.name;
    }

    const userAuthArg = process.argv[3];
    let userAuth = 'none';
    if (!userAuthArg) {
      userAuth = (
        await prompt<{ userAuth: string }>({
          type: 'select',
          name: 'userAuth',
          message: 'Which user authentication do you want to use?',
          choices: ['session-based', 'token-based', 'none'],
        })
      ).userAuth;
    } else {
      userAuth = userAuthArg;
    }
  
    console.log(`Creating the workspace: ${name}`);
  
    // This assumes "node-plugin" and "create-emumba-node-app" are at the same version
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const presetVersion = require('../package.json').version;
  
    // TODO: update below to customize the workspace
    const { directory } = await createWorkspace(`node-plugin@${presetVersion}`, {
      name,
      nxCloud: 'skip',
      packageManager: 'npm',
      userAuth
    });
  
    console.log(`Successfully created the workspace: ${directory}.`);
  }
  catch(err){
    process.exit(1);
  }
}

main();
