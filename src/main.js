const todoList = [];
const todoContainer = document.querySelector("#todoContainer");	

var db = new Dexie("MyFriendDB");
db.version(1).stores({
	friends: '++id,name,age'
});
console.log("Using Dexie v" + Dexie.semVer);
db.open().then(function(){
 
});

//Material bacana sobre Localstorage, SessionStorage, IndexedDB
//https://medium.com/@lancelyao/browser-storage-local-storage-session-storage-cookie-indexeddb-and-websql-be6721ebe32a
//https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB
//const request = window.indexedDB.open("MyTestDatabase", 3);
// https://dexie.org/

window.addEventListener("load", (event)=>{
    const bttAddTodo = document.querySelector('#bttAddTodo');
    const inputText = document.querySelector('#newTask');

	verificaSeListaEstaVazia();
    bttAddTodo.addEventListener('click',(e)=>{
        adicionarTarefa();
    });
    inputText.addEventListener('keydown',(e)=>{
        if(e.keyCode === 13){
            adicionarTarefa();    
        }
    });    

    function adicionarTarefa(){
        new_task = document.querySelector('#newTask');
        if (!new_task || new_task.value.length === 0){
            alert("Por favor, adicione uma tarefa!");
            new_task.focus();
            return false;
        }
        todo = addTodoList(new_task.value);
		addTaskInTemplate(todo);
        new_task.value="";
        verificaSeListaEstaVazia();
        new_task.focus();
    }

	function addTaskInTemplate(todo){
		var value =`
			<input type="checkbox" id="${todo.id}_ckd" class="task" onchange="handleCheckbox(event);">
			<label class="form-check-label"  style="min-width:100px;"for="${todo.id}_ckd">${todo.tarefa}</label>
            <button type="button" class="btn-close removerTarefa" aria-label="Close" onclick="excluirTarefa(${todo.id});"></button>
		`
		var li = document.createElement("li");
		li.className = "list-group-item";
        li.id= todo.id;
		li.innerHTML = value;
		todoContainer.appendChild(li);
    }

	function addTodoList(item){		
		const todo = {
            id: Date.now(),
			tarefa: item,
			done: false,
		}
		todoList.push(todo);		
		console.log(todoList);
		return todo;
    }

  
});

function verificaSeListaEstaVazia(){
    const itensTasks = todoContainer.querySelectorAll("li");
  
    if (itensTasks.length === 0) {
         $('.alert').show();

    }else{
        $('.alert').hide();
     }        
}  

function excluirTarefa(id){
    var index = -1
    for (i=0; i< todoList.length; i++){
        el = todoList[i];
        if (el.id == id){
            console.log(el);
            //delete arr[i];
            index = i;              
            break; 
        }
    }        
    if (index > -1) {
        todoList.splice(index, 1);
        document.getElementById(el.id);
        todoContainer.removeChild(document.getElementById(el.id));
    }      
    verificaSeListaEstaVazia(); 
}

function handleCheckbox(e) {
    //console.log(e);
    //console.log(e.target.nextSibling.nextSibling);

    if (e.target.checked){
      e.target.nextSibling.nextSibling.style = "text-decoration: line-through;"
    } else {
      e.target.nextSibling.nextSibling.style = ""
    }    
  }


  function salvar(){    
    localStorage.setItem('Lista', JSON.stringify(todoList));
    console.log(localStorage.getItem('Lista'));
  }