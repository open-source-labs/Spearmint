const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
let mainWindow;

if (isDev) console.log('electron version', process.versions.electron);

if (isDev) {
  const {
    default: installExtension,
    REACT_DEVELOPER_TOOLS,
  } = require('electron-devtools-installer');
  function addDevTools() {
    app.whenReady().then(() => {
      installExtension(REACT_DEVELOPER_TOOLS)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('An error occurred: ', err));
    });
  }
}
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1550,
    height: 750,
    minHeight: 750,
    icon: path.join(__dirname, 'public/icon.png'),
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true,
    },
  });
  mainWindow.loadURL(
    isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`
  );
  mainWindow.on('closed', () => (mainWindow = null));
}

if (isDev) {
  app.on('ready', addDevTools);
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
