# Todolist 



## Experimento para usar o indexedDB
Material bacana sobre Localstorage, SessionStorage, IndexedDB  
- <https://medium.com/@lancelyao/browser-storage-local-storage-session-storage-cookie-indexeddb-and-websql-be6721ebe32a>
- <https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB>
- [Dexie](https://dexie.org/)

~~~ javascript
const request = window.indexedDB.open("MyTestDatabase", 3);

var db = new Dexie("MyFriendDB");
    db.version(1).stores({
        friends: '++id,name,age'
    });
    console.log("Using Dexie v" + Dexie.semVer);
    db.open().then(function(){
});
~~~


## TODO
- [X] Quando marcar a tarefas, mudar o status para done para true;
- [X] Remover o espaço quando adicionamos a nova tarefa;
- [X] Criar um estilo e atribuir o estilo do strike da tarefa quando clicado no checkbox;
- [X] Editar tarefa;
- [X] Refatorar o código;
- [X] Uma modal de confirmação se a tarefa vai mesmo ser excluida;
- [X] Formatação CSS (bootstrap);
- [X] Criar uma lista com opções de categoria de priorização da tarefa;
- [X] Melhoria da interface (CSS);