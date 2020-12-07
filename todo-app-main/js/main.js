"use strict"

class Todo {
    constructor(id,todo, status = false) {
        this.id = id;
        this.todo = todo;
        this.status = false;
    }

    changeStatus(){
        this.status = !this.status;
        console.log(this.status)
    }
}

const todos_list = [];
const theme = document.querySelector('body')
const themeSwitcher = document.querySelector('.header__theme-switcher');
const todos_amount = document.querySelector('.todos__amount');

themeSwitcher.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(theme.classList.value);
    if (theme.classList.value === 'theme--dark') {
        theme.classList.replace('theme--dark', 'theme--light');
    } else if (theme.classList.value === 'theme--light') {
        theme.classList.replace('theme--light', 'theme--dark');
    }
});


const addTodo = (event) => {
    if (event.key === "Enter") {
        const newTodo = event.target.value;
        if (newTodo.length === 0) {
            alert('Todo is empty')
        } else {
            event.target.value = "";
            todos_list.push(new Todo(idGenerator(),newTodo, false));
            refreshUI();
            
        }
    }
}

const removeTodo = (event, id) => {
    event.preventDefault();
    const itemToRemove =  todos_list.filter(item => item.id !== id);

    todos_list.splice(0, todos_list.length);
    todos_list.push(...itemToRemove);
    
    refreshUI();
}

const todoStatus = (event, id)=>{
    event.stopPropagation();
    const todoItem = document.getElementById(id);
    if(todoItem.classList.contains('marked')){
        todoItem.classList.remove('marked')
    }else{
        todoItem.classList.toggle('marked')

    }
    todos_list.find(item=>{if(item.id===id){item.changeStatus()}});
    refreshTodosAmount();

}

const clearAllCompletedTodos = (event) => {
    event.preventDefault();
    const auxTodo_list = todos_list.map(item=>item);
  //  debugger
    for(const item of todos_list){
        if(item.status===true){
            let index = auxTodo_list.indexOf(item);
            auxTodo_list.splice(index,1)
        }
    }

    if(auxTodo_list.length<todos_list.length){
      todos_list.length = 0;
      todos_list.push(...auxTodo_list);
      refreshUI();
     }
    
}

const filterTodos = (filter)=>{
    const list = document.querySelector('.todos');
    const active = document.querySelector('.focus');
    const state = document.querySelector('.todos--'+filter);
    const currentFilter = list.classList.item(1);
  
    active.classList.remove('focus');
    state.classList.toggle('focus');

    switch(filter){
     case  "all": list.classList.replace(currentFilter, "all"); break;
     case  "active": list.classList.replace(currentFilter, "active"); break;
     case  "completed": list.classList.replace(currentFilter, "completed"); break;
        default: break;
    }
}

const idGenerator = () => {
    const id = Math.floor(Math.random() * 99999);
    return id
}

const createUITodoElement = (id, todo, status) => (
    
    `
    <li class="${"todos__item"+status}" data-state="false" id="${id}">
    <label for="todo_${id}" class="todo custom-checkbox-container">
      <input id="todo_${id}" type="checkbox" ${status===' marked' ? 'checked' :''} onclick="todoStatus(event, ${id})" class="todos__item--pending">
     <span class='label__text'>${todo}</span>
      <span class="checkmark"></span>
    </label>
    <span class="todos__item-remove-icon" onclick="removeTodo(event, ${id})">
     <img src="images/icon-cross.svg" alt="delete todo">
        </span>
    </li>
`
);


const refreshUI = () => {
    const elements = [];
    
    for(const item of todos_list){
        
        elements.push(createUITodoElement(item.id, item.todo,item.status ? ' marked' : ''))
    }
    //Repainting List Items
    repaintUI(elements);
    refreshTodosAmount();
}


function refreshTodosAmount () {
        
    let totalActive = todos_list.length;
    for(const item of todos_list){
        if(item.status){
            totalActive--;
        }
    }

    if (totalActive === 0) {
        todos_amount.innerHTML = "No items";
    } else {
        todos_amount.innerHTML= totalActive === 1 ? `${totalActive} item left` : `${totalActive} items left`;
    }   

    console.log('Number of items ', totalActive)
}

const repaintUI = (elements)=>{
    //Get the todos list
    const list = document.querySelector('.todos');
    //clean the list before inserting new item(s)
    list.innerHTML="";
    //items adds items to list
    for(const item of elements){
        list.insertAdjacentHTML('afterbegin', item);
    }
}

const initTodos = ()=>{
    todos_list.push(new Todo(989,'Go to the super market',true));
    todos_list.push(new Todo(929,'Go to the moutain', false));
    todos_list.push(new Todo(489,'Drink Coffee', true));
    todos_list.push(new Todo(589,'Do home work', false));
    todos_list.push(new Todo(689,'Call the store', false));
    
    refreshUI();
}

initTodos();