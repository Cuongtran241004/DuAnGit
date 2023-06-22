export class ToDoList{
    constructor(){
        //tạo ra 1 mảng các việc cần làm
        this.tdList = [];
    }
    addToDo(todo){
        this.tdList.push(todo);
    }

    //Hàm hiển thị todo lên màn hình
    renderToDo(){
        let content = "";
        //reduceRight: duyệt từ phần tử cuối cùng đến phần tử ban đầu
        content = this.tdList.reduceRight((tdContent, item, index)=>{
            tdContent += `
                <li>
                    <span>${item.textTodo}</span>
                    <div class="buttons">
                        <button class="remove" data-index="${index}" data-status="${item.status}" onclick="deleteToDo(event)">
                            <i class="fa fa-trash-alt"></i>
                        </button>
                        <button class="complete" data-index="${index}" data-status="${item.status}" onclick="completeToDo(event)">
                            <i class="far fa-check-circle"></i>
                            <i class="fas fa-check-circle"></i>
                        </button>
                    </div>
                </li>
            `;
            return tdContent;
        }, '');
        return content;
    }

    //Hàm xóa 1 phần tử trong toDoList
    removeToDo(index){
        //dựa vào index của tdList
        //splice: xóa từ vị trí index và xóa duy nhất 1 phần tử
        this.tdList.splice(index, 1);
    }
    sortToDoList(isDESC){
        //so sánh 2 phần tử liền kề
        this.tdList.sort((todo, nextToDo)=>{
            const textA = todo.textTodo.toLowerCase();
            const textB = nextToDo.textTodo.toLowerCase();
            //hàm localeCompare: so sánh các đối tượng kể cả tiếng việt, tiếng có dấu 
            return textB.localeCompare(textA);
        });
        if(isDESC){
            this.tdList.reverse();
        }
    }

}
