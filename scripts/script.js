'use Strict'


//getting the elment value

const inputEl = document.getElementById('todo');
const formEl = document.getElementById('submit-form');
const ceateLi = document.getElementById('todo-list');
const addBtnEl= document.getElementById('btn-submit');

let tasks = [];
let isEditing = false;
let editId = null;


//setting the initial function

function init(){
  
  isEditing = false;
  editId = null;
  addBtnEl.innerText = 'ADD';
}



// uptating the ul element

const updateUl = function(){
  ceateLi.innerHTML= null;
   tasks.forEach((task)=>{
    const taskEl = document.createElement('li');
    taskEl.innerHTML= `<p>${task.taskName}</p><button class="btn-2"onclick = updateItem(${task.id}) ><i class="fa-solid fa-pen-to-square update"></i></button>
     <button class="btn-3" onclick = deleteItem(${task.id})><i class="fa-solid fa-trash delete"></i></button>`;
    ceateLi.appendChild(taskEl);
    
  })
};

// delete function 

const deleteItem = function(id){
  tasks =tasks.filter(task =>{
    return task.id !== id ;
  });
  updateUl();

};
const updateItem = function(id){
  isEditing = true;
  addBtnEl.innerText='UPD';

  // rewrite and uptatinh the element

  const itemToEdit = tasks.find((task)=>{
    return task.id === id;
  });
  
  inputEl.value = itemToEdit.taskName;
  editId = itemToEdit.id;

};




// creathing the addeventlistener to submit 

formEl.addEventListener('submit' , function(event){
  event.preventDefault();

  
  const title = inputEl.value;

  if(isEditing){
    tasks = tasks.map((task)=>{
      if(task.id === editId){
        return{
          id:editId,
          taskName:title,
        };
      }else{
        return task ;
      }
    });

    // initial setting activate
    init();

    // updatating the ul 
    updateUl()

  }else{
    
    // create task object
    const task = {
      // create random id's
      id:Date.now(),
      taskName:title,
    };

    // add task obj to array and push
    tasks.push(task);

   

  }
 
   updateUl(); 
   inputEl.value = null;
  

});