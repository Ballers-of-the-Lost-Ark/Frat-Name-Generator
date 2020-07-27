// init materialize assets
M.AutoInit();

let greekLetters = ['alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lamba', 'mu', 'nu', 'xi', 'omicron', 'pi', 'rho', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega'];

class RandomName {
    constructor(nameLength) {
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

        this.newName = { name: capitalizedFullName, id: randomID() };
    }

    // add new name to local storage
    addToLocalStorage(newName) {
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

    // displaying name in DOM
    displayName(newName) {
        const li = document.createElement('li');
        li.classList = 'collection-item';
        li.id = newName.id;
        li.innerHTML = `${newName.name}<i class="material-icons pencil right">edit</i>`;

        document.querySelector('.collection').insertAdjacentElement('beforeend', li);
    }

    // display all names
    displayAllNames() {
        document.querySelector('.collection').innerHTML = '';

        const allNames = JSON.parse(localStorage.getItem('names'));
        if (allNames === null) {

        } else if (allNames.length === 1) {
            const li = document.createElement('li');
            li.classList = 'collection-item';
            li.id = allNames[0].newName.id;
            li.innerHTML = `${allNames[0].newName.name}<i class="material-icons pencil right">edit</i>`;

            document.querySelector('.collection').insertAdjacentElement('beforeend', li);
        }
        else {
            allNames.forEach((eachName) => {
                const li = document.createElement('li');
                li.classList = 'collection-item';
                li.id = eachName.newName.id;
                li.innerHTML = `${eachName.newName.name}<i class="material-icons pencil right">edit</i>`;

                document.querySelector('.collection').insertAdjacentElement('beforeend', li);
            });
        }
    }

    displayCurrentName(currentItem) {
        const nameEditField = document.querySelector('.name-edit-field');

        const allNames = JSON.parse(localStorage.getItem('names'));
        allNames.forEach((eachName) => {
            if (eachName.newName.id == currentItem) {
                nameEditField.value = eachName.newName.name;
                nameEditField.id = eachName.newName.id;
            }
        });
    }

    updateEditState() {
        // updating local storage
        const updatedItem = document.querySelector('.name-edit-field').value;

        const allNames = JSON.parse(localStorage.getItem('names'));
        allNames.forEach((eachName) => {
            if (eachName.newName.id == document.querySelector('.name-edit-field').id) {
                allNames.splice(allNames.indexOf(eachName), 1, { newName: { name: updatedItem, id: document.querySelector('.name-edit-field').id } });

                localStorage.setItem('names', JSON.stringify(allNames));
            }
        });
    }

    deleteName() {
        // updating local storage
        const allNames = JSON.parse(localStorage.getItem('names'));
        allNames.forEach((eachName) => {
            if (eachName.newName.id == document.querySelector('.name-edit-field').id) {
                allNames.splice(allNames.indexOf(eachName), 1);

                localStorage.setItem('names', JSON.stringify(allNames));
            }
        });
    }

    // display success edit message
    displayEdited() {
        const edited = document.querySelector('.edited');

        setTimeout(() => {
            edited.style.display = 'block';
        }, 0);

        setTimeout(() => {
            edited.style.display = 'none';
        }, 3000);
    }

    // display name deleted message
    displayNameDeleted() {
        const deleted = document.querySelector('.deleted');

        setTimeout(() => {
            deleted.style.display = 'block';
        }, 0);

        setTimeout(() => {
            deleted.style.display = 'none';
        }, 3000);
    }

    hideEditState() {
        document.querySelector('.edit-state').classList.add('hidden');
    }

    showEditState() {
        document.querySelector('.edit-state').classList.remove('hidden');
        window.scrollBy(0, document.body.scrollHeight);
    }
}

const numberOfWords = document.querySelector('.number-of-words');

function createName() {
    const randomName = new RandomName(numberOfWords.value);
    return randomName;
}

// when generate name is clicked
document.getElementById('submit-btn').addEventListener('click', () => {
    if (numberOfWords.value != '') {
        createName().addToLocalStorage(createName());
        createName().displayAllNames();
    } else {
        displayError();
    }
});

// when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    createName().displayAllNames();
});

// when pencil is clicked
document.querySelector('.collection').addEventListener('click', (e) => {
    if (e.target.classList.contains('pencil')) {
        createName().showEditState();
        createName().displayCurrentName(e.target.parentElement.id);
    }
});

// when change name is clicked
document.getElementById('edit-btn').addEventListener('click', () => {
    createName().updateEditState();
    createName().displayAllNames();
    createName().displayEdited();
    createName().hideEditState();
});

// when delete name is clicked
document.getElementById('delete-btn').addEventListener('click', () => {
    createName().deleteName();
    createName().hideEditState();
    createName().displayNameDeleted();
    createName().displayAllNames();
});

// when back is clicked
document.getElementById('back-btn').addEventListener('click', () => {
    createName().hideEditState();
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