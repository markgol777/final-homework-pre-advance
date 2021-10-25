const elem = (selector): any => document.querySelector(selector);
const elem2 = (selector): any => document.querySelectorAll(selector);

let users = [];
let row;
let th1 = document.createElement('th');
let regExpGmail = /^\S{1,}@\D{1,}\.\D{2,}$/;
let regExplogin = /\w{4,16}/;
let regExpPassword = /\w{4,16}/;

const render = (): void => {
    elem('#users-list').innerHTML = '';
    for (let i = 0; i < users.length; i++) {
        row = document.createElement('tr');
        row.innerHTML = `
  <th>${i + 1}</th>
  <th>${users[i].name}</th>
  <th>${users[i].password}</th>
  <th>${users[i].email}</th>
  <th><input type='button' class = 'btnEdit' value = 'Edit'></th>
        <th><input type='button' class = 'btnDelete' value = 'Delete'></th>`;
        elem('#users-list').append(row);
    }
}

const clearInputs = (): void => {
    elem('.input-login').value = '';
    elem('.input-password').value = '';
    elem('.input-email').value = '';
}

function addUser() {
    if (regExplogin.test(elem('.input-login').value) === false) {
        elem('.errorLogin').style.display = 'block';
    } else {
        elem('.errorLogin').style.display = 'none';
    }

    if (regExpPassword.test(elem('.input-password').value) === false) {
        elem('.errorPassword').style.display = 'block';
    } else {
        elem('.errorPassword').style.display = 'none';
    }

    if (regExpGmail.test(elem('.input-email').value) === false) {
        elem('.errorEmail').style.display = 'block';
    } else {
        elem('.errorEmail').style.display = 'none';
    }

    if (regExpGmail.test(elem('.input-email').value) === true && regExplogin.test(elem('.input-login').value) === true && regExpPassword.test(elem('.input-password').value) === true) {
        let currentUser = {
            name: elem('.input-login').value,
            password: elem('.input-password').value,
            email: elem('.input-email').value
        }
        users.push(currentUser);
    }
}

function deleteUser() {
    users.splice(event.target.parentElement.parentElement.children[0].textContent - 1, 1)
}

let userIndex: number;

function editUser() {
    userIndex = parseInt(event.target.parentElement.parentElement.children[0].textContent) - 1;

    elem('.input-login').value = users[userIndex].name;
    elem('.input-password').value = users[userIndex].password;
    elem('.input-email').value = users[userIndex].email;
    elem('.btn-add').style.display = 'none';
    elem('.btn-save-edit').style.display = 'block';
}

function saveUser(): void {
    let currentUser = {
        name: elem('.input-login').value,
        password: elem('.input-password').value,
        email: elem('.input-email').value
    };
    users.splice(userIndex, 1, currentUser);
    elem('.btn-add').style.display = 'block';
    elem('.btn-save-edit').style.display = 'none';
}

elem('.btn-save-edit').addEventListener('click', (): void => {
    saveUser();
    clearInputs();
    render();

})

elem('#users-list').addEventListener('click', (): void => {
    if (event.target.classList.contains('btnDelete')) {
        deleteUser();
        render();
    }

    if (event.target.classList.contains('btnEdit')) {
        editUser();
    }
})

elem('.btn-add').addEventListener('click', (): void => {
    addUser();
    clearInputs();
    render();
})