//Import lớp đối tượng
import { ToDo } from "./todo.js";
import { ToDoList } from "./todoList.js";

//TodoList có 2 danh sách: todo và complete
let todoList = new ToDoList();
let completeList = new ToDoList();

//Hàm rút gọn cú pháp
const getELE = (id)=>{
    return document.getElementById(id);
}

//Hàm thêm todo
const addToDo = ()=>{
    //nếu không có value thì mình chỉ lấy tới cái thẻ, chưa thể lấy giá trị
    let txtToDo = getELE("newTask").value;
    let ulToDo = getELE("todo");

    if(txtToDo != ""){
        //Tạo một đối tượng toDo - chỉ tạo khi txtToDo != rỗng
        let td = new ToDo(txtToDo, "todo");
        //addToDo(td) - cái addToDo không phải là const addToDo mà nó là 
        //method của ToDoList();
        todoList.addToDo(td);
    } 
    //gọi hàm
    showToDoList(ulToDo);

    //xét ô nhập về giá trị rỗng để người dùng dễ dàng nhập todo tiếp theo
    getELE("newTask").value = "";
}

getELE("addItem").addEventListener("click", ()=>{
    addToDo();
});

//Hàm hiển thị todo lên màn hình
//Khai báo hàm
const showToDoList = (ulToDo)=>{
    ulToDo.innerHTML = todoList.renderToDo();
}

const showCompleteList = (ulCompleted)=>{
    ulCompleted.innerHTML = completeList.renderToDo();
}
//Viết hàm xóa 1 todo
const deleteToDo = (e)=>{
    let tdIndex = e.currentTarget.getAttribute("data-index");
    let tdStatus = e.currentTarget.getAttribute("data-status");
    let ulToDo = getELE("todo");
    let ulCompleted = getELE("completed");

    if(tdStatus == "todo"){
        //Hiển thị lại sau khi đã xóa 1 phần tử
        todoList.removeToDo(tdIndex);
        showToDoList(ulToDo);
    }else if(tdStatus == "completed"){
        completeList.removeToDo(tdIndex);
        showCompleteList(ulCompleted);
    }else{
        alert("Connot delete todo!");
    }
  

}
//Hàm deleteToDo cần phải window vì nó có liên hệ trực tiếp với event onclick của html, nếu khao báo module thì các hàm chỉ sử dụng trong main.js, ngoài ra không còn sử dụng ở đâu được nữa mặc dù ở html đã import script main.js
window.deleteToDo = deleteToDo;

//completeToDo cần phải có index của phần tử đã hoàn thành và phải biết status vì nếu nó ở todo thì chuyển xuống complete, hoặc ngược lại
const completeToDo = (e) =>{
    //nếu để target thì nó hiểu là click vào i
    let tdIndex= e.currentTarget.getAttribute("data-index");
    let tdStatus = e.currentTarget.getAttribute("data-status");
    let ulToDo = getELE("todo");
    let ulCompleted = getELE("completed");

    if(tdStatus == "todo"){
        //Hàm slice: lấy ra phần tử có từ start và < end
        //Hàm splice: xóa, hàm slice: lấy phần tử
        let completedItem = todoList.tdList.slice(tdIndex, tdIndex + 1);
        let objToDo = new ToDo(completedItem[0].textTodo, "completed");
        moveToDo(todoList, completeList, objToDo, tdIndex);
        showToDoList(ulToDo);
        showCompleteList(ulCompleted);
    }else if(tdStatus == "completed"){
        let undoItem = completeList.tdList.slice(tdIndex, tdIndex + 1);
        let objToDo = new ToDo(undoItem[0].textTodo, "todo");
        moveToDo(completeList, todoList, objToDo, tdIndex);
        showToDoList(ulToDo);
        showCompleteList(ulCompleted);
    }else{
        alert("Cannot move todo!")
    }
}
window.completeToDo = completeToDo;

//Hàm di chuyển
const moveToDo = (depart, arrival, obj, tdIndex)=>{
    //Remove todo from depart
    depart.removeToDo(tdIndex);

    //add todo to arrival
    arrival.addToDo(obj);
}
const sortASC = () =>{
    let ulToDo = getELE("todo");
    todoList.sortToDoList(false);
    showToDoList(ulToDo);
}
window.sortASC = sortASC;

const sortDESC = () =>{
    let ulToDo = getELE("todo");
    todoList.sortToDoList(true);
    showToDoList(ulToDo);
}
window.sortDESC = sortDESC;