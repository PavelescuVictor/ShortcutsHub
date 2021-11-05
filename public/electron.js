const { app, BrowserWindow, ipcMain, nativeTheme, Menu } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

// const electronReload = require('electron-reload');

// require('electron-reload')(__dirname, {
//   electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
// });

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    minHeight: '50px',
    minWidth: '50px',
    // kiosk: true,
    useContentSize: true,
    frame: false,
    transparent: true,
    hasShadow: false,
    alwaysOnTop: false,
    titleBarStyle: 'hidden',
    titleBarOverlay: true,
    webPreferences: {
      nodeIntegration: true,
      // The __dirname string points to the path of the currently executing script (in this case, your project's root folder).
      // The path.join API joins multiple path segments together, creating a combined path string that works across all platforms.
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Light / Dark Theme
  ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light';
    } else {
      nativeTheme.themeSource = 'dark';
    }
    return nativeTheme.shouldUseDarkColors;
  });

  ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSource = 'system';
  });

  // DockMenu
  const dockMenu = Menu.buildFromTemplate([
    {
      label: 'New Window',
      click() {
        console.log('New Window');
      },
    },
    {
      label: 'New Window with Settings',
      submenu: [{ label: 'Basic' }, { label: 'Pro' }],
    },
    { label: 'New Command...' },
  ]);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
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
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
