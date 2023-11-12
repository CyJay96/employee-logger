const fs = require('fs');
const path = require("path");
const {ipcRenderer} = require("electron");

const fileTitle = path.join(__dirname, 'title.json')
const fileDepartments = path.join(__dirname, 'departments.json')
const filePath1 = path.join(__dirname, 'empl_dep_1.json')
const filePath2 = path.join(__dirname, 'empl_dep_2.json')
const filePath3 = path.join(__dirname, 'empl_dep_3.json')
const filePath4 = path.join(__dirname, 'empl_dep_4.json')
const filePath5 = path.join(__dirname, 'empl_dep_5.json')
const filePath6 = path.join(__dirname, 'empl_dep_6.json')

let titleArr = null
let arrOfDeps = null

let emplDep1 = null
let emplDep2 = null
let emplDep3 = null
let emplDep4 = null
let emplDep5 = null
let emplDep6 = null


const dialog = document.querySelector('dialog')
const confirmBtn = document.querySelector('#confirm_btn')
const closeBtn = document.querySelector('#close_btn')

const editBtn = document.querySelector("#edit_btn")
const editPanel = document.querySelector("#edit_panel")

const titleDiv = document.querySelector('#title_div')
const addSelectDiv = document.querySelector('#add_select_div')
const delSelectDiv = document.querySelector('#del_select_div')
const changeSelectDiv = document.querySelector('#change_select_div')


render()

