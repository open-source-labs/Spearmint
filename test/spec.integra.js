const Application = require('spectron').Application
const path = require('path')
const assert = require('assert')

// Require Electron from the binaries included in node_modules.
const electronPath = require('electron')

describe('Application launch', function () {
this.timeout(10000)

beforeEach(function () {
this.app = new Application({
// Your electron path can be any binary
path: electronPath,

  // Assuming you have the following directory structure

  //  |__ my project
  //     |__ ...
  //     |__ main.js === electron.js?
  //     |__ package.json
  //     |__ index.html
  //     |__ ...
  //     |__ test
  //        |__ spec.js  <- You are here! ~ Well you should be.

  // The following line tells spectron to look and use the main.js file
  // and the package.json located 1 level above.
  args: [path.join(__dirname, '..')]
})
return this.app.start()
})

afterEach(function () {
if (this.app && this.app.isRunning()) {
return this.app.stop()
}
})

// leverages the Google accessibility developer tools to audit windows and webviews
it('shows an initial window', function () {
return this.app.client.auditAccessibility().then(function (audit) {
if (audit.failed) {
console.error(audit.results)
}
})
})

})