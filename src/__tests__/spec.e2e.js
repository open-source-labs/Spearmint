const Application = require('spectron').Application;
const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

// specifies the path of the application to launch
// const electronPath = path.join(__dirname, '..', 'node_modules', '.bin', 'electron');
const electronPath = require('electron');

// provides syntax concatenation for windows compatibility
// if (process.platform === 'win32') {
// electronPath += '.cmd';
// }

// Tell spectron to look and use the main.js file + package.json located 1 level above
const appPath = path.join(__dirname, '../../public');

const mainPath = path.join(__dirname, '../public');

// instantiates the spearmint application given the optional paramaters of the Application API
const app = new Application({
  path: electronPath, // string path to the Electron application executable to launch
  args: [appPath] // array of paths to find the executable files and package.json ### try to add additional paths and

});

// define the use of chai and chai as promised packages
global.before(function () {
chai.should();
chai.use(chaiAsPromised);
});

describe('Test Example', function () {
  beforeEach(function () {
    return app.start();
  });

  afterEach(function () {
    return app.stop();
  });

  it('opens a window', function () {
    return app.client.waitUntilWindowLoaded()
        .getWindowCount().should.eventually.equal(1);
  });

  it('tests accessibility', function () {
        return app.client.auditAccessibility().then(function (audit) {
            if (audit.failed) {
            console.error(audit.results)
            }
        })
  });
});