function render() {
    if (editPanel.style.display == "none") {
        editPanel.style.display = "none"
    } else if (editPanel.style.display == "block") {
        editPanel.style.display = "block"
    } else {
        editPanel.style.display = "none"
    }

    const dataTitle = fs.readFileSync(fileTitle)
    titleArr = JSON.parse(dataTitle)
    const dataDepartments = fs.readFileSync(fileDepartments)
    arrOfDeps = JSON.parse(dataDepartments)

    const dataFrom1 = fs.readFileSync(filePath1)
    emplDep1 = JSON.parse(dataFrom1)
    const dataFrom2 = fs.readFileSync(filePath2)
    emplDep2 = JSON.parse(dataFrom2)
    const dataFrom3 = fs.readFileSync(filePath3)
    emplDep3 = JSON.parse(dataFrom3)
    const dataFrom4 = fs.readFileSync(filePath4)
    emplDep4 = JSON.parse(dataFrom4)
    const dataFrom5 = fs.readFileSync(filePath5)
    emplDep5 = JSON.parse(dataFrom5)
    const dataFrom6 = fs.readFileSync(filePath6)
    emplDep6 = JSON.parse(dataFrom6)

    titleDiv.innerHTML = `<label id="table_bsu_label">${titleArr[0].title}</label>`

    const depName1 = document.querySelector('#dep_name_1')
    const depName2 = document.querySelector('#dep_name_2')
    const depName3 = document.querySelector('#dep_name_3')
    const depName4 = document.querySelector('#dep_name_4')
    const depName5 = document.querySelector('#dep_name_5')
    const depName6 = document.querySelector('#dep_name_6')


    depName1.innerHTML = `<div class="dep_name">${arrOfDeps[0].name}</div>`
    depName2.innerHTML = `<div class="dep_name">${arrOfDeps[1].name}</div>`
    depName3.innerHTML = `<div class="dep_name">${arrOfDeps[2].name}</div>`
    depName4.innerHTML = `<div class="dep_name">${arrOfDeps[3].name}</div>`
    depName5.innerHTML = `<div class="dep_name">${arrOfDeps[4].name}</div>`
    depName6.innerHTML = `<div class="dep_name">${arrOfDeps[5].name}</div>`

    addSelectDiv.innerHTML =
        `<select id="add_select">
            <option>${arrOfDeps[0].name}</option>
            <option>${arrOfDeps[1].name}</option>
            <option>${arrOfDeps[2].name}</option>
            <option>${arrOfDeps[3].name}</option>
            <option>${arrOfDeps[4].name}</option>
            <option>${arrOfDeps[5].name}</option>
        </select>`
    delSelectDiv.innerHTML =
        `<select id="del_select">
            <option>${arrOfDeps[0].name}</option>
            <option>${arrOfDeps[1].name}</option>
            <option>${arrOfDeps[2].name}</option>
            <option>${arrOfDeps[3].name}</option>
            <option>${arrOfDeps[4].name}</option>
            <option>${arrOfDeps[5].name}</option>
        </select>`
    changeSelectDiv.innerHTML =
        `<select id="change_select">
            <option>${arrOfDeps[0].name}</option>
            <option>${arrOfDeps[1].name}</option>
            <option>${arrOfDeps[2].name}</option>
            <option>${arrOfDeps[3].name}</option>
            <option>${arrOfDeps[4].name}</option>
            <option>${arrOfDeps[5].name}</option>
        </select>`

    let dep_1 = ''
    let dep_2 = ''
    let dep_3 = ''
    let dep_4 = ''
    let dep_5 = ''
    let dep_6 = ''

    emplDep1.forEach((obj) => {
        dep_1 += `<span class="emp_btn_wrap">`
        dep_1 += `<input id="emp_${obj.id}_1" class="emp_btn" type="button" value="${obj.id}. ${obj.previewName}"/>`
        dep_1 += `</span>`
    })
    emplDep2.forEach((obj) => {
        dep_2 += `<span class="emp_btn_wrap">`
        dep_2 += `<input id="emp_${obj.id}_2" class="emp_btn" type="button" value="${obj.id}. ${obj.previewName}"/>`
        dep_2 += `</span>`
    })
    emplDep3.forEach((obj) => {
        dep_3 += `<span class="emp_btn_wrap">`
        dep_3 += `<input id="emp_${obj.id}_3" class="emp_btn" type="button" value="${obj.id}. ${obj.previewName}"/>`
        dep_3 += `</span>`
    })
    emplDep4.forEach((obj) => {
        dep_4 += `<span class="emp_btn_wrap">`
        dep_4 += `<input id="emp_${obj.id}_4" class="emp_btn" type="button" value="${obj.id}. ${obj.previewName}"/>`
        dep_4 += `</span>`
    })
    emplDep5.forEach((obj) => {
        dep_5 += `<span class="emp_btn_wrap">`
        dep_5 += `<input id="emp_${obj.id}_5" class="emp_btn" type="button" value="${obj.id}. ${obj.previewName}"/>`
        dep_5 += `</span>`
    })
    emplDep6.forEach((obj) => {
        dep_6 += `<span class="emp_btn_wrap">`
        dep_6 += `<input id="emp_${obj.id}_6" class="emp_btn" type="button" value="${obj.id}. ${obj.previewName}"/>`
        dep_6 += `</span>`
    })

    const dep1 = document.querySelector('#dep_1')
    const dep2 = document.querySelector('#dep_2')
    const dep3 = document.querySelector('#dep_3')
    const dep4 = document.querySelector('#dep_4')
    const dep5 = document.querySelector('#dep_5')
    const dep6 = document.querySelector('#dep_6')

    dep1.innerHTML = dep_1
    dep2.innerHTML = dep_2
    dep3.innerHTML = dep_3
    dep4.innerHTML = dep_4
    dep5.innerHTML = dep_5
    dep6.innerHTML = dep_6

    const btns = document.querySelectorAll('.emp_btn')
    btns.forEach((btn) => {
        btn.style.backgroundColor = "red"
    })

    emplDep1.forEach((item) => {
        const btn = document.querySelector(`#emp_${item.id}_${item.department}`)

        btn.addEventListener('click', () => {
            if (btn.style.backgroundColor === "green") {
                btn.style.backgroundColor = "red"
                ipcRenderer.send("saveData", item.fullName, "Время ухода")
            } else {
                btn.style.backgroundColor = "green"
                ipcRenderer.send("saveData", item.fullName, "Время прибытия")
            }
        })
    })
    emplDep2.forEach((item) => {
        const btn = document.querySelector(`#emp_${item.id}_${item.department}`)
        btn.addEventListener('click', () => {
            if (btn.style.backgroundColor === "green") {
                btn.style.backgroundColor = "red"
                ipcRenderer.send("saveData", item.fullName, "Время ухода")
            } else {
                btn.style.backgroundColor = "green"
                ipcRenderer.send("saveData", item.fullName, "Время прибытия")
            }
        })
    })
    emplDep3.forEach((item) => {
        const btn = document.querySelector(`#emp_${item.id}_${item.department}`)
        btn.addEventListener('click', () => {
            if (btn.style.backgroundColor === "green") {
                btn.style.backgroundColor = "red"
                ipcRenderer.send("saveData", item.fullName, "Время ухода")
            } else {
                btn.style.backgroundColor = "green"
                ipcRenderer.send("saveData", item.fullName, "Время прибытия")
            }
        })
    })
    emplDep4.forEach((item) => {
        const btn = document.querySelector(`#emp_${item.id}_${item.department}`)
        btn.addEventListener('click', () => {
            if (btn.style.backgroundColor === "green") {
                btn.style.backgroundColor = "red"
                ipcRenderer.send("saveData", item.fullName, "Время ухода")
            } else {
                btn.style.backgroundColor = "green"
                ipcRenderer.send("saveData", item.fullName, "Время прибытия")
            }
        })
    })
    emplDep5.forEach((item) => {
        const btn = document.querySelector(`#emp_${item.id}_${item.department}`)
        btn.addEventListener('click', () => {
            if (btn.style.backgroundColor === "green") {
                btn.style.backgroundColor = "red"
                ipcRenderer.send("saveData", item.fullName, "Время ухода")
            } else {
                btn.style.backgroundColor = "green"
                ipcRenderer.send("saveData", item.fullName, "Время прибытия")
            }
        })
    })
    emplDep6.forEach((item) => {
        const btn = document.querySelector(`#emp_${item.id}_${item.department}`)
        btn.addEventListener('click', () => {
            if (btn.style.backgroundColor === "green") {
                btn.style.backgroundColor = "red"
                ipcRenderer.send("saveData", item.fullName, "Время ухода")
            } else {
                btn.style.backgroundColor = "green"
                ipcRenderer.send("saveData", item.fullName, "Время прибытия")
            }
        })
    })
}



