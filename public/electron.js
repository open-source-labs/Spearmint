const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;
let testView;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    minWidth: 1400,
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
