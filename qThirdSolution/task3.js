
allData = JSON.parse(localStorage.getItem("allData"));
var avail = 0
var Edit = -1
if (!allData) {
    allData = []
    console.log("no data found")
}
showData(allData)


function saveBtnClick() {
    username = document.getElementById('name')
    Uname = username.value
    username.value = ""

    designation = document.getElementById('designation')
    desig = designation.value
    designation.value = ""

    department = document.getElementById('department')
    dep = department.value
    department.value = ""

    aged = document.getElementById('age')
    age = aged.value
    aged.value = ""

    genderd = document.getElementById('exampleFormControlSelect1')
    gender = genderd.value
    genderd.value = ""


    dated = document.getElementById('date')
    date = dated.value
    dated.value = ""



    if (Uname.trim() == "") {
        alert("Plese Enter Name")
    }
    else if (desig.trim() == '') {
        alert("Please Enter Designation")
    }
    else if (dep.trim == '') {
        alert('Please Enter department')
    }
    else if (age.trim() == '') {
        alert('Please Enter age')
    }
    else if (gender.trim() == 'Select') {
        alert('Please Select Gender')
    }
    else if (date.trim() == '') {
        alert("Please Select Date")
    }
    else {

        obj = {
            name: Uname,
            designation: desig,
            department: dep,
            age: age,
            available: false,
            gender: gender,
            doj: date
        }

        if (Edit != -1) {
            obj['available'] = allData[Edit]['available']
            allData[Edit] = obj
            alert("Employee Data Edit Sucessfull")
        }
        else {
            allData.push(obj)
            alert("Employee Added Sucessfull")
        }

        localStorage.setItem("allData", JSON.stringify(allData))
        $('#addEmployeeModal').modal('hide')

        showData(allData)
        Edit = -1
    }
}
function total(data) {
    all = document.getElementById('total')
    if (data.length)
        all.innerHTML = data.length
    else
        all.innerHTML = 0

}
function availShow(data) {
    document.getElementById('avlbl').innerHTML = data

}
function available(value) {
    if (allData[value]['available']) {
        allData[value]['available'] = false
        avail--
    }
    else {
        allData[value]['available'] = true
        avail++
    }
    localStorage.setItem("allData", JSON.stringify(allData))
    availShow(avail)

}
function showData(allData) {
    console.log(allData)
    var htmlDataClicked = ""
    var htmlData = ""
    body = document.getElementById('tbody')
    avail = 0
    for (x in allData) {

        if (allData[x]['available']) {
            avail++
            htmlDataClicked += trData(x)
        }
        else {
            htmlData += trData(x)
        }
    }
    body.innerHTML = htmlDataClicked + htmlData
    for (x in allData) {
        document.getElementById('customCheck' + x).checked = allData[x]['available']
    }
    availShow(avail)
    total(allData)

}
function trData(x) {
    return '<tr>' +
        ' <td>' + allData[x]['name'] + '</td>' +
        '<td>' + allData[x]['department'] + ' </td>' +
        '<td>' +
        ' <div class="custom-control custom-checkbox">' +

        '<input type="checkbox" onchange="available(' + x + ')"class="custom-control-input" id="customCheck' + x + '">' +
        '<label class="custom-control-label" for="customCheck' + x + '"></label>' +
        '</div>' +
        '</td>' +
        '<td>' +
        '<button type="button" class="btn btn-outline-info btn-sm" data-toggle="modal" data-target="#addEmployeeModal" onclick="edit(' + x + ')"><i class="fa fa-edit"></i> &nbsp; Edit </button>' +
        '<button type="button" class="btn btn-outline-danger btn-sm" onclick="del(' + x + ')"> <i class="fa fa-trash"></i>&nbsp; Delete </button>' +
        '</td>' +
        '</tr >'
}
function del(data) {

    allData.splice(data, 1)
    localStorage.setItem("allData", JSON.stringify(allData))
    showData(allData)
}
function edit(data) {
    document.getElementById('name').value = allData[x]['name']
    document.getElementById('designation').value = allData[x]['designation']
    document.getElementById('department').value = allData[x]['department']
    document.getElementById('age').value = allData[x]['age']
    document.getElementById('exampleFormControlSelect1').value = allData[x]['gender']
    document.getElementById('date').value = allData[x]['doj']
    Edit = data
}