function prepareName(fullName) {
    // const arr = fullName.split(" ")
    // let preparedName = arr[0]
    // arr.forEach((item, idx) => {
    //     if(idx != 0) {
    //         preparedName += " "
    //         preparedName += item[0]
    //         preparedName += "."
    //     }
    // })
    // return preparedName
    return fullName
}

// Add employees

const inputName = document.querySelector("#input_name")
const inputPos = document.querySelector("#input_position")
const addBtn = document.querySelector("#add_btn")

addBtn.addEventListener('click', () => {
    if (inputName.value == null || inputName.value.length == 0) {
        return
    }

    const depSelect = document.querySelector("#add_select")
    let newId = null
    let department = null

    if (depSelect.value === arrOfDeps[0].name && !inputPos.value) {
        department = 1
        newId = emplDep1.length + 1
    }
    if (depSelect.value === arrOfDeps[1].name && !inputPos.value) {
        department = 2
        newId = emplDep2.length + 1
    }
    if (depSelect.value === arrOfDeps[2].name && !inputPos.value) {
        department = 3
        newId = emplDep3.length + 1
    }
    if (depSelect.value === arrOfDeps[3].name && !inputPos.value) {
        department = 4
        newId = emplDep4.length + 1
    }
    if (depSelect.value === arrOfDeps[4].name && !inputPos.value) {
        department = 5
        newId = emplDep5.length + 1
    }
    if (depSelect.value === arrOfDeps[5].name && !inputPos.value) {
        department = 6
        newId = emplDep6.length + 1
    }


    if (depSelect.value === arrOfDeps[0].name && inputPos.value) {
        department = 1
        newId = inputPos.value
        if(newId < 1){
            newId = 1
        }
    }
    if (depSelect.value === arrOfDeps[1].name && inputPos.value) {
        department = 2
        newId = inputPos.value
        if(newId < 1){
            newId = 1
        }
    }
    if (depSelect.value === arrOfDeps[2].name && inputPos.value) {
        department = 3
        newId = inputPos.value
        if(newId < 1){
            newId = 1
        }
    }
    if (depSelect.value === arrOfDeps[3].name && inputPos.value) {
        department = 4
        newId = inputPos.value
        if(newId < 1){
            newId = 1
        }
    }
    if (depSelect.value === arrOfDeps[4].name && inputPos.value) {
        department = 5
        newId = inputPos.value
        if(newId < 1){
            newId = 1
        }
    }
    if (depSelect.value === arrOfDeps[5].name && inputPos.value) {
        department = 6
        newId = inputPos.value
        if(newId < 1){
            newId = 1
        }
    }

    const newEmp = {
        id: +newId,
        previewName: prepareName(inputName.value),
        fullName: inputName.value,
        department: department,
    }

    if (depSelect.value === arrOfDeps[0].name && inputPos.value) {
        emplDep1 = addIntoList(emplDep1, newEmp, newEmp.id)
        let data = JSON.stringify(emplDep1)
        fs.writeFileSync(filePath1, data)
    }
    if (depSelect.value === arrOfDeps[1].name && inputPos.value) {
        emplDep2 = addIntoList(emplDep2, newEmp, newEmp.id)
        let data = JSON.stringify(emplDep2)
        fs.writeFileSync(filePath2, data)
    }
    if (depSelect.value === arrOfDeps[2].name && inputPos.value) {
        emplDep3 = addIntoList(emplDep3, newEmp, newEmp.id)
        let data = JSON.stringify(emplDep3)
        fs.writeFileSync(filePath3, data)
    }
    if (depSelect.value === arrOfDeps[3].name && inputPos.value) {
        emplDep4 = addIntoList(emplDep4, newEmp, newEmp.id)
        let data = JSON.stringify(emplDep4)
        fs.writeFileSync(filePath4, data)
    }
    if (depSelect.value === arrOfDeps[4].name && inputPos.value) {
        emplDep5 = addIntoList(emplDep5, newEmp, newEmp.id)
        let data = JSON.stringify(emplDep5)
        fs.writeFileSync(filePath5, data)
    }
    if (depSelect.value === arrOfDeps[5].name && inputPos.value) {
        emplDep6 = addIntoList(emplDep6, newEmp, newEmp.id)
        let data = JSON.stringify(emplDep6)
        fs.writeFileSync(filePath6, data)
    }


    if (department == 1 && !inputPos.value) {
        emplDep1.push(newEmp)
        let data = JSON.stringify(emplDep1)
        fs.writeFileSync(filePath1, data)
    }
    if (department == 2 && !inputPos.value) {
        emplDep2.push(newEmp)
        let data = JSON.stringify(emplDep2)
        fs.writeFileSync(filePath2, data)
    }
    if (department == 3 && !inputPos.value) {
        emplDep3.push(newEmp)
        let data = JSON.stringify(emplDep3)
        fs.writeFileSync(filePath3, data)
    }
    if (department == 4 && !inputPos.value) {
        emplDep4.push(newEmp)
        let data = JSON.stringify(emplDep4)
        fs.writeFileSync(filePath4, data)
    }
    if (department == 5 && !inputPos.value) {
        emplDep5.push(newEmp)
        let data = JSON.stringify(emplDep5)
        fs.writeFileSync(filePath5, data)
    }
    if (department == 6 && !inputPos.value) {
        emplDep6.push(newEmp)
        let data = JSON.stringify(emplDep6)
        fs.writeFileSync(filePath6, data)
    }


    inputName.value = ""
    inputPos.value = ""

    render()
})

