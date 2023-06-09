const date = document.querySelector("#date");
const list = document.querySelector("#list");
const input = document.querySelector("#input");
const buttonEnter = document.querySelector("#enter");
const lineThrough = "line-through";
const check = "check";
let id;
let LIST ;

/*DATE FROM NAVIGATOR*/ 
const DATE = new Date();
date.innerHTML = DATE.toLocaleDateString("en", {weekday: "long", month: "short", day: "numeric" });


/*Function add task*/

function addTask(task, id, complete, del){
    if(del){return}
    const COMPLETE = complete? check: "";
    const LINE = complete? lineThrough: "";
    const element = `<li id="element">
                        <span class="${COMPLETE}" data-="complete" id="${id}" >✔</span>
                        <p class= "text ${LINE}">${task}</p>
                        <span class="" data-="delete" id="${id}" >🗑</span>
                    </li>`
    list.insertAdjacentHTML("beforeend", element)
}

buttonEnter.addEventListener("click", ()=>{
    const task = input.value;
    if(task){
        addTask(task, id, false, false);
        LIST.push({
            name: task,
            id: id,
            complete: false,
            delete: false,
        });
        
    }
    localStorage.setItem("TODO",JSON.stringify(LIST));
    input.value= "";
    id ++; 
    
});

document.addEventListener("keyup", function(event){
    if(event.key == "Enter"){
        const task = input.value;
        if(task){
            addTask(task, id, false, false);
            LIST.push({
                name: task,
                id: id,
                complete: false,
                delete: false,
            });
        }
        localStorage.setItem("TODO",JSON.stringify(LIST));
        input.value= "";
        id ++;
    }
});

list.addEventListener("click", function(event){
    const element = event.target;
    const elementData = element.attributes[1].value;

    if(elementData === "complete"){
        taskComplete(element);
    }else if(elementData === "delete"){
        taskDelete(element);
    }
    localStorage.setItem("TODO",JSON.stringify(LIST));
})

/*COMPLETE*/

function taskComplete(element){
    element.classList.toggle(check); 
    element.parentNode.querySelector(".text").classList.toggle(lineThrough);
    LIST[element.id].complete = LIST[element.id].complete ? false: true;
}

/*DELETE */

function taskDelete(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].delete = true;
}

/**LOCALSTORAGE GET ITEM */

let data = localStorage.getItem("TODO");
if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
} else {
    LIST= [];
    id = 0
}

function loadList(DATA){
    DATA.forEach(function(i) {
        addTask(i.name, i.id, i.complete, i.delete);
    });
}

