window.addEventListener("load", (event)=>{
    const todoList = [];
	const todoContainer = document.querySelector("#todoContainer");	
	const itensTasks = todoContainer.querySelectorAll("li");
    const bttAddTodo = document.querySelector('#bttAddTodo');
	
	if (itensTasks.length > 0) {
		for (var i=0; i < itensTasks.lenght; i++){
			item = listas[1].querySelector("label").textContent
			console.log(item);
		    addTodoList(item);  
		}
	}
	
    bttAddTodo.addEventListener('click',(e)=>{
        new_task = document.querySelector('#newTask');
        if (!new_task || new_task.value.length === 0){
            alert("Por favor, adicione uma tarefa!");
            new_task.focus();
            return false;
        }
        addTodoList(new_task.value);        
		//todoList.map(imprimeTodo);

    });
	
	function addTodoList(item){
        //todoList.push(item);
        document.querySelector('#newTask').value="";
		
		const todo = {
			tarefa: item,
			done: false,
		}
		todoList.push(todo);
		
		console.log(todoList);
		reloadTodoList();
    }
	

	function imprimeTodo(todo){
		//console.log(todo);
		var li = document.createElement('li');
		li.classList.add("list-group-item");
		li.innerHTML = todo.trim();
		todoContainer.appendChild(li);		
	}	

	function reloadTodoList(){
		let innerHTML = '';
		todoList.map((todo)=>{
			//console.log(todo);
			innerHTML+=`
                            <input type="checkbox" id="task1" class="">
                            <label class="form-check-label" for="task1">${todo.tarefa}</label>
						`
			imprimeTodo(innerHTML);
		});		
		
	}
	

});

/*
const tag_li =  document.createElement("li");
tag_li.setAttribute('class', 'list-group-item');

const tag_input_checkbox =  document.createElement("input");
tag_input_checkbox.setAttribute('type', 'checkbox');
tag_input_checkbox.setAttribute('class', 'form-check-input');
tag_input_checkbox.setAttribute('onclick', ()=> handleCheckBox(this));
tag_input_checkbox.setAttribute('value', todo.tarefa);


const tag_label =  document.createElement("label");
tag_label.setAttribute('class', 'form-check-label');
tag_label.innerHTML = todo.tarefa;

*/