function prepareEmployeesList(employeesList) {
    employeesList.forEach((emp, idx) => {
        let newIdx = idx+1
        emp.id = newIdx
    })
    return employeesList
}

function addIntoList(employeesList, objToInput, pos) {
    let newEmployeesList = []
    employeesList.forEach((emp, idx) => {
        if(idx+1 < pos) {
            newEmployeesList.push(emp)
        }
        if(idx+1 == pos) {
            newEmployeesList.push(objToInput)
            emp.id = idx + 2
            newEmployeesList.push(emp)
        }
        if(idx+1 > pos) {
            emp.id = idx + 2
            newEmployeesList.push(emp)
        }
    })
    return newEmployeesList
}

editBtn.addEventListener('click', () => {
    if(editPanel.style.display === "none") {
        editPanel.style.display = "block"
    } else {
        editPanel.style.display = "none"
    }
})

// Delete employees

const inputPosDel = document.querySelector('#input_position_del')
const delBtn = document.querySelector('#del_btn')

delBtn.addEventListener('click', () => {
    if (inputPosDel.value == null || inputPosDel.value.length == 0) {
        return
    }

    // dialog.show()
    const delSelect = document.querySelector('#del_select')
    let empId = +inputPosDel.value
    let dep = null
    if (delSelect.value == arrOfDeps[0].name) {
        dep = 1
    }
    if (delSelect.value == arrOfDeps[1].name) {
        dep = 2
    }
    if (delSelect.value == arrOfDeps[2].name) {
        dep = 3
    }
    if (delSelect.value == arrOfDeps[3].name) {
        dep = 4
    }
    if (delSelect.value == arrOfDeps[4].name) {
        dep = 5
    }
    if (delSelect.value == arrOfDeps[5].name) {
        dep = 6
    }


    if (dep == 1) {
        const newEmployeesList1 = emplDep1.filter(emp => emp.id !== empId)
        prepareEmployeesList(newEmployeesList1)
        let data = JSON.stringify(newEmployeesList1)
        fs.writeFileSync(filePath1, data)
    }
    if (dep == 2) {
        const newEmployeesList2 = emplDep2.filter(emp => emp.id !== empId)
        prepareEmployeesList(newEmployeesList2)
        let data = JSON.stringify(newEmployeesList2)
        fs.writeFileSync(filePath2, data)
    }
    if (dep == 3) {
        const newEmployeesList3 = emplDep3.filter(emp => emp.id !== empId)
        prepareEmployeesList(newEmployeesList3)
        let data = JSON.stringify(newEmployeesList3)
        fs.writeFileSync(filePath3, data)
    }
    if (dep == 4) {
        const newEmployeesList4 = emplDep4.filter(emp => emp.id !== empId)
        prepareEmployeesList(newEmployeesList4)
        let data = JSON.stringify(newEmployeesList4)
        fs.writeFileSync(filePath4, data)
    }
    if (dep == 5) {
        const newEmployeesList5 = emplDep5.filter(emp => emp.id !== empId)
        prepareEmployeesList(newEmployeesList5)
        let data = JSON.stringify(newEmployeesList5)
        fs.writeFileSync(filePath5, data)
    }
    if (dep == 6) {
        const newEmployeesList6 = emplDep6.filter(emp => emp.id !== empId)
        prepareEmployeesList(newEmployeesList6)
        let data = JSON.stringify(newEmployeesList6)
        fs.writeFileSync(filePath6, data)
    }


    inputPosDel.value = ""

    render()
})

