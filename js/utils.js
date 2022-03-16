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

class List {
    constructor(title = "Untitled List", id = getUniqueID("list-"), tasks = [new task(this.id)]) {
        this.title = title;
        this.id = id;
        this.tasks = tasks;
    }
    get Html() {return `
    `}
    static edit(that) {
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
        console.log("edit");
    }
    static save(that) {
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
        console.log("save");
    }
    static delete(that) {
        $(that).parent().parent().parent().remove();
        console.log("delete");
    }
    static add() {
        $('#list-box').prepend(new List().Html)
    }
}

class Task {
    constructor(taskText = "Untitled Task", index = 0, id = getUniqueID()) {
        this.taskText = taskText;
        this.listId = listId;
        this.index = index;
        this.id = id;
    }
    get Html() {return `
<li class="task">
    <p class="task-text">${this.taskText}</p>
    <div class="buttons">
        <button onclick="task.edit(this)" class="edit-btn">
            <img src="images/edit.svg">
        </button>
        <button onclick="task.delete(this)" class="delete-btn">
            <img src="images/delete.svg">
        </button>
    </div>
</li>
    `};
    static edit(that) {
        let textBox = $(that).parent().parent().children('.task-text')[0];
        let text = textBox.innerText;
        textBox.remove();
        $(that).parent().parent().prepend(`
        <textarea onclick="textAreaAdjust(this)" onkeyup="textAreaAdjust(this)" class="task-text">${text}</textarea>
        `);

        $(that).parent().parent().children('.task-text')[0].focus()
        $(that).parent().prepend(`
        <button onclick="task.save(this)" class="save-btn">
            <img src="images/save.svg">
        </button>
        `)
        $(that).remove()
        console.log("edit");
    }
    static save(that) {
        let textBox = $(that).parent().parent().children('.task-text')[0];
        
        let text = textBox.value;
        textBox.remove();
        $(that).parent().parent().prepend(`
        <p class="task-text">${text}</p>
        `);
        
        $(that).parent().prepend(`
        <button onclick="task.edit(this)" class="edit-btn">
            <img src="images/edit.svg">
        </button>
        `)
        $(that).remove();
        console.log("save");
    }
    static delete(that) {
        $(that).parent().parent().remove();
        console.log("delete");
    }
    static add(that) {
        $(that).prev().append(new task("").Html)
    }
}