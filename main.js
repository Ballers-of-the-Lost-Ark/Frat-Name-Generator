const numberOfWords = document.querySelector('.number-of-words');

// when generate name is clicked
document.getElementById('submit-btn').addEventListener('click', () => {
    if (numberOfWords.value != '') {
        generateNames(numberOfWords.value);
    } else {
        displayError();
    }
});

// when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    displayAllNames();
});

// when pencil is clicked
document.querySelector('.collection').addEventListener('click', (e) => {
    if (e.target.classList.contains('pencil')) {
        showEditState();
        displayCurrentName(e.target.parentElement.id);
    }
});

// when change name is clicked
document.getElementById('edit-btn').addEventListener('click', () => {
    updateEditState();
    displayAllNames();
    displayEdited();
    hideEditState();
});

// when delete name is clicked
document.getElementById('delete-btn').addEventListener('click', () => {
    deleteName();
    hideEditState();
    displayNameDeleted();
    displayAllNames();
});

// when back is clicked
document.getElementById('back-btn').addEventListener('click', () => {
    hideEditState();
});

// when clear all is clicked
document.getElementById('clear-all-btn').addEventListener('click', () => {
    // clear dom
    document.querySelector('.collection').innerHTML = '';

    // clear local storage
    const allNames = JSON.parse(localStorage.getItem('names'));
    allNames.length = 0;
    localStorage.setItem('names', JSON.stringify(allNames));
});


let greekLetters = ['alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lamba', 'mu', 'nu', 'xi', 'omicron', 'pi', 'rho', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega'];

// generate random numbers, then getting a random position in greek letters array. Then capitalizing the first word of each term
function generateNames(nameLength) {
    let randomNumbers = [];

    while (randomNumbers.length < nameLength) {
        randomNumbers.push(Math.floor(Math.random() * 21) + 1);
    }

    let name = [];
    randomNumbers.forEach(number => {
        name.push(greekLetters[number]);
    });

    const fullName = name.join(' ');

    const capitalizedFullName = fullName.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });

    const randomID = function () {
        return Math.floor(Math.random() * 20000) + 1;
    }

    const newName = { name: capitalizedFullName, id: randomID() };

    displayName(newName);

    addToLocalStorage(newName);
}

// displaying name in DOM
function displayName(newName) {
    const li = document.createElement('li');
    li.classList = 'collection-item';
    li.id = newName.id;
    li.innerHTML = `${newName.name}<i class="material-icons pencil right">edit</i>`;

    document.querySelector('.collection').insertAdjacentElement('beforeend', li);
}

// add new name to local storage
function addToLocalStorage(newName) {
    let names = [];
    if (localStorage.getItem('names') === null) {
        names.push(newName);
        localStorage.setItem('names', JSON.stringify(names));
    } else {
        const allNames = JSON.parse(localStorage.getItem('names'));
        allNames.push(newName);
        localStorage.setItem('names', JSON.stringify(allNames));
    }
}

// display all names
function displayAllNames() {
    document.querySelector('.collection').innerHTML = '';

    const allNames = JSON.parse(localStorage.getItem('names'));
    allNames.forEach((name) => {
        displayName(name);
    });
}

function showEditState() {
    document.querySelector('.edit-state').classList.remove('hidden');
}

function hideEditState() {
    document.querySelector('.edit-state').classList.add('hidden');
}

function displayCurrentName(currentItem) {
    const nameEditField = document.querySelector('.name-edit-field');

    const allNames = JSON.parse(localStorage.getItem('names'));
    allNames.forEach((name) => {
        if (name.id == currentItem) {
            nameEditField.value = name.name;
            nameEditField.id = name.id;
        }
    });
}

function updateEditState() {
    // updating local storage
    const updatedItem = document.querySelector('.name-edit-field').value;

    const allNames = JSON.parse(localStorage.getItem('names'));
    allNames.forEach((name) => {
        if (name.id == document.querySelector('.name-edit-field').id) {
            allNames.splice(allNames.indexOf(name), 1, { name: updatedItem, id: document.querySelector('.name-edit-field').id });

            localStorage.setItem('names', JSON.stringify(allNames));
        }
    });
}

function deleteName() {
    // updating local storage
    const allNames = JSON.parse(localStorage.getItem('names'));
    allNames.forEach((name) => {
        if (name.id == document.querySelector('.name-edit-field').id) {
            allNames.splice(allNames.indexOf(name), 1);

            localStorage.setItem('names', JSON.stringify(allNames));
        }
    });
}

// display error
function displayError() {
    const error = document.querySelector('.error');

    setTimeout(() => {
        error.style.display = 'block';
    }, 0);

    setTimeout(() => {
        error.style.display = 'none';
    }, 3000);
}

// display success edit message
function displayEdited() {
    const edited = document.querySelector('.edited');

    setTimeout(() => {
        edited.style.display = 'block';
    }, 0);

    setTimeout(() => {
        edited.style.display = 'none';
    }, 3000);
}

// display name deleted message
function displayNameDeleted() {
    const deleted = document.querySelector('.deleted');

    setTimeout(() => {
        deleted.style.display = 'block';
    }, 0);

    setTimeout(() => {
        deleted.style.display = 'none';
    }, 3000);
}