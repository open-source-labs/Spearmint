const Application = require('spectron').Application;
const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

// specifies the path of the application to launch
const electronPath = require('electron');

// Tell spectron to look and use the main.js file + package.json located 1 level above
const appPath = path.join(__dirname, '../..');


// instantiates the spearmint application given the optional paramaters of the Application API
const app = new Application({
  path: electronPath, // string path to the Electron application executable to launch
  args: [appPath]     // array of paths to find the executable files and package.json 

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

  it('audits accessibility', function () {
      return app.client.auditAccessibility().then(function (audit) {
          if (audit.failed) {
            console.error('Please address the following accessibility issues in your application: \n', audit.results)
          }
          else {
            console.log('No accessibility issues have been found.')
          }
      })
  });
});