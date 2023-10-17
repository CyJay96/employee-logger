const {app, BrowserWindow} = require('electron')
const path = require('path')
const fs = require("fs")
const exec = require('child_process').execFile
const { execFile } = require('child_process')
const ipcMain = require('electron').ipcMain


if (require('electron-squirrel-startup')) {
    app.quit()
}

let mainWindow = null
const createWindow = () => {
    mainWindow = new BrowserWindow({
        show: false,
        fullscreen: true,
        frame: false,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),
        },
    });
    mainWindow.maximize()
    mainWindow.show()
    mainWindow.loadFile(path.join(__dirname, 'index.html'))
    // Open the DevTools.
    mainWindow.webContents.openDevTools()
};

app.on('ready', createWindow)


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

ipcMain.on("saveData", (event, value, config) => {
    const filePath = path.join(__dirname, 'output.json')
    const today = new Date();
    const now = today.toLocaleString()
    //const data = value + " — " + `Время прибытия: ${now}` + "\n"
    const json = {
        name: value,
        time: `${config}: ${now}`
    }
    const arr = []
    arr.push(json)
    const data = JSON.stringify(arr)
    fs.writeFileSync(filePath, data, (err) => {
        if (!err) {
            console.log("file written")
        } else {
            console.log(err)
        }
    })
    exec(path.join(__dirname,'ProgaReleasev2', 'Military2.exe'), function(err, data) {
        console.log(err)
        console.log(data.toString())
    })
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})
