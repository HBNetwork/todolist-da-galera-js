let todoList = [];
const todoContainer = document.querySelector("#todoContainer");
let options_values = ['Urgentissíma', 'Urgente','Moderada','Fácil'];

if (localStorage.getItem("Lista")) {
    todoList = JSON.parse(localStorage.getItem('Lista'));
    for (var i = 0; i < todoList.length; i++) {
        addTaskInTemplate(todoList[i]);
    }
}

verificaSeListaEstaVazia();

window.addEventListener("load", (event) => {
    const bttAddTodo = document.querySelector('#bttAddTodo');
    const inputText = document.querySelector('#newTask');

    bttAddTodo.addEventListener('click', (e) => {
        adicionarTarefa();
    });
    inputText.addEventListener('keydown', (e) => {
        if (e.keyCode === 13) {
            adicionarTarefa();
        }
    });

    function adicionarTarefa() {
        new_task = document.querySelector('#newTask');
        prioridade = document.querySelector('.nivel-prioridade');        
        if (!new_task || new_task.value.length === 0) {
            alert("Por favor, adicione uma tarefa!");
            new_task.focus();
            return false;
        }
        todo = addTodoList(new_task.value, prioridade.value);
        addTaskInTemplate(todo);
        salvarLocalStorage();
        verificaSeListaEstaVazia();
        new_task.value = "";
        new_task.focus();

    }

    function addTodoList(item, prioridade) {
        const todo = {
            id: Date.now(),
            tarefa: item,
            done: false,
            prioridade: parseInt(prioridade)
        }
        todoList.push(todo);
        return todo;
    }
});


function addTaskInTemplate(todo) {
    console.log(todo);
    let select = document.createElement("select");
    select.className = 'form-control-sm nivel-prioridade2 d-none ';
    for(var i=0; i<4;i++){
        let newOption = document.createElement("option");
        newOption.text = options_values[i];
        newOption.value = i+1;
        if (todo.prioridade == i+1){
            newOption.defaultSelected = 'selected';
        }
        select.appendChild(newOption);
    }
    
    var labelTarefa = `
        <input type="checkbox" id="${todo.id}_ckd" class="task " data-task="${todo.id}" data-obj="NOISAQIO" onchange="handleCheckbox(event);"  ${todo.done ? "checked" : "" }>
        <label class="form-check-label ${todo.done ? "doneTask" : "" }" for="${todo.id}_ckd">${todo.tarefa}</label> ` 

    var inputEdicao =  `  <input type="text" class="d-none inputTextEditarTarefa" value="${todo.tarefa}" data-task="${todo.id}" /> `  
        
        
    var btn_operacoes =  `    
        <button type="button" class="btn btn-danger btn-sm removerTarefa" aria-label="Excluir" onclick="excluirTarefa(${todo.id});"><i class="bi bi-trash-fill"></i> Excluir tarefa</button>
        <button type="button" class="btn btn-info btn-sm editarTarefa" aria-label="Editar" onclick="editarTarefa(${todo.id});"><i class="bi bi-pencil-fill"></i> Editar tarefa</button>
        <button type="button" class="btn btn-success btn-sm salvarTarefa text-end d-none" aria-label="Salvar" onclick="salvarEdicaoTarefa(${todo.id});"><i class="bi bi-check-square-fill"></i> Salvar edição</button>
        <button type="button" class="btn btn-warning btn-sm cancelarEdicaoTarefa d-none" aria-label="Cancelar" onclick="cancelarEdicaoTarefa(${todo.id});"><i class="bi bi-x-square-fill"></i> Cancelar edição</button>
       `    
    //componente_select = document.querySelector('.nivel-prioridade');     
    var li = document.createElement("li");
    li.classList.add('list-group-item', options_values[todo.prioridade-1]);   // add multiple classes
    li.id = todo.id;
    li.innerHTML = labelTarefa;
    li.innerHTML +=inputEdicao;
    li.appendChild(select);
    li.innerHTML+=btn_operacoes;
    todoContainer.appendChild(li);
}

function verificaSeListaEstaVazia() {
    const itensTasks = todoContainer.querySelectorAll("li");
    if (itensTasks.length === 0) {
        $('.alert').show();
    } else {
        $('.alert').hide();
    }
}

