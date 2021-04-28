const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const fs = require('fs');
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
};

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

  // PTY PROCESS FOR IN APP TERMINAL
  const ptyProcess = pty.spawn(shell, [], {
    name: 'xterm-color',
    cols: 80,
    rows: 80,
    cwd: process.env.HOME,
    env: process.env,
  });
  // with ptyProcess, we want to send incoming data to the channel terminal.incData
  ptyProcess.on('data', (data) => {
    mainWindow.webContents.send('terminal.incData', data);
  });
  // in the main process, at terminal.toTerm channel, when data is received, 
  // main process will write to ptyProcess
  ipcMain.on('terminal.toTerm', function(event, data) {
    ptyProcess.write(data);
  })
};

// FILEDIRECTORY.JSX READ FILE FUNCTIONALITY
ipcMain.on('FileDirectory.readFile', (e, filePath) => {
  e.returnValue = fs.readFileSync(filePath, 'utf8', (err) => {
    if (err) throw err;
  });
});

// EDITORVIEW.JSX SAVE FILE FUNCTIONALITY
ipcMain.on('EditorView.saveFile', (e, {filePath, editedText}) => {
  fs.writeFile(filePath, editedText, (err) => {
    if (err) throw err;
  });
  // Return a success message upon save
  e.returnValue = 'Changes Saved'
});

/*
  EXPORTFILEMODAL.JSX FILE FUNCTIONALITY 
  (check existence and create folder)
*/
ipcMain.on('ExportFileModal.exists', (e, fileOrFolderPath) => {
  e.returnValue = fs.existsSync(fileOrFolderPath, (err) => {
    if (err) throw err;
  });
});

ipcMain.on('ExportFileModal.mkdir', (e, folderPath) => {
  e.returnValue = fs.mkdirSync(folderPath, (err) => {
    if (err) throw err;
  });
});

ipcMain.on('ExportFileModal.fileCreate', (e, {filePath, file}) => {
  e.returnValue = fs.writeFile(filePath, file, (err) => {
    if (err) throw err;
  });
});

ipcMain.on('ExportFileModal.readFile', (e, filePath) => {
  e.returnValue = fs.readFileSync(filePath, 'utf8', (err) => {
    if (err) throw err;
  });
});

// OPENFOLDERBUTTON.JSX FILE FUNCTIONALITY
ipcMain.on('OpenFolderButton.isDirectory' , (e, filePath) => { 
  e.returnValue = fs.statSync(filePath).isDirectory();
});

ipcMain.on('OpenFolderButton.dialog' , (e) => { 
  const dialogOptions = {
    properties: ['openDirectory', 'createDirectory'],
    filters: [
      { name: 'Javascript Files', extensions: ['js', 'jsx'] },
      { name: 'Style', extensions: ['css'] },
      { name: 'Html', extensions: ['html'] },
    ],
    message: 'Please select your project folder',
  };
  e.returnValue = dialog.showOpenDialogSync(dialogOptions);
});

/*
UNIVERSAL IPC CALLS
(The following IPC calls are made from various components in the codebase)
*/
ipcMain.on('Universal.stat' , (e, filePath) => { 
  e.returnValue = fs.statSync(filePath).isDirectory();
});

ipcMain.on('Universal.readDir', (e, projectFilePath) => {
  e.returnValue = fs.readdirSync(projectFilePath, (err) => {
    if (err) throw err;
  });
});

// ELECTRON BOILERPLATE FOR DEVTOOLS AND WINDOW CREATION
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
