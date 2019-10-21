/*eslint-env browser*/

var employees = [
    ["Vaibhav", "Intern", 764],
    ["Yong", "Manager", 546],
    ["Vahan", "Sr. Engineer", 345],
    ["Justin", "Engineer", 523],
    ["Jonathan", "Intern", 134]
];

var $ = function(id) {
    return window.document.getElementById(id);
};

var form = $('form');
var empTable = $('employees');
var addEmpButton = $('addEmpButton');
var empName = $('name');
var empTitle = $('title');
var empExt = $('extension');

createTableHeader = () => {
    let headings = ['Name', 'Title', 'Extension', 'Action'];
    let header = document.createElement('tr');
    headings.forEach((heading) => {
        let cell = document.createElement('td');
        cell.appendChild(document.createTextNode(heading));
        header.appendChild(cell);
    });
    return header;
}

createTable = () => {
    let table = document.createElement('table');
    table.id = 'employees';
    let thead = document.createElement('thead');
    let row = createTableHeader(table);
    thead.appendChild(row);
    table.appendChild(thead);
    document.body.appendChild(table);
};

addNewRecord = (employees) => {
    let tbody = document.createElement('tbody');
    let table = $('employees');
    for (let i=0; i<employees.length; i++) {
        let row = table.insertRow(-1);
        let button = document.createElement('input');
        button.type = 'button';
        button.className = 'delbtn';
        button.value = 'delete';
        button.id = i;
        button.addEventListener('click', () => {
            deleteEmployee(button);
        });
        for (let j=0; j<employees[i].length; j++) {
            let cell = row.insertCell(j);
            cell.innerHTML = employees[i][j];
        }
        row.insertCell().appendChild(button);
        tbody.appendChild(row);
    }
    table.appendChild(tbody);
    count();
};

addNewEmployee = (employee) => {
    employees.push(employee);
    addNewRecord([employee]);
};

deleteEmployee = (button)  => {
    let index = button.closest('tr').rowIndex;
    let table = $('employees');
    table.deleteRow(index);
    employees.splice(index-1, 1);
    count();
};

count = () => {
    var employeeCount = $('empCount');
    employeeCount.innerHTML = 'Showing ' + employees.length + ' employees';
};

displayErrorMessage = (element) => {
    let errorMessage = "<span id='errorMsg'>Enter Valid Value</span>";
    if(element.nextElementSibling.tagName !== "SPAN") {
        element.insertAdjacentHTML('afterend', errorMessage);
    }
}

validateFields = () => {
    let isError = false;
    var spanList = document.getElementsByTagName('span');
    
    while(spanList.length > 0) {
        form.removeChild(spanList[0]);
    }
    
    if(empName.value == "" || empName.value == null) {
        isError = true;
        displayErrorMessage(empName);
    }

    if(empTitle.value == "" || empTitle.value == null) {
        isError = true;
        displayErrorMessage(empTitle);
    }

    if(empExt.value == "" || empExt.value == null) {
        isError = true;
        displayErrorMessage(empExt);
    }

    if(!isError) {
        addNewEmployee([empName.value, empTitle.value, empExt.value]);
    }
};


createTable();
addNewRecord(employees);
addEmpButton.addEventListener("click", validateFields);