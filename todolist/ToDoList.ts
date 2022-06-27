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
        let dos = this.todos.filter(item => item.done);
        let donts = this.todos.filter(item => !item.done);
        let maxsize = dos.length > donts.length ? dos.length : donts.length;
        let tableSize = this.table.rows.length;
        //Clear Table keep Headrow
        for (let i = 1; i < tableSize; i++) {
            this.table.deleteRow(-1);
        }

        for (let i = 0; i < maxsize; i++) {
            let newRow = this.table.insertRow();
            let newDo = newRow.insertCell(0);
            let newDont = newRow.insertCell(1);
            newDo.innerText = dos[i] ? dos[i].text : "";
            newDo.addEventListener("click", () => this.swapDoneStatus(i, "Done"))
            newDont.innerText = donts[i] ? donts[i].text : "";
            newDont.addEventListener("click", () => this.swapDoneStatus(i, "Not Done"))
        }
    }

    swapDoneStatus(index: number, oldStatus: string) {
        let dos = this.todos.filter(item => item.done);
        let donts = this.todos.filter(item => !item.done);
        if (oldStatus == "Done" && index < dos.length) {
            dos[index].done = false;
        } else if (oldStatus == "Not Done" && index < donts.length) {
            donts[index].done = true;
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
    }

}

new ToDoList();