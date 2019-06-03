const { app, BrowserWindow, BrowserView, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;
let testView;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1300,
    minWidth: 1300,
    height: 750,
    minHeight: 750,
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

ipcMain.on('openTest', (event, arg) => {
  testView = new BrowserView({
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true,
    },
  });

  mainWindow.addBrowserView(testView);

  testView.setBounds({
    x: 750,
    y: 0,
    width: 750,
    height: 750,
  });

  testView.webContents.loadURL(arg);
});
