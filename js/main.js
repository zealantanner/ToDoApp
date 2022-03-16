
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
    element.style.height = (element.scrollHeight-1)+"px";
}





const box = document.querySelector('#list-box')
const theKey = 'key'

function display() {
    console.log("display")
    console.log(retrieve())
    box.innerHTML = retrieve()
}


function save() {
    console.log("save")
    localStorage.setItem(theKey, JSON.stringify(retrieve()));
}

function retrieve() {
    console.log("retrieve")
    return JSON.parse(localStorage.getItem(theKey));
}
// console.log(JSON.parse(localStorage.getItem(theKey)))
// localStorage.setItem(theKey, JSON.stringify(null));
