window.addEventListener("load", (event)=>{
    const todoList = [];
	const todoContainer = document.querySelector("#todoContainer");	
    const bttAddTodo = document.querySelector('#bttAddTodo');
	
    bttAddTodo.addEventListener('click',(e)=>{
        new_task = document.querySelector('#newTask');
        if (!new_task || new_task.value.length === 0){
            alert("Por favor, adicione uma tarefa!");
            new_task.focus();
            return false;
        }
        todo = addTodoList(new_task.value);
		addTaskInTemplate(todo);
    });

	function addTaskInTemplate(todo){
		var value =`
			<input type="checkbox" id="task1" class="">
			<label class="form-check-label" for="task1">${todo.tarefa}</label>
		`
		var li = document.createElement("li");
		li.className = "list-group-item"
		li.innerHTML = value;
		todoContainer.appendChild(li);
    }

	function addTodoList(item){		
		const todo = {
			tarefa: item,
			done: false,
		}
		todoList.push(todo);
		
		console.log(todoList);
		return todo;
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

