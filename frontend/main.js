const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1250,
    height: 850,
    icon: path.join(__dirname, 'assets/logo.ico'),
    webPreferences: {
      // Enable Node integration so that localStorage can be used without a
      // preload script. This simplifies the app while still allowing the
      // renderer to access browser APIs securely. If you wish to tighten
      // security later, consider using a preload script and the contextBridge.
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // Load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Remove the default menu bar
  Menu.setApplicationMenu(null);

  // Open the DevTools if the environment variable is set. This makes it
  // optional for users who want to debug the app.
  if (process.env.ELECTRON_DEBUG) {
    mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object. Usually you would store windows
    // in an array if your app supports multiple windows. This is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished initialization and
// is ready to create browser windows. Some APIs can only be used after this
// event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the dock
  // icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});