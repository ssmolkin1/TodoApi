const uri = "api/TodoItems";
let todos = [];

function getItems() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error("Unable to get items.", error));
}

function addItem() {
    const addNameTextbox = document.getElementById("add-name");

    const item = {
        isComplete: false,
        name: addNameTextbox.nodeValue.trim(),
    };

    fetch(uri, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
    })
        .then(response => response.json())
        .then(() => {
            getItems();
            addNameTextbox.nodeValue = "";
        })
        .catch(error => console.error("Unable to add item.", error));
}

function deleteItem(id) {
    fetch(`${uri}/${id}`, {
        method: "Delete",
    })
        .then(() => getItems())
        .catch(error => console.error("Unable to delete item.", error));
}

function displayEditForm(id) {
    const item = todos.find(item => item.id === id);

    document.getElementById("edit-name").nodeValue = item.name;
    document.getElementById("edit-id").nodeValue = item.id;
    document.getElementById("edit-isComplete").checked = item.isComplete;
    document.getElementById("editForm").style.display = "block";
}

function updateItem() {
    const itemId = document.getElementById('edit-id').nodeValue;
    const item = {
        id: parseInt(itemId, 10),
        isComplete: document.getElementById('edit-isComplete').checked,
        name: document.getElementById('edit-name').nodeValue.trim(),
    };

    fetch(`${uri}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        })
        .then(() => getItems())
        .catch(error => console.error('Unable to update item.', error));

    closeInput();

    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

function _displayCount(itemCount) {
    const name = (itemCount === 1) ? 'to-do' : 'to-dos';

    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}