import { createUserApi, editUserApi, deleteUserApi, createQuote, getUserFormApi } from './service.js';

let listUser = [];
let backupList = listUser.length > 0 ? listUser : [];
let modalTitle = document.querySelector('#exampleModalLabel');
let modalMode = 'create';
let tabList = document.querySelector('#list-group');
let listQuotes = [];

const getForm = () => {
  const { email, firstName, lastName, password, phone, username, isAdmin } =
    document.forms.createUser.elements;

  const newUser = {
    username: username.value,
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
    phone: phone.value,
    userStatus: isAdmin ? 2 : 3,
  };

  return newUser;
};

const attList = (oldUsername, newUser) => {
  listUser = JSON.parse(localStorage.getItem('saveList'));
  let oldUser = listUser.find((user) => (user.username = oldUsername));

  if (oldUser) {
    oldUser.email = newUser.email;
    oldUser.firstName = newUser.firstName;
    oldUser.lastName = newUser.lastName;
    oldUser.password = newUser.password;
    oldUser.phone = newUser.phone;
    oldUser.username = newUser.username;
    oldUser.userStatus = newUser.userStatus;
  }
  localStorage.setItem('saveList', JSON.stringify(listUser));
};

const deleteUserFromList = (username) => {
  listUser = JSON.parse(localStorage.getItem('saveList'));
  const newArray = listUser.filter((item) => item.username !== username);
  localStorage.setItem('saveList', JSON.stringify(newArray));
};

const editUser = (user) => {
  modalMode = 'edit';
  const editUserButton = document.querySelector('#SaveForm');
  const { email, firstName, lastName, password, phone, username, isAdmin } =
    document.forms.createUser.elements;

  email.value = user.email;
  firstName.value = user.firstName;
  lastName.value = user.lastName;
  password.value = user.password;
  phone.value = user.phone;
  username.value = user.username;
  user.userStatus == 2 ? (isAdmin.checked = true) : (isAdmin.checked = false);

  editUserButton.addEventListener('click', (e) => {
    if (modalMode === 'edit') {
      e.preventDefault();
      const editedUser = getForm();
      editUserApi(editedUser, user.username);
      attList(user.username, editedUser);
      listUsers();
      backupList = listUser;
    }
  });
};

const deleteUser = (username) => {
  const confirmDeleteUser = document.querySelector('#confirmDeleteUser');
  confirmDeleteUser.addEventListener('click', () => {
    console.log(username);
    deleteUserApi(username);
    deleteUserFromList(username);
    listUsers();
    backupList = listUser;
  });
};

const listUsers = () => {
  listUser = [];
  localStorage.getItem('saveList')
    ? (listUser = JSON.parse(localStorage.getItem('saveList')))
    : (listUser = []);

  tabList.innerHTML = '';
  let elementA = '';
  let excludeButton = '';
  let editButton = '';
  let groupButton = '';

  if (listUser.length > 0) {
    listUser.forEach((item, index) => {
      elementA = document.createElement('a');
      elementA.classList.add('list-group-item');
      elementA.classList.add('d-flex');
      elementA.classList.add('justify-content-between');
      elementA.classList.add('align-items-center');
      elementA.classList.add('list-group-item-action');
      elementA.textContent = listUser[index].username;

      groupButton = document.createElement('div');

      excludeButton = document.createElement('button');
      excludeButton.classList.add('btn');
      excludeButton.classList.add('btn-danger');
      excludeButton.classList.add('ms-5');
      excludeButton.setAttribute('data-bs-toggle', 'modal');
      excludeButton.setAttribute('data-bs-target', '#deleteModal');
      excludeButton.textContent = 'Excluir';
      excludeButton.addEventListener('click', () => {
        deleteUser(item.username);
      });

      editButton = document.createElement('button');
      editButton.classList.add('btn');
      editButton.classList.add('btn-info');
      editButton.setAttribute('data-bs-toggle', 'modal');
      editButton.setAttribute('data-bs-target', '#exampleModal');

      editButton.textContent = 'Editar';
      editButton.addEventListener('click', () => {
        modalTitle.textContent = 'Editar Usuário';
        editUser(item);
      });

      groupButton.append(editButton);
      groupButton.append(excludeButton);
      elementA.append(groupButton);
      tabList.append(elementA);
      elementA.addEventListener('click', (event) => {
        event.preventDefault();
      });
    });
  }
};

const createUser = () => {
  modalMode = 'create';
  const addUserButton = document.querySelector('#SaveForm');

  addUserButton.addEventListener('click', (e) => {
    if (modalMode == 'create') {
      e.preventDefault();
      const createdUser = getForm();

      try {
        createUserApi(createdUser);
        listUser.push(createdUser);
        localStorage.setItem('saveList', JSON.stringify(listUser));
        listUsers();
        backupList = listUser;
      } catch (error) {
        console.error(error);
      }
    }
  });
};

listUsers();
backupList = listUser;
createUser();

document.querySelector('#createUserButtonModal').addEventListener('click', () => {
  modalTitle.textContent = 'Criar Usuário';
});

const searchInput = document.getElementById('searchInput');
const search = () => {
  tabList.innerHTML = '';
  const query = searchInput.value.trim().toLowerCase();
  const filteredData = listUser.filter((item) => item.username.toLowerCase().includes(query));
  if (query !== '') {
    listUser = filteredData;
    localStorage.setItem('saveList', JSON.stringify(listUser));
  } else {
    listUser = backupList;
    localStorage.setItem('saveList', JSON.stringify(listUser));
  }
  listUsers();
};
searchInput.addEventListener('input', search);

const showListQuotes = () => {
  let tableBody = document.querySelector('#dataTable tbody');
  tableBody.innerHTML = '';
  listQuotes.forEach((item) => {
    let row = document.createElement('tr');
    row.innerHTML =
      '<td>' +
      item.carrier +
      '</td><td>' +
      parseInt(item.shippingCompetitorPrice).toFixed(2) +
      '</td><td>' +
      parseInt(item.platformShippingPrice).toFixed(2) +
      '</td><td>' +
      `${item.deliveryTime} dias` +
      '</td>';
    tableBody.appendChild(row);
  });
};

const calcQuotation = () => {
  const buttonQuotation = document.querySelector('#saveQuotationButton');

  buttonQuotation.addEventListener('click', async (e) => {
    e.preventDefault();
    const { zipCode, zipCodeDestiny, weight, width, heigth, lengthProduct } =
      document.forms.saveQuotation.elements;

    const newQuotation = {
      zipCodeSource: zipCode.value,
      zipCodeDestination: zipCodeDestiny.value,
      weight: parseFloat(weight.value),
      dimension: {
        width: parseFloat(width.value),
        heigth: parseFloat(heigth.value),
        length: parseFloat(lengthProduct.value),
      },
    };

    try {
      const response = await createQuote(newQuotation);
      listQuotes = response.quotations;
      showListQuotes();
    } catch (error) {
      console.error(error);
    }
  });
};

calcQuotation();

const getUserForm = () => {
  const buttonGetUser = document.querySelector('.searchUser');
  const userExist = document.querySelector('.userExist');
  const userNotExist = document.querySelector('.userNotExist');

  buttonGetUser.addEventListener('click', async (e) => {
    e.preventDefault();
    const { getUsername } = document.forms.getUserForm.elements;

    try {
      getUserFormApi(getUsername.value);
      userExist.style.display = 'block';
      userNotExist.style.display = 'none';
    } catch (error) {
      console.error(error);
      userExist.style.display = 'none';
      userNotExist.style.display = 'block';
    }
  });
};

getUserForm();
