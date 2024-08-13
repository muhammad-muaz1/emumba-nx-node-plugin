import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  Tree,
  addDependenciesToPackageJson,
  updateJson,
} from '@nx/devkit';
import * as path from 'path';
import { PresetGeneratorSchema } from './schema';

export async function presetGenerator(
  tree: Tree,
  options: PresetGeneratorSchema
) {
  const projectRoot = `.`;
  addProjectConfiguration(tree, options.name, {
    root: projectRoot,
    projectType: 'application',
    sourceRoot: `${projectRoot}/src`,
    targets: {},
  });
  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, options);
  await formatFiles(tree);

  updateJson(tree, 'package.json', (json) => {
    json.scripts = json.scripts || {};
    json.scripts.start = 'nodemon --exec ts-node server.ts';
    json.scripts.test = 'jest';
    json.scripts.lint = 'eslint . --ext .ts';
    return json;
  });

  if(options.userAuth === "token-based" && tree.exists(`${projectRoot}/types/express-session`)){
    tree.delete(`${projectRoot}/types/express-session`);
  }

  if(options.architecture === "micro-services" && tree.exists(`${projectRoot}/src`)){
    tree.delete(`${projectRoot}/src`);
  }

  if(options.architecture === "monolithic" && tree.exists(`${projectRoot}/apps`)){
    tree.delete(`${projectRoot}/apps`);
  }

  return addDependenciesToPackageJson(
    tree,
    {
      express: 'latest',
      mongoose: 'latest',
      dotenv: 'latest',
      cors: 'latest',
      ioredis: 'latest',
      jsonwebtoken: 'latest',
      bcrypt: '^5.1.1',
      'express-session': 'latest',
    },
    {
      '@types/node': 'latest',
      '@types/express': 'latest',
      '@types/jsonwebtoken': 'latest',
      '@types/express-session': 'latest',
      '@types/bcrypt': '^5.0.2',
      '@types/cors': 'latest',
      "@types/jest": "latest",
      "@types/mocha": "latest",
      "jest": "latest",
      "ts-jest": "latest",
      'ts-node': 'latest',
      'typescript': 'latest',
      'nodemon': 'latest'
    }
  );
}

export default presetGenerator;
