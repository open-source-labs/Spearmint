const Application = require('spectron').Application

const assert = require('assert')

const electronPath = require('electron') // Require Electron from the binaries included in node_modules.

const path = require('path')

describe('Application launch', function () {
  this.timeout(10000);
  beforeEach(function () {
    // instantiates the spearmint application given the optional paramaters of the Application API
    this.app = new Application({
    path: electronPath,                   // specifies the path of the application to launch
    args: [path.join(__dirname, '../..')] // Tells spectron where to look for the main.js file and the package.json located 2 levels above
  })
  return this.app.start();
  })

  afterEach(function () {
    if (this.app && this.app.isRunning()) {
      return this.app.stop()
    }
  })

  it('audits accessibility', function () {
    return this.app.client.auditAccessibility().then(function (audit) {
      if (audit.failed) {
        console.error(audit.message)
      }
      else {
        console.log('No accessibility issues have been found.')
      }
    })
  })
})