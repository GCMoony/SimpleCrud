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
    item.parentElement.remove();
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

function addItem()
{
    let itemContainer = document.getElementById("item-container");
    let newItem = addItemHelper()
    itemContainer.appendChild(newItem);
    editItem(newItem.children[2]);

}

function editItem(item)
{
    let textBox = item.parentElement.children[1];
    //console.log(item.parentElement.children[1].value);
    textBox.disabled = false;
    textBox.focus();
    textBox.select();
}

function editItemLock(textBox)
{
    textBox.disabled = true;
}

function addItemHelper()
{
    let newContainer = document.createElement('div');
    newContainer.className = "crud-item flex gap-3";
    newContainer.innerHTML = 
    '<input type="checkbox" class="flex-none" onclick="markComplete(this)">' + 
    '<textarea class="flex-auto pl-3" onblur="editItemLock(this)" disabled="true"></textarea>' +
    '<button class="edit-button hover:bg-blue-600 px-2 py-1 rounded-full flex-none" onclick="editItem(this)" >✏</button>' +
    '<button class="delete-button hover:bg-red-600 px-2 py-1 rounded-full flex-none" onclick="deleteItem(this)">🗑</button>';
    return newContainer;
}


//showItemCount();