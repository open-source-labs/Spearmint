const Application = require('spectron').Application;
const path = require('path');
const chai = require('chai');
// const global = require('chai')
const chaiAsPromised = require('chai-as-promised');

// specifies the path of the application to launch
const electronPath = require('electron');

// tell spectron to look and use the main.js file + package.json located 2 levels above
const appPath = path.join(__dirname, '../..');


// instantiates the spearmint application given the optional paramaters of the Application API
const app = new Application({
  path: electronPath,  // string path to the Electron application executable to launch
  args: [appPath],     // array of paths to find the executable files and package.json 
});

// define the use of chai and chai as promised packages
// UNCOMMENT THE LINES BELOW TO UPDATE TESTING SUITE
// global.before(function () {
//   chai.should();
//   chai.use(chaiAsPromised);
// });

xdescribe('Application Accessibility Audit', function () {
  this.timeout(10000);

  beforeEach(function () {
    return app.start();
  });

  afterEach(function () {
    if (app && app.isRunning()) {
      return app.stop();
    }
  });

  it('Audits Accessibility', function (done) {
    app.client.auditAccessibility().then(function (audit) {
      if (audit.failed) {
        console.error('Please address the following accessibility issues in your application: \n', audit.results)
      }
      else {
        console.log('No accessibility issues have been found.')
      }
      done()
    })
  });  
});