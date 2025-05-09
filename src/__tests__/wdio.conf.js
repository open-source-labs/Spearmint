import url from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const exampleDir = process.env.EXAMPLE_DIR || 'forge-esm';
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const appDir = path.join(__dirname, '..', 'apps', exampleDir);
const packageJsonPath = path.join(appDir, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, { encoding: 'utf-8' }));

globalThis.packageJson = packageJson;
process.env.TEST = 'true';

export const config = {

    services: [['electron', { rootDir, restoreMocks: true }]],
    capabilities: [
        {
            'browserName': 'electron',
            'wdio:electronServiceOptions': {
                appArgs: ['foo', 'bar=baz'],
            },
        },
    ],

    waitforTimeout: 5000,
    connectionRetryCount: 2,
    connectionRetryTimeout: 30000,
    logLevel: 'debug',
    runner: 'local',
    outputDir: `wdio-logs-${exampleDir}`,
    specs: ['./test/js/*.spec.js'],
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 30000,
    },
};