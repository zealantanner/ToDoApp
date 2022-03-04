// class User {
//     constructor(id, lists) {
//         this.id = id;
//         this.lists = lists;
//     }
//     addNewList() {
//         return true;
//     }
// }
// class ToDoList {
//     constructor(id, toDos) {
//         this.toDos = toDos;
//         this.id = id;
//     }
// }

const IdInput = document.querySelector('#listName');
const IdInput = document.querySelector('#listId');

theButton.addEventListener("mousedown", function () {
    activate()
});

input.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
        activate()
    }
});
input.value = '';


const listList = []

class List {
    constructor(name = "list", id = "2132", tasks = [new Task()]) {
        this.name = name;
        this.id = id;
        this.tasks = tasks;
        listList.unshift([name, id, tasks])
    }
    addTask(newTask = new Task()) {
        this.tasks.push(newTask);
    }
    rename(newName) {
        this.name = newName;
    }
}
class Task {
    constructor(id = "untitled", text = "blank", completed = false) {
        this.id = id;
        this.text = text;
        this.completed = completed;
    }
    markCompleted(x = true) {
        this.completed = x;
    }
    editText(newText) {
        if(newText != '') {
            this.text = newText;
        }
    }
}

class Rectangle {
    constructor(height = 40, width = 40, yPos, xPos) {
        this.height = height;
        this.width = width;
    }
    changeHeight(newHeight = this.height) {
        this.height = newHeight;
    }
    changeWidth(newWidth = this.width) {
        this.width = newWidth;
    }
    changeSize(newHeight, newWidth) {
        changeHeight(newHeight)
        changeWidth(newWidth)
    }

    
}

// const thingyThing = new List("List 1", 1234, [new Task(4321, "do this that and the other", false), new Task(2345, "don't do the bad stuff", true)]);
// console.log(thingyThing);