class ToDoItem {
    text: string;
    done: boolean;

    constructor(text: string) {
        this.text = text;
        this.done = false;
    }
}

class ToDoList {
    todos: ToDoItem[];
    table: HTMLTableElement;

    constructor() {
        const btn = document.getElementById("inputButton");
        btn.addEventListener("click", () => this.addNewToDo());
        this.table = <HTMLTableElement>document.getElementById("ToDos");
        this.initialLoadToDos();
    }


    initialLoadToDos() {
        let todo = new ToDoItem("FirstItem");
        this.todos = [todo];
        this.loadFromLocalStorage()
        this.updateTable();
    }

    addNewToDo() {
        let input = (<HTMLInputElement>document.getElementById("inputField")).value;
        let toDoItem = new ToDoItem(input);
        this.addToDoItem(toDoItem);
        this.updateTable()
    }

    addToDoItem(input: ToDoItem): void {
        this.todos.push(input);
        this.saveToLocalStorage();
    }

    updateTable(): void {
        let dones = this.todos.filter(item => item.done);
        let notDones = this.todos.filter(item => !item.done);
        let maxTableSize = dones.length > notDones.length ? dones.length : notDones.length;
        let tableSize = this.table.rows.length;
        //Clear table keep table header
        for (let i = 1; i < tableSize; i++) {
            this.table.deleteRow(-1);
        }

        for (let i = 0; i < maxTableSize; i++) {
            let newRow = this.table.insertRow();
            let newDo = newRow.insertCell(0);
            let newDont = newRow.insertCell(1);
            newDo.innerText = dones[i] ? dones[i].text : "";
            newDo.addEventListener("click", () => this.swapDoneStatus(i, "Done"))
            newDont.innerText = notDones[i] ? notDones[i].text : "";
            newDont.addEventListener("click", () => this.swapDoneStatus(i, "Not Done"))
        }
    }

    swapDoneStatus(index: number, oldStatus: string) {
        let dones = this.todos.filter(item => item.done);
        let notDones = this.todos.filter(item => !item.done);
        if (oldStatus == "Done" && index < dones.length) {
            dones[index].done = false;
        } else if (oldStatus == "Not Done" && index < notDones.length) {
            notDones[index].done = true;
        }
        this.saveToLocalStorage();
        this.updateTable();
    }

    saveToLocalStorage(): void {
        let json = JSON.stringify(this.todos);
        localStorage.setItem("todos", json);
    }

    loadFromLocalStorage(): void {
        let json = localStorage.getItem("todos");
        this.todos = JSON.parse(json);
        if (this.todos == null) {
            this.todos = [];
        }
    }

}

new ToDoList();