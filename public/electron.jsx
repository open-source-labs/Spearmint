// The MAIN process: OUR BACKEND //

const {
  app,
  BrowserWindow,
  ipcMain,
  dialog,
  session,
  webContents,
} = require('electron');
require('dotenv').config({ path: __dirname + '/../.env' });
const path = require('path');
const fs = require('fs');
const np = require('node-pty');
const os = require('os');

// app.commandLine.appendSwitch('--headless');
// app.commandLine.appendSwitch('--no-sandbox');
// from selenium import webdriver
// chromeOptions = webdriver.ChromeOptions()
// chromeOptions.add_argument("--headless")
// chromeOptions.add_argument("--no-sandbox")
// //chromeOptions.add_argument("--disable-gpu")
// driver = webdriver.Chrome(chrome_options=chromeOptions)
// driver.get(url)
// (python) so maybe not work

// Comment below require out if you don't want app to reload on code changes
require('electron-reloader')(module);

// react developer tools for electron in dev mode
//const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');
const { Module } = require('module');
// global bool to determine if in dev mode or not
// const isDev = true;
//Dynamic variable to change terminal type based on os
const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

// Checks .env local file to see if APP_DEV=true
const isDev = process.env.APP_DEV ? process.env.APP_DEV : false;

// Prevents ADDRESS ALREADY IN USE error when running script npm run start-dev
if (!isDev || process.env.npm_lifecycle_event !== 'start-dev') {
  require('../server/server.js');
}

let mainWindow;
// setup electron window
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1290,
    height: 1105,
    backgroundColor: 'white',
    icon: path.join(__dirname, './icon.icns'),
    webPreferences: {
      nodeIntegration: true, // resolves an issue with OpenFolderButton
      worldSafeExecuteJavaScript: true,
      contextIsolation: false, // resolves an issue with OpenFolderButton
      webviewTag: true,
      // Electron recommends against using webview, which is why it is disabled by default
      // could instead build with BrowserView or iframe
    },
  });
  //////////////////////////////////////////////////
  //boiler plate for macOS. Add closing functionality
  //////////////////////////////////////////////////
  if (process.platform === 'darwin') {
    app.dock.setIcon(path.join(__dirname, 'icon.png'));
  }

  // potential window-close-app-terminate behavior -dk
  // app.on('window-all-closed', () => {
  //   if (process.platform !== 'darwin') app.quit()
  // });

  mainWindow.loadFile(path.join(__dirname, 'index.html')); // unsure why we need the path.join, but index.html not found without it
  mainWindow.webContents.openDevTools();
  //////////////////////////////////////////////////
  //Creates terminal, specifies dimensions based on columns and rows
  //////////////////////////////////////////////////
  // PTY PROCESS FOR IN APP TERMINAL
  const ptyArgs = {
    name: 'xterm-color',
    cols: 80,
    rows: 24,
    cwd: process.env.HOME,
    env: process.env,
  };

  const ptyProcess = np.spawn(shell, [], ptyArgs);
  // with ptyProcess, we want to send incoming data to the channel terminal.incData
  ptyProcess.on('data', (data) => {
    mainWindow.webContents.send('terminal.incData', data);
  });
  // in the main process, at terminal.toTerm channel, when data is received,
  // main process will write to ptyProcess
  ipcMain.on('terminal.toTerm', (_event, data) => {
    ptyProcess.write(data);
  });

  ipcMain.on('terminal.resize', (event, data) => {
    ptyProcess.resize(data.cols, data.rows);
  });

  ////////////////////////////////////////
  //dark mode light mode
  ////////////////////////////////////////
  mainWindow.webContents
    .executeJavaScript('localStorage.getItem("theme");', true)
    .then((result) => {
      mainWindow.webContents.send('theme', result ?? 'light');
    });
}

///////////////////////////////////////
//for os users to have path
///////////////////////////////////////

if (os.platform() !== 'win32') {
  const fixPath = require('fix-path');
  fixPath();
}

/*
r IPC CALLS
(The following IPC calls are made from various components in the codebase)
*/
ipcMain.on('Universal.stat', (e, filePath) => {
  e.returnValue = fs.statSync(filePath).isDirectory();
});

ipcMain.on('Universal.readDir', (e, projectFilePath) => {
  e.returnValue = fs.readdirSync(projectFilePath, (err) => {
    if (err) throw err;
  });
});