function excluirTarefa(id) {
    const confirmacaoExclusaoModal = document.getElementById('staticBackdrop');
    const modalTitle = confirmacaoExclusaoModal.querySelector('.modal-title');
    const modalBody = confirmacaoExclusaoModal.querySelector('.modal-body');
    let el = null;
    let index = -1;
    let data_tarefa = new Date(id);

    for (var i = 0; i < todoList.length; i++) {
        el = todoList[i];
        if (el.id == id) {
            index = i;
            break;
        }
    }
    if (index > -1) {
        var value = `
                <h4>ID:${el.id}</h4>
                <h5>${el.tarefa}</h5>
                <p>Data de criação: ${data_tarefa}</p>
                <p>Concluído: <span class="badge rounded-pill text-bg-dark">${el.done ? 'Sim' : 'Não'}</span></p>
                <p>Prioridade: <span class="badge rounded-pill text-bg-dark">${options_values[el.prioridade-1]}</span></p>
                `
        modalTitle.textContent = `Você deseja realmente excluir a tarefa ${el.tarefa}?`;
        modalBody.innerHTML = value;
        $(confirmacaoExclusaoModal).modal('show');
        $('.confirmation').click(function () {
            $(confirmacaoExclusaoModal).modal('hide');
            modalTitle.textContent = 'Modal title';
            modalBody.innerHTML = '...';
            if (document.getElementById(id)) {
                todoList.splice(index, 1);
                todoContainer.removeChild(document.getElementById(el.id));
                salvarLocalStorage();
                verificaSeListaEstaVazia();
            }
        });
    }
}

function editarTarefa(id) {
    editar_tarefa = document.getElementById(id);
    editar_tarefa.querySelector("label").classList.add("d-none");
    editar_tarefa.querySelector("input[type='text']").classList.remove("d-none");
    editar_tarefa.querySelector(".nivel-prioridade2").classList.remove("d-none");
    editar_tarefa.querySelector(".removerTarefa").classList.add("d-none");
    editar_tarefa.querySelector(".editarTarefa").classList.add("d-none");
    editar_tarefa.querySelector(".salvarTarefa").classList.remove("d-none");
    editar_tarefa.querySelector(".cancelarEdicaoTarefa").classList.remove("d-none");
    editar_tarefa.querySelector("input[type='text']").select();

}

//Permitir que seja salva a edição da tarefa prescionando a tecla ENTER
const inputTextEditarTarefa = document.querySelectorAll('.inputTextEditarTarefa');
inputTextEditarTarefa.forEach(function (element){
    element.addEventListener('keydown', (e) => {
        if (e.keyCode === 13) {            
            salvarEdicaoTarefa(e.target.dataset.task);
        }
    });
});

function salvarEdicaoTarefa(id) {
    tarefa_editada = document.getElementById(id);
    input = editar_tarefa.querySelector("input[type='text']");
    prioridade = tarefa_editada.querySelector('.nivel-prioridade2');     

    let el = null;
    if (!input || input.value.length === 0) {
        alert("Por favor, atualize a sua tarefa!");
        input.focus();
        return false;
    }else {
        for (i = 0; i < todoList.length; i++) {
            el = todoList[i];
            if (el.id == id) break;
        }
        el.tarefa = input.value;
        el.prioridade = parseInt(prioridade.value);
        salvarLocalStorage();
        location.reload(true);
    }
}

function cancelarEdicaoTarefa(id) {
    editar_tarefa = document.getElementById(id);
    editar_tarefa.querySelector("label").classList.remove("d-none");
    editar_tarefa.querySelector("input[type='text']").value = editar_tarefa.querySelector("label").textContent;
    editar_tarefa.querySelector("input[type='text']").classList.add("d-none");
    editar_tarefa.querySelector(".nivel-prioridade2").classList.add("d-none");
    editar_tarefa.querySelector(".removerTarefa").classList.remove("d-none");
    editar_tarefa.querySelector(".editarTarefa").classList.remove("d-none");
    editar_tarefa.querySelector(".salvarTarefa").classList.add("d-none");
    editar_tarefa.querySelector(".cancelarEdicaoTarefa").classList.add("d-none");
}

function handleCheckbox(e) {

    if (e.target.checked) {
        e.target.nextSibling.nextSibling.classList.add("doneTask")
        updateListTask(e);
    } else {
        e.target.nextSibling.nextSibling.classList.remove("doneTask")
        updateListTask(e)
    }
}

function updateListTask(element) {
    for (i = 0; i < todoList.length; i++) {
        el = todoList[i];
        if (el.id == element.target.dataset.task) {
            el.done = !el.done;
            break;
        }
    }
    salvarLocalStorage();
}

function salvarLocalStorage() {
    localStorage.setItem('Lista', JSON.stringify(todoList));
    console.log(JSON.parse(localStorage.getItem('Lista')));
}