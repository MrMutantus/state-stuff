var ToDoItem = /** @class */ (function () {
    function ToDoItem(text) {
        this.text = text;
        this.done = false;
    }
    return ToDoItem;
}());
var ToDoList = /** @class */ (function () {
    function ToDoList() {
        var _this = this;
        var btn = document.getElementById("inputButton");
        btn.addEventListener("click", function () { return _this.addNewToDo(); });
        this.table = document.getElementById("ToDos");
        this.initialLoadToDos();
    }
    ToDoList.prototype.initialLoadToDos = function () {
        this.loadFromLocalStorage();
        this.updateTable();
    };
    ToDoList.prototype.addNewToDo = function () {
        var input = document.getElementById("inputField").value;
        var toDoItem = new ToDoItem(input);
        this.addToDoItem(toDoItem);
        this.updateTable();
    };
    ToDoList.prototype.addToDoItem = function (input) {
        this.todos.push(input);
        this.saveToLocalStorage();
    };
    ToDoList.prototype.updateTable = function () {
        var _this = this;
        var dones = this.todos.filter(function (item) { return item.done; });
        var notDones = this.todos.filter(function (item) { return !item.done; });
        var maxTableSize = dones.length > notDones.length ? dones.length : notDones.length;
        var tableSize = this.table.rows.length;
        //Clear table keep table header
        for (var i = 1; i < tableSize; i++) {
            this.table.deleteRow(-1);
        }
        var _loop_1 = function (i) {
            var newRow = this_1.table.insertRow();
            var newDo = newRow.insertCell(0);
            var newDont = newRow.insertCell(1);
            newDo.innerText = dones[i] ? dones[i].text : "";
            newDo.addEventListener("click", function () { return _this.swapDoneStatus(i, "Done"); });
            newDont.innerText = notDones[i] ? notDones[i].text : "";
            newDont.addEventListener("click", function () { return _this.swapDoneStatus(i, "Not Done"); });
        };
        var this_1 = this;
        for (var i = 0; i < maxTableSize; i++) {
            _loop_1(i);
        }
    };
    ToDoList.prototype.swapDoneStatus = function (index, oldStatus) {
        var dones = this.todos.filter(function (item) { return item.done; });
        var notDones = this.todos.filter(function (item) { return !item.done; });
        if (oldStatus == "Done" && index < dones.length) {
            dones[index].done = false;
        }
        else if (oldStatus == "Not Done" && index < notDones.length) {
            notDones[index].done = true;
        }
        this.saveToLocalStorage();
        this.updateTable();
    };
    ToDoList.prototype.saveToLocalStorage = function () {
        var json = JSON.stringify(this.todos);
        localStorage.setItem("todos", json);
    };
    ToDoList.prototype.loadFromLocalStorage = function () {
        var json = localStorage.getItem("todos");
        this.todos = JSON.parse(json);
        if (this.todos == null) {
            this.todos = [];
        }
    };
    return ToDoList;
}());
new ToDoList();
