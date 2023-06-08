let todoList = [];
const todoContainer = document.querySelector("#todoContainer");	

if (localStorage.getItem("Lista")){
    todoList =  JSON.parse(localStorage.getItem('Lista'));
    for (var i=0; i< todoList.length; i++){
        addTaskInTemplate(todoList[i]);
    }
}

verificaSeListaEstaVazia();

window.addEventListener("load", (event)=>{
    const bttAddTodo = document.querySelector('#bttAddTodo');
    const inputText = document.querySelector('#newTask');

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
        salvarLocalStorage();        
        verificaSeListaEstaVazia();
        new_task.value="";        
        new_task.focus();
        
    }

	function addTodoList(item){		
		const todo = {
            id: Date.now(),
			tarefa: item,
			done: false,
		}
		todoList.push(todo);		
		return todo;
    }
});

function addTaskInTemplate(todo){
    var value =`
        <input type="checkbox" id="${todo.id}_ckd" class="task" data-task="${todo.id}" onchange="handleCheckbox(event);">
        <label class="form-check-label" for="${todo.id}_ckd">${todo.tarefa}</label>
        <input type="text" class="d-none" value="${todo.tarefa}" />

        <button type="button" class="removerTarefa" aria-label="Excluir" onclick="excluirTarefa(${todo.id});"><i class="bi bi-trash-fill"></i> Excluir tarefa</button>
        <button type="button" class="editarTarefa" aria-label="Editar" onclick="editarTarefa(${todo.id});"><i class="bi bi-pencil-fill"></i> Editar tarefa</button>
        <button type="button" class="salvarTarefa text-end d-none" aria-label="Salvar" onclick="salvarEdicaoTarefa(${todo.id});"><i class="bi bi-check-square-fill"></i> Salvar edição</button>
        <button type="button" class="cancelarEdicaoTarefa d-none" aria-label="Cancelar" onclick="cancelarEdicaoTarefa(${todo.id});"><i class="bi bi-x-square-fill"></i> Cancelar edição</button>
       `
    var li = document.createElement("li");
    li.className = "list-group-item";
    li.id= todo.id;
    li.innerHTML = value;
    todoContainer.appendChild(li);
}

function verificaSeListaEstaVazia(){
    const itensTasks = todoContainer.querySelectorAll("li");
    if (itensTasks.length === 0) {
         $('.alert').show();
    }else{
        $('.alert').hide();
     }        
}  

function excluirTarefa(id){
    let index = -1

    for (i=0; i< todoList.length; i++){
        el = todoList[i];
        if (el.id == id){
            index = i;              
            break; 
        }
    }        
    if (index > -1) {
        todoList.splice(index, 1);
        document.getElementById(el.id);
        todoContainer.removeChild(document.getElementById(el.id));
        salvarLocalStorage();
        verificaSeListaEstaVazia();         
    }    
}

function editarTarefa(id){
    editar_tarefa = document.getElementById(id);
    editar_tarefa.querySelector("label").classList.add("d-none");	
    editar_tarefa.querySelector("input[type='text']").classList.remove("d-none");	
    editar_tarefa.querySelector(".removerTarefa").classList.add("d-none");	
    editar_tarefa.querySelector(".editarTarefa").classList.add("d-none");	
    editar_tarefa.querySelector(".salvarTarefa").classList.remove("d-none");	
    editar_tarefa.querySelector(".cancelarEdicaoTarefa").classList.remove("d-none");	 
}

function salvarEdicaoTarefa(id){
    tarefa_editada = document.getElementById(id);
    input = editar_tarefa.querySelector("input[type='text']");	
    if (!input || input.value.length === 0){
        alert("Por favor, atualize a sua tarefa!");
        input.focus();
        return false;
    }else{
        for (i=0; i< todoList.length; i++){
            el = todoList[i];
            if (el.id == id){
                break; 
            }
        }  
        el.tarefa =  input.value;
        salvarLocalStorage();
        location.reload(true);
    }

}
function cancelarEdicaoTarefa(id){
    editar_tarefa = document.getElementById(id);
    editar_tarefa.querySelector("label").classList.remove("d-none");	
    editar_tarefa.querySelector("input[type='text']").value = editar_tarefa.querySelector("label").textContent;
    editar_tarefa.querySelector("input[type='text']").classList.add("d-none");	
    editar_tarefa.querySelector(".removerTarefa").classList.remove("d-none");	
    editar_tarefa.querySelector(".editarTarefa").classList.remove("d-none");	
    editar_tarefa.querySelector(".salvarTarefa").classList.add("d-none");	
    editar_tarefa.querySelector(".cancelarEdicaoTarefa").classList.add("d-none");	
}
function handleCheckbox(e) {

    if (e.target.checked){
      e.target.nextSibling.nextSibling.classList.add("doneTask")
      updateListTask(e);
    } else {
      e.target.nextSibling.nextSibling.classList.remove("doneTask")
      updateListTask(e)
    }    
  }

  function updateListTask(element){
    for(i=0; i< todoList.length; i++){
        el = todoList[i];
        if(el.id == element.target.dataset.task){
            el.done = !el.done;
            break;
        }
      }
  }

function salvarLocalStorage(){    
    localStorage.setItem('Lista', JSON.stringify(todoList));
    console.log(JSON.parse(localStorage.getItem('Lista')));
}