const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const os = require('os');
const pty = require('node-pty');

//Dynamic variable to change terminal type based on os
let shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

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
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true,
      // EnableRemoteModule true is required for electron v10 and above. 
      enableRemoteModule: true,
    },
  });
  mainWindow.loadURL(
    isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`
  );
  mainWindow.on('closed', () => (mainWindow = null));

  const ptyProcess = pty.spawn(shell, [], {
    name: 'xterm-color',
    cols: 80,
    rows: 80,
    cwd: process.env.HOME,
    env: process.env,
  });
  ptyProcess.on('data', (data) => {
    // process.stdout.write(data);
    mainWindow.webContents.send('terminal.incData', data);
  });
  ipcMain.on('terminal.toTerm', function(event, data) {
    ptyProcess.write(data);
  })
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
