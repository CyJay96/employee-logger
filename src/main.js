const fs = require('fs');
const path = require("path");
const {ipcRenderer} = require("electron");

const filePath1 = path.join(__dirname, 'empl_dep_1.json')
const filePath2 = path.join(__dirname, 'empl_dep_2.json')
const filePath3 = path.join(__dirname, 'empl_dep_3.json')
const filePath4 = path.join(__dirname, 'empl_dep_4.json')
const filePath5 = path.join(__dirname, 'empl_dep_5.json')
const filePath6 = path.join(__dirname, 'departments.json')

let emplDep1 = null
let emplDep2 = null
let emplDep3 = null
let emplDep4 = null
let emplDep5 = null

let arrOfDeps = null


const dialog = document.querySelector('dialog')
const confirmBtn = document.querySelector('#confirm_btn')
const closeBtn = document.querySelector('#close_btn')

const editBtn = document.querySelector("#edit_btn")
const editPanel = document.querySelector("#edit_panel")

const addSelectDiv = document.querySelector('#add_select_div')
const delSelectDiv = document.querySelector('#del_select_div')
const changeSelectDiv = document.querySelector('#change_select_div')



render()

function render() {
    // const editBtn = document.querySelector('#edit_btn')
    // editBtn.innerHTML = `<img class="img_add_del" src="img/plus.png" alt="Показать панель редактирования" />`

    if (editPanel.style.display == "none") {
        editPanel.style.display = "none"
    } else if (editPanel.style.display == "block") {
        editPanel.style.display = "block"
    } else {
        editPanel.style.display = "none"
    }

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
    arrOfDeps = JSON.parse(dataFrom6)



    const depName1 = document.querySelector('#dep_name_1')
    const depName2 = document.querySelector('#dep_name_2')
    const depName3 = document.querySelector('#dep_name_3')
    const depName4 = document.querySelector('#dep_name_4')
    const depName5 = document.querySelector('#dep_name_5')

    depName1.innerHTML = `<div class="dep_name">${arrOfDeps[0].name}</div>`
    depName2.innerHTML = `<div class="dep_name">${arrOfDeps[1].name}</div>`
    depName3.innerHTML = `<div class="dep_name">${arrOfDeps[2].name}</div>`
    depName4.innerHTML = `<div class="dep_name">${arrOfDeps[3].name}</div>`
    depName5.innerHTML = `<div class="dep_name">${arrOfDeps[4].name}</div>`

    addSelectDiv.innerHTML =
        `<select id="add_select">
            <option>${arrOfDeps[0].name}</option>
            <option>${arrOfDeps[1].name}</option>
            <option>${arrOfDeps[2].name}</option>
            <option>${arrOfDeps[3].name}</option>
            <option>${arrOfDeps[4].name}</option>
        </select>`
    delSelectDiv.innerHTML =
        `<select id="del_select">
            <option>${arrOfDeps[0].name}</option>
            <option>${arrOfDeps[1].name}</option>
            <option>${arrOfDeps[2].name}</option>
            <option>${arrOfDeps[3].name}</option>
            <option>${arrOfDeps[4].name}</option>
        </select>`
    changeSelectDiv.innerHTML =
        `<select id="change_select">
            <option>${arrOfDeps[0].name}</option>
            <option>${arrOfDeps[1].name}</option>
            <option>${arrOfDeps[2].name}</option>
            <option>${arrOfDeps[3].name}</option>
            <option>${arrOfDeps[4].name}</option>
        </select>`

    let dep_1 = ''
    let dep_2 = ''
    let dep_3 = ''
    let dep_4 = ''
    let dep_5 = ''

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

    const dep1 = document.querySelector('#dep_1')
    const dep2 = document.querySelector('#dep_2')
    const dep3 = document.querySelector('#dep_3')
    const dep4 = document.querySelector('#dep_4')
    const dep5 = document.querySelector('#dep_5')

    dep1.innerHTML = dep_1
    dep2.innerHTML = dep_2
    dep3.innerHTML = dep_3
    dep4.innerHTML = dep_4
    dep5.innerHTML = dep_5

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

    // const delBtns = document.querySelectorAll('.img_delete')

    // delBtns.forEach((btn) => {
    //     btn.addEventListener('click', () => {
    //         clickedBtn = btn
    //         dialog.show()
    //     })
    // })
    // confirmBtn.addEventListener('click', () => {
    //     dialog.close()
    //     let empId = null
    //     let dep = null
    //     try {
    //         empId = +clickedBtn.id.split('_')[2]
    //         dep = +clickedBtn.id.split('_')[3]
    //     } catch (err) {
    //     }
    //     if (dep == 1){
    //         const newEmployeesList1 = emplDep1.filter(emp => emp.id !== empId)
    //         prepareEmployeesList(newEmployeesList1)
    //         let data = JSON.stringify(newEmployeesList1)
    //         fs.writeFileSync(filePath1, data)
    //     }
    //     if (dep == 2) {
    //         const newEmployeesList2 = emplDep2.filter(emp => emp.id !== empId)
    //         prepareEmployeesList(newEmployeesList2)
    //         let data = JSON.stringify(newEmployeesList2)
    //         fs.writeFileSync(filePath2, data)
    //     }
    //     clickedBtn = null
    //     render()
    // })
    // closeBtn.addEventListener('click', () => {
    //     dialog.close()
    //     clickedBtn = null
    // })

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
            emp.id = idx+2
            newEmployeesList.push(emp)
        }
        if(idx+1 > pos) {
            emp.id = idx+2
            newEmployeesList.push(emp)
        }
    })
    return newEmployeesList
}

editBtn.addEventListener('click', () => {
    if(editPanel.style.display === "none") {
        // editBtn.textContent = "Скрыть панель редактирования"
        // editBtn.innerHTML = `<img class="img_add_del" src="img/minus.png" alt="Скрыть панель редактирования" />`
        editPanel.style.display = "block"
    } else {
        // editBtn.textContent = "Показать панель редактирования"
        // editBtn.innerHTML = `<img class="img_add_del" src="img/plus.png" alt="Показать панель редактирования" />`
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

    inputPosDel.value = ""

    render()

    // confirmBtn.addEventListener('click', () => {
    //     dialog.close()
    //
    //
    // })
    // closeBtn.addEventListener('click', () => {
    //     inputPosDel.value = ""
    //     dialog.close()
    // })
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

    let data = JSON.stringify(arrOfDeps)

    fs.writeFileSync(filePath6, data)

    changeDepInput.value = ""

    render()
})