// Change department

const changeDepInput = document.querySelector('#change_dep_input')
const changeDepBtn = document.querySelector('#change_dep_btn')

changeDepBtn.addEventListener('click', () => {
    if (changeDepInput.value == null || changeDepInput.value.length == 0) {
        return
    }

    const changeSelect = document.querySelector('#change_select')

    if (changeSelect.value == arrOfDeps[0].name) {
        arrOfDeps[0].name = changeDepInput.value
    }
    if (changeSelect.value == arrOfDeps[1].name) {
        arrOfDeps[1].name = changeDepInput.value
    }
    if (changeSelect.value == arrOfDeps[2].name) {
        arrOfDeps[2].name = changeDepInput.value
    }
    if (changeSelect.value == arrOfDeps[3].name) {
        arrOfDeps[3].name = changeDepInput.value
    }
    if (changeSelect.value == arrOfDeps[4].name) {
        arrOfDeps[4].name = changeDepInput.value
    }
    if (changeSelect.value == arrOfDeps[5].name) {
        arrOfDeps[5].name = changeDepInput.value
    }

    let data = JSON.stringify(arrOfDeps)
    fs.writeFileSync(fileDepartments, data)
    changeDepInput.value = ""

    render()
})

// Change title

const changeTitleInput = document.querySelector('#input_title')
const changeTitleBtn = document.querySelector('#change_title_btn')

changeTitleBtn.addEventListener("click", () => {
    if (changeTitleInput.value == null || changeTitleInput.value.length == 0) {
        return
    }

    titleArr[0].title = changeTitleInput.value

    let data = JSON.stringify(titleArr)
    fs.writeFileSync(fileTitle, data)

    changeTitleInput.value = ''

    render()
})

// Change wallpapers

const body = document.querySelector('body')
const changeWallBtn = document.querySelector('#change_wall')

changeWallBtn.addEventListener("click", () => {
    if (!body.style.backgroundImage || body.style.backgroundImage == "none") {
        body.style.backgroundImage = "url(img/wallpapers.jpg)"
        body.style.color = "white"
    } else {
        body.style.backgroundImage = "none"
        body.style.color = "black"
    }
})

// Exit

const exitImgBtn = document.querySelector('#exit_img')
exitImgBtn.addEventListener("click", () => {
    ipcRenderer.send("exit")
})
