import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';

const [,, packageName, version, tag] = process.argv;

if (!packageName || !version || !tag) {
  console.error('Usage: publish.mjs <packageName> <version> <tag>');
  process.exit(1);
}

// A simple SemVer validation to validate the version
const validVersion = /^\d+\.\d+\.\d+(-\w+\.\d+)?/;
if (!version || !validVersion.test(version)) {
  console.error(`No version provided or version did not match Semantic Versioning, expected: #.#.#-tag.# or #.#.#, got ${version}.`);
  process.exit(1);
}

// Updating the version in "package.json" before publishing
try {
  const packageJsonPath = `dist/packages/${packageName}/package.json`;
  const packageJson = JSON.parse(readFileSync(packageJsonPath).toString());
  packageJson.version = version;
  writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  console.log(`Publishing ${packageName}@${version} with tag ${tag}...`);
  execSync(`npm publish --tag ${tag} --access public`, { stdio: 'inherit', cwd: `dist/packages/${packageName}` });
  console.log(`Successfully published ${packageName}@${version} with tag ${tag}`);
} catch (error) {
  console.error('Error publishing package:', error);
  process.exit(1);
}
