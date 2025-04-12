const Application = require('spectron').Application;
const path = require('path');

// specifies the path of the application to launch
const electronPath = require('electron');

// tell spectron to look and use the main.js file + package.json located 2 levels above
const appPath = path.join(__dirname, '../..');

// instantiates the spearmint application given the optional paramaters of the Application API
const app = new Application({
  path: electronPath,  // string path to the Electron application executable to launch
  args: [appPath],     // array of paths to find the executable files and package.json   
});


describe('Application Accessibility Audit', function () {
  //app.timeout(10000);
  setTimeout(() => {
    console.log('application is launching');
  }, 1000)
  
  beforeEach(function () {
    return app.start();
  });

  afterEach(function () {
    if (app && app.isRunning()) {
      return app.stop();
    }
  });

  it('Audits Accessibility', function () {
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