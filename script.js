function hello()
{
    alert("Hello World!");
}

function showItemCount()
{
    let itemCount = document.getElementsByClassName("crud-item").length;
    alert(`There are ${itemCount} item(s) in your list`);
}

function deleteItem(item)
{
    let textBox = item.parentElement.children[1];
    console.log(textBox.id);
    item.parentElement.remove();
    localStorage.removeItem(textBox.id);
}

function markComplete(item)
{
    let textBox = item.parentElement.children[1];
    if(item.checked)
    {
        textBox.style.textDecoration = "line-through";
        textBox.style.color = "grey";
        textBox.parentElement.children[2].disabled = true;  
    }
    else
    {
        textBox.style.textDecoration = "none";
        textBox.style.color = "initial";
        textBox.parentElement.children[2].disabled = false;  
    }
    
}

function addItem(textBoxId = null, textBoxValue = null)
{
    let itemContainer = document.getElementById("item-container");
    let newItem = (textBoxId  && textBoxValue ) ? addItemHelper(textBoxId, textBoxValue) : addItemHelper();
    //let newItem = addItemHelper();
    //if(textBoxId && textBoxValue)
    let preset = (textBoxId && textBoxValue);
    itemContainer.appendChild(newItem);
    editItem(newItem.children[2], preset);

}

function editItem(item, preset = false)
{
    let textBox = item.parentElement.children[1];
    //console.log(item.parentElement.children[1].value);
    textBox.disabled = false;
    textBox.focus();
    textBox.select();
    if(preset)
    {
        editItemLock(textBox);
    }
}

function editItemLock(textBox)
{
    //console.log(textBox.value);
    window.localStorage.setItem(textBox.id, textBox.value);
    textBox.disabled = true;
}

function addItemHelper(textBoxId = null, textBoxValue = null)
{
    console.log(textBoxId, textBoxValue);
    let newContainer = document.createElement('div');
    if(textBoxId == null)
    {
        textBoxId = Math.floor(Math.random() * 10000);
    }
    newContainer.className = "crud-item flex gap-3";
    newContainer.innerHTML = 
    '<input type="checkbox" class="flex-none" onclick="markComplete(this)">' + 
    `<textarea id=${textBoxId} class="flex-auto pl-3" onblur="editItemLock(this)" disabled="true" rows="1">${textBoxValue}</textarea>` +
    '<button class="edit-button hover:bg-blue-600 px-2 py-1 rounded-full flex-none" onclick="editItem(this)" >✏</button>' +
    '<button class="delete-button hover:bg-red-600 px-2 py-1 rounded-full flex-none" onclick="deleteItem(this)">🗑</button>';
    return newContainer;
}

function loadSavedItems()
{
    for(let i = 0; i < localStorage.length; i++)
    {
        addItem(localStorage.key(i), localStorage.getItem(localStorage.key(i)));
        console.log(localStorage.key(i), localStorage.getItem(localStorage.key(i)))
    }

}
loadSavedItems();
//showItemCount();