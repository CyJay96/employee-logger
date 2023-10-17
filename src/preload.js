const {ipcRenderer} = require("electron")

document.addEventListener('DOMContentLoaded', function () {
    // let inputBtn = document.querySelector('#input_btn')
    // inputBtn.addEventListener("click", ()=>{
    //     let input = document.querySelector('#input')
    //     ipcRenderer.send("saveData", input.value)
    //     input.value = ""
    // })
})
window.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    ipcRenderer.send('show-context-menu')
})

ipcRenderer.on('context-menu-command', (e, command) => {
})
