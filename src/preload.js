const {ipcRenderer} = require("electron")

document.addEventListener('DOMContentLoaded', function () {
})
window.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    ipcRenderer.send('show-context-menu')
})

ipcRenderer.on('context-menu-command', (e, command) => {
})
