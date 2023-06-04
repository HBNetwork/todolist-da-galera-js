window.addEventListener("load", (event)=>{
    const todoList = [];
	const todoContainer = document.querySelector("#todoContainer");	
    const bttAddTodo = document.querySelector('#bttAddTodo');
	//verificaSeListaEstaVazia();
    bttAddTodo.addEventListener('click',(e)=>{
        new_task = document.querySelector('#newTask');
        if (!new_task || new_task.value.length === 0){
            alert("Por favor, adicione uma tarefa!");
            new_task.focus();
            return false;
        }
        todo = addTodoList(new_task.value);
		addTaskInTemplate(todo);
        new_task.value="";
        //verificaSeListaEstaVazia();
        new_task.focus();
    });

	function addTaskInTemplate(todo){
		var value =`
			<input type="checkbox" id="${todo.id}_ckd" class="task ">
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


    function excluirTarefa(id){
        var index = -1
        for (i=0; i< todoList.length; i++){
            el = todoList[i];
            if (el.id == id){
                console.log(el);
                //delete arr[i];
                index = i;               
            }
        }        
        if (index > -1) {
            todoList.splice(index, 1);
            //document.getElementById(el.id);
            //todoContainer.removeChild(document.getElementById(el.id));
        }        
    }

    function verificaSeListaEstaVazia(){
        const itensTasks = todoContainer.querySelectorAll("li");
      
        if (itensTasks.length == 0) {
            alerta= `<div class="alert alert-warning" role="alert">
            Não existe nenhuma tarefa adicionada na lista!
            </div>`;            
            todoContainer.innerHTML = alerta;	
        }else{
            todoContainer.parentElement.remove($('.alert'));
        }        
    }    
});