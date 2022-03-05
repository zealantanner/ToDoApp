class Color {
    constructor(...input) {
        if(input.length == 3) {
            for(let i = 0; i < 3; i++) {
                input[i] = (255 < input[i]) ? 255 : input[i];
                input[i] = (input[i] < 0) ? 0 : input[i];
            }
            this.r = input[0];
            this.g = input[1];
            this.b = input[2];
            this.hex = Color.RGBToHex(this.r, this.g, this.b);
        }
        else if(input.length == 1) {
            this.r = Color.hexToRGB(input[0]).r;
            this.g = Color.hexToRGB(input[0]).g;
            this.b = Color.hexToRGB(input[0]).b;
            this.hex = Color.RGBToHex(this.r, this.g, this.b);
        }
        else {
            throw new Error('Invalid color');  
        }
    }
    get Text() {
        return {
            RGB: `rgb(${this.r}, ${this.g}, ${this.b})`,
            hex: `${this.hex}`
        }
    }
    static RGBToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    static hexToRGB(hex) {
        if (hex.length != 6 && hex.length != 7) {
            throw new Error('Invalid hex code');  
        }
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
            text: `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`
        } : [r,g,b];
    }
    shade(...amt) {
        if(amt.length == 1) {
            return new Color(parseInt(this.r + amt[0]), parseInt(this.g + amt[0]), parseInt(this.b + amt[0]));
        }
        else if(amt.length == 3) {
            return new Color(parseInt(this.r + amt[0]), parseInt(this.g + amt[1]), parseInt(this.b + amt[2]));
        }
        else {
            throw new Error('Invalid color');  
        }
    }
}

function getUniqueID(str = getUniqueID(Math.random() * 100), prefix = "ID-") {
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


console.log(getUniqueID(.00000001, "item-"))
console.log(getUniqueID(.0000001))
console.log(getUniqueID(.0000002))
console.log(getUniqueID())
console.log(getUniqueID())


class List {
    constructor(name = "Untitled List", id = getUniqueID(), items = [new Item]) {
        this.name = name;
        this.id = id;
        this.items = items;
    }
    addNewItem() {
        this.items.unshift(new Item)
    }
}
class Item {
    constructor(id = getUniqueID(), toDos) {
        this.toDos = toDos;
        this.id = id;
    }
}


// const IdInput = document.querySelector('#listName');
// const IdInput = document.querySelector('#listId');

// theButton.addEventListener("mousedown", function () {
//     activate()
// });

// input.addEventListener("keydown", function (e) {
//     if (e.code === "Enter") {
//         activate()
//     }
// });
// input.value = '';


// const listList = []

// class List {
//     constructor(name = "list", id = "2132", tasks = [new Task()]) {
//         this.name = name;
//         this.id = id;
//         this.tasks = tasks;
//         listList.unshift([name, id, tasks])
//     }
//     addTask(newTask = new Task()) {
//         this.tasks.push(newTask);
//     }
//     rename(newName) {
//         this.name = newName;
//     }
// }
// class Task {
//     constructor(id = "untitled", text = "blank", completed = false) {
//         this.id = id;
//         this.text = text;
//         this.completed = completed;
//     }
//     markCompleted(x = true) {
//         this.completed = x;
//     }
//     editText(newText) {
//         if(newText != '') {
//             this.text = newText;
//         }
//     }
// }

// class Rectangle {
//     constructor(height = 40, width = 40, yPos, xPos) {
//         this.height = height;
//         this.width = width;
//     }
//     changeHeight(newHeight = this.height) {
//         this.height = newHeight;
//     }
//     changeWidth(newWidth = this.width) {
//         this.width = newWidth;
//     }
//     changeSize(newHeight, newWidth) {
//         changeHeight(newHeight)
//         changeWidth(newWidth)
//     }

    
// }

// // const thingyThing = new List("List 1", 1234, [new Task(4321, "do this that and the other", false), new Task(2345, "don't do the bad stuff", true)]);
// // console.log(thingyThing);