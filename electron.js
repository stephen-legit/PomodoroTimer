const { app, BrowserWindow, ipcMain } = require('electron');

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 360,
        height: 500,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        frame: false,
        transparent: true,
        backgroundColor: "#fefefe",
        // roundedCorners: true,
    });

    mainWindow.loadFile("index.html");
});

// Close app when all windows are closed
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});

// IPC Event Handler
ipcMain.on("minimize-window", () => {
    mainWindow.minimize();
});

ipcMain.on("close-window", () => {
    mainWindow.close();
});