ipcMain.on('Universal.readFile', (e, filePath) => {
  e.returnValue = fs.readFileSync(filePath, 'utf8', (err) => {
    if (err) throw err;
  });
});

ipcMain.on('Universal.path', (e, folderPath, filePath) => {
  e.returnValue = path.relative(folderPath, filePath, (err) => {
    if (err) throw err;
  });
});

// EDITORVIEW.JSX SAVE FILE FUNCTIONALITY
ipcMain.on('EditorView.saveFile', (e, filePath, editedText) => {
  fs.writeFile(filePath, editedText, (err) => {
    if (err) throw err;
  });
  // Return a success message upon save
  e.returnValue = 'Changes Saved';
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

ipcMain.on('ExportFileModal.fileCreate', (e, filePath, file) => {
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
ipcMain.on('OpenFolderButton.isDirectory', (e, filePath) => {
  e.returnValue = fs.statSync(filePath).isDirectory();
});

ipcMain.on('OpenFolderButton.dialog', (e) => {
  const dialogOptions = {
    properties: ['openDirectory', 'createDirectory'],
    // <-------------------------------------------------------------------------------------------------------------------------------------------->
    // NOTE: The below filters prevented Linux users from being able to choose directories, and therefore from using the app almost entirely.
    // In the interest of the most possible developers being able to use Spearmint, the filters have been removed.
    // filters: [
    //     { name: 'Javascript Files', extensions: ['js', 'jsx'] },
    //     { name: 'Style', extensions: ['css'] },
    //     { name: 'Html', extensions: ['html'] }
    // ],
    // <-------------------------------------------------------------------------------------------------------------------------------------------->
    message: 'Please select your project folder',
  };
  e.returnValue = dialog.showOpenDialogSync(dialogOptions);
});

// GITHUB FUNCTIONALITY
let githubWindow;
// ipcMain is listening on channel 'Github-Oauth' for an event from ProjectLoader line 94
// ipbMain receives the url from ProjectLoader.jsx line 94
ipcMain.on('Github-Oauth', (_event, url) => {
  githubWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      worldSafeExecuteJavaScript: true,
      contextIsolation: false,
      webviewTag: true,
    },
  });

  githubWindow.loadURL(url);

  // When url changes, this event will be emitted, and have reference to the new url
  githubWindow.webContents.on('did-navigate', (_event, url) => {
    // if new url matches our final endpoint, then the user has successfully logged in
    // and we grab the github username via cookies
    if (url.startsWith('http://localhost:3001/auth/github/callback')) {
      // gets the cookie with the name property of 'dotcom_user'
      session.defaultSession.cookies
        .get({ name: 'dotcom_user' })
        .then((cookies) => {
          // if we get cookies with the key of dotcom_user,
          // then send to mainWindow's Renderer Process (in this case, the ProjectLoader.jsx)
          if (cookies) mainWindow.webContents.send('github-new-url', cookies);
        });

      // close the githubWindow automatically
      githubWindow.close();
    }
  });
});

// Google FUNCTIONALITY
let googleWindow;
// ipcMain is listening on channel 'Google-Oauth2' for an event from ProjectLoader line 94
// ipbMain receives the url from ProjectLoader.jsx line 94
ipcMain.on('Google-Oauth', (_event, url) => {
  googleWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      worldSafeExecuteJavaScript: true,
      contextIsolation: false,
      webviewTag: true,
    },
  });

  googleWindow.loadURL(url);

  // When url changes, this event will be emitted, and have reference to the new url
  googleWindow.webContents.on('did-navigate', (_event, url) => {
    // if new url matches our final endpoint, then the user has successfully logged in
    // and we grab the google username via cookies
    if (url.startsWith('http://localhost:3001/auth/google/callback')) {
      // gets the cookie with the name property of 'dotcom_user'
      session.defaultSession.cookies
        .get({ name: 'dotcom_user' })
        .then((cookies) => {
          // if we get cookies with the key of dotcom_user,
          // then send to mainWindow's Renderer Process (in this case, the ProjectLoader.jsx)
          if (cookies) mainWindow.webContents.send('google-new-url', cookies);
        });

      // close the googleWindow automatically
      googleWindow.close();
    }
  });
});

app
  .whenReady()
  .then(createWindow)
  .then(
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    })
  )
  .catch((err) =>
    console.log(`An error occurred when booting up electron: ${err}`)
  );
