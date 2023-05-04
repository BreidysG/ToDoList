const date = document.querySelector("#date");
const list = document.querySelector("#list");
const input = document.querySelector("#input");
const buttonEnter = document.querySelector("#enter");

/*Function add task*/

function addTask(tarea){
    const element = `<li>
                        <span data-="complete" id="0" >✔</span>
                        <p>${tarea}</p>
                        <span data-="delete" id="0" >🗑</span>
                    </li>`
    list.insertAdjacentHTML("beforeend", element)
}

buttonEnter.addEventListener("click", ()=>{
    const tarea = input.value;
    if(tarea){
        addTask(tarea);
    }
    input.value= "";
});

document.addEventListener("keyup", function(event){
    if(event.key == "Enter"){
        const tarea = input.value;
        if(tarea){
            addTask(tarea);
        }
        input.value= "";
    }
});