class List {
    constructor(title = "List", id = getUniqueID("list-"), items) {
        this.title = title;
        this.id = id;
        this.items = items;
    }
    get Html() {return `
<div class="list">
    <div class="list-top">
        <h1 class="list-title">${this.title}</h1>
        <div class="buttons">
            <button onclick="List.clear(this)" class="clear-btn">
                <img src="images/clear.svg">
            </button>
            <button onclick="List.edit(this)" class="edit-btn">
                <img src="images/edit.svg">
            </button>
            <button onclick="List.delete(this)" class="delete-btn">
                <img src="images/delete.svg">
            </button>
        </div>
    </div>
    <ul class="list-items">
    </ul>
    <button onclick="Item.add(this)" class="add-item-btn">+</button>
</div>
    `}
    static edit(that) {
        console.log("edit");
        let textBox = $(that).parent().parent().children('.list-title')[0];
        let text = textBox.innerText;
        textBox.remove();
        $(that).parent().parent().prepend(`
        <textarea onclick="textAreaAdjust(this)" onkeypress="textAreaAdjust(this)" class="list-title">${text}</textarea>
        `);
        $(that).parent().parent().children('.list-title')[0].focus()
        $(that).parent().prepend(`
        <button onclick="List.save(this)" class="save-btn">
            <img src="images/save.svg">
        </button>
        `)
        $(that).remove()
        textAreaAdjust(textBox)
    }
    static save(that) {
        console.log("save");
        let textBox = $(that).parent().parent().children('.list-title')[0];
        let text = textBox.value;
        textBox.remove();
        $(that).parent().parent().prepend(`
        <h1 class="list-title">${text}</h1>
        `);
        
        $(that).parent().prepend(`
        <button onclick="List.edit(this)" class="edit-btn">
            <img src="images/edit.svg">
        </button>
        `)
        $(that).remove();
    }
    static delete(that) {
        console.log("delete");
        $(that).parent().parent().parent().remove();
    }
    static add() {
        console.log("add");
        $('#list-box').prepend(new List().Html)
    }
    static clear(that) {
        let List = $(that).parent().parent().parent();
        // console.log($(that).parent().parent().parent().children('.checked'))
        console.log(List.children('.list-items').children('.item').children('.buttons').children('.check-btn').children('.checked').parent().parent().parent().hide())
        // $('.checked').parent().parent().parent().parent().parent().remove();
    }
}
class Item {
    constructor(itemText = "", listId, index = 0, id = getUniqueID()) {
        this.itemText = itemText;
        this.listId = listId;
        this.index = index;
        this.id = id;
        this.checked = true
    }
    get Html() {return `
<li class="item">
    <p class="item-text">${this.itemText}</p>
    <div class="buttons">
        <button onclick="Item.edit(this)" class="edit-btn">
            <img src="images/edit.svg">
        </button>
        <button onclick="Item.check(this)" class="check-btn">

        </button>
        <button onclick="Item.delete(this)" class="delete-btn">
            <img src="images/delete.svg">
        </button>
    </div>
</li>
    `};
    static edit(that) {
        console.log("edit");
        let textBox = $(that).parent().parent().children('.item-text')[0];
        let text = textBox.innerText;
        textBox.remove();
        $(that).parent().parent().prepend(`
        <textarea onclick="textAreaAdjust(this)" onkeyup="textAreaAdjust(this)" class="item-text">${text}</textarea>
        `);
        $(that).parent().parent().children('.item-text')[0].focus()
        $(that).parent().prepend(`
        <button onclick="Item.save(this)" class="save-btn">
            <img src="images/save.svg">
        </button>
        `)
        $(that).remove()
    }
    static save(that) {
        console.log("save");
        let textBox = $(that).parent().parent().children('.item-text')[0];
        let text = textBox.value;
        textBox.remove();
        $(that).parent().parent().prepend(`
        <p class="item-text">${text}</p>
        `);
        $(that).parent().prepend(`
        <button onclick="Item.edit(this)" class="edit-btn">
            <img src="images/edit.svg">
        </button>
        `)
        $(that).remove();
    }
    static delete(that) {
        console.log("delete");
        $(that).parent().parent().remove();
        save()
    }
    static add(that) {
        console.log("add");
        $(that).prev().append(new Item("").Html)
        save()
    }
    static check(that) {
        console.log("check");
        let checkbox = $(that).children()
        if($(that).children()[0]) {
            console.log("off");
            checkbox.remove()
        } else {
            console.log("on");
            $(that).prepend(`<img class="checked" src="images/check.svg">`)
        }
        save()
    }
}

function getUniqueID(prefix = "ID-", str = getUniqueID("", Math.random())) {
    if(str == "") {
        str = getUniqueID();
    }
    let hash = 0;
    str = String(str); 
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let id = prefix;
    for (let i = 0; i < 3; i++) {
        let value = (hash >> (i * 8)) & 0xFF;
        id += ('00' + value.toString(36)).substr(-2);
    }
    return id;
}

function textAreaAdjust(element) {
    element.style.height = "1px";
    element.style.height = (element.scrollHeight)+"px";
}

const box = document.querySelector('#list-box')
const theKey = 'key'

if(retrieve() != null) {
    display()
}

function display() {
    console.log("display")
    box.innerHTML = retrieve()
}

function save() {
    console.log("save")
    localStorage.setItem(theKey, JSON.stringify(box.innerHTML));
}

function retrieve() {
    console.log("retrieve")
    return JSON.parse(localStorage.getItem(theKey));
}
