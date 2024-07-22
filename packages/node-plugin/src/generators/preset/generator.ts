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
    json.scripts.start = 'nodemon --exec ts-node src/index.ts';
    return json;
  });

  return addDependenciesToPackageJson(
    tree,
    {
      express: 'latest',
      mongoose: 'latest',
      dotenv: 'latest',
    },
    {
      '@types/node': 'latest',
      '@types/express': 'latest',
      'ts-node': 'latest',
      'typescript': 'latest',
      'nodemon': 'latest'
    }
  );
}

export default presetGenerator;
