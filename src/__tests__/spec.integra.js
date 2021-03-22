const Application = require('spectron').Application

const assert = require('assert')

const electronPath = require('electron') // Require Electron from the binaries included in node_modules.

const path = require('path')

describe('Application launch', function () {
  this.timeout(10000)
  beforeEach(function () {
    this.app = new Application({
    // specifies the path of the application to launch
    path: electronPath,
    // Tells spectron where to look for the main.js file and the package.json located 2 levels above
    args: [path.join(__dirname, '../..')]
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
    })
  })

})