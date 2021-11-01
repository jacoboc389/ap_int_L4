
var taskInput = document.getElementById("new-task");

var taskInput2 = document.getElementById("new-task2");

var taskInput3 = document.getElementById("new-task3");

var addButton = document.getElementsByTagName("button")[0]; 
// first button // <button>Add</button>

var incompleteTaskHolder = document.getElementById("incomplete-tasks");
// ul of #incomplete-tasks // <ul id="incomplete-tasks">

var completedTasksHolder = document.getElementById("completed-tasks");
// ul of #completed-tasks // <ul id="completed-tasks">

var li_counter = 0; // DO ZMIANY W PRZYSZŁOŚCI ! - ta zmienna powinna przechowywać AKTUALNĄ LICZBĘ ELEMENTÓW LISTY (pobrać ją z listy ul ...)

function clear_input()
{
	taskInput.value="";
	taskInput2.value="";
	taskInput3.value="";
}

const todoForm = document.querySelector('.todo-form');

const todoInput = document.querySelector('.todo-input');

const todoItemsList = document.querySelector('.todo-items');

// array which stores every todos
let todos = [];
let li_counter__ = 0;

/*
This array is going to hold all our todo items. 
Each item is going to be a Javascript Object like below:

const toto = {
	id: Date.now(),
	name: "Buy Milk",
	completed: false
};

! It has an ID, NAME, and COMPLETED status.
*/

// The next thing we need to do is, whenever the user types a new todo into the <input> box, we are going to take that value and make an object similar to above and push it into the todos array :


todoForm.addEventListener('submit', function(event)
{ 
  event.preventDefault();
  
  if(validate_form(taskInput.value, taskInput2.value, taskInput3.value) == 0)
  {	  
	  return 0;
  }
  else
  {
	  addTodo(taskInput.value, taskInput2.value, taskInput3.value); // call addTodo function with input box current value
  }
    
});

/*
This is going to listen to a submit event on the form. Whenever that happens, the page will reload. So to stop that we call event.preventDefault(). Then pass the value the user typed to addTodo() function. We can get the value the user typed from todoInput.value. Remember todoInput is the actual input box.
*/


function addTodo(item, item2, item3) 
{
  if (item !== '') 
  {    
    var todo = {
      id: Date.now(),
      name: item,
      name2: item2,
      name3: item3,
      completed: false
    };
	
    todos.push(todo);
    addToLocalStorage(todos); //przedtem: renderTodos(todos); // then renders them between <ul>
    //addToLocalStorage_(li_counter__); //przedtem: renderTodos(todos); // then renders them between <ul>

    // finally clear the input box value
    todoInput.value = '';
	
	 li_counter__ += 1;
	addToLocalStorage_(li_counter__);
	
  }
}


function addToLocalStorage(todos)
{  
  localStorage.setItem('todos', JSON.stringify(todos));
    
  renderTodos(todos);
 
  //li_counter__ += 1;
}

function addToLocalStorage_(li_counter__)
{  
  localStorage.setItem('li_counter__', JSON.stringify(li_counter__));
  // render them to screen
  
  //renderTodos(todos);  
}

function renderTodos(todos) 
{  
  todoItemsList.innerHTML = '';
 
  todos.forEach(function(item) 
  {		
    const li = document.createElement('li');
    
    li.setAttribute('class', 'item');
   
    li.setAttribute('data-key', item.id);
    /* <li class="item" data-key="20200708"> 
          <input type="checkbox" class="checkbox">
          Go to Gym
          <button class="delete-button">X</button>
        </li> */
    // if item is completed, then add a class to <li> called 'checked', which will add line-through style
    //if (item.completed === true) {
     // li.classList.add('checked');
   // }

    /*li.innerHTML = `
      <input type="checkbox" class="checkbox" ${checked}>
      ${item.name}
      <button class="delete-button">X</button>
    `;*/
	
	///////////////////////////////////////////////////////////////
	//var listItem = document.createElement("li");

	// input (checkbox)
	var checkBox = document.createElement("input");//checkbx
	var a_ = document.createElement("a");//checkbx
	
	// label
	var label = document.createElement("label");//label
	var label2 = document.createElement("label");//label
	var label3 = document.createElement("label");//label
	
		// input (text)
		var editInput = document.createElement("input");//text
		var editInput2 = document.createElement("input");//text
		var editInput3 = document.createElement("input");//text
	
	// button.edit
	var editButton = document.createElement("button");//edit button	

	//button.delete
	var deleteButton = document.createElement("button");//delete button

	label.innerText = item.name;
	label2.innerText = item.name2;
	label3.innerText = item.name3;
	
	//alert("label.innerText =" + label.innerText);
	
	//label.innerText = taskString;
	//label2.innerText = taskString2;
	//label3.innerText = taskString3;	
	
		label.id = "label_1";
		label2.id = "label_2";
		label3.id = "label_3";

	//Each elements, needs appending
	//checkBox.type = "checkbox";
	
	editInput.type = "text";
	editInput2.type = "text";
	editInput3.type = "date";
	
	editInput.id = "editInput_1";
	editInput2.id = "editInput_2";
	editInput3.id = "editInput_3";
	//editInput2.type = "text";

		editButton.innerText = "Edit";//innerText encodes special characters, HTML does not.
		editButton.className = "edit";
		deleteButton.innerText = "Delete";
		deleteButton.className = "delete";

	//listItem.className = li_counter;

	//and appending.
	//li.appendChild(checkBox);
	li.appendChild(a_);
	
	a_.appendChild(label);
	a_.appendChild(label2);
	a_.appendChild(label3);
	a_.appendChild(editInput);
	a_.appendChild(editInput2);
	a_.appendChild(editInput3);
	
	li.appendChild(editButton);
	li.appendChild(deleteButton);	
	///////////////////////////////////////////////////////////////	
	
	// TO CO JEST WEWNĄTRZ ELEMENTU LISTY : (li)	
	/*li.innerHTML = `
      <input type="text" class="checkbox" >
      ${item.name}
     
    `;*/	
	
    // finally add the <li> to the <ul>
    todoItemsList.append(li);
	
	bindTaskEvents(li, taskCompleted);		
	
  });

}

var createNewTaskElement = function(taskString, taskString2, taskString3)
{
	var listItem = document.createElement("li");	

	// input (checkbox)
	var checkBox = document.createElement("input");//checkbx
	var a_ = document.createElement("a");//checkbx
	
	// label
	var label = document.createElement("label");//label
	var label2 = document.createElement("label");//label
	var label3 = document.createElement("label");//label
	
		// input (text)
		var editInput = document.createElement("input");//text
		var editInput2 = document.createElement("input");//text
		var editInput3 = document.createElement("input");//text
	
	// button.edit
	var editButton = document.createElement("button");//edit button	

	//button.delete
	var deleteButton = document.createElement("button");//delete button

	label.innerText = taskString;
	label2.innerText = taskString2;
	label3.innerText = taskString3;

		label.id = "label_1";
		label2.id = "label_2";
		label3.id = "label_3";

	//Each elements, needs appending
	checkBox.type = "checkbox";
	
	editInput.type = "text";
	editInput2.type = "text";
	editInput3.type = "date";
	
	editInput.id = "editInput_1";
	editInput2.id = "editInput_2";
	editInput3.id = "editInput_3";
	//editInput2.type = "text";

		editButton.innerText = "Edit";//innerText encodes special characters, HTML does not.
		editButton.className = "edit";
		deleteButton.innerText = "Delete";
		deleteButton.className = "delete";

	//listItem.className = li_counter;

	//and appending.
	listItem.appendChild(checkBox);
	listItem.appendChild(a_);
	
	a_.appendChild(label);
	a_.appendChild(label2);
	a_.appendChild(label3);
	a_.appendChild(editInput);
	a_.appendChild(editInput2);
	a_.appendChild(editInput3);
	
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);
	
	return listItem; //li
}

function validate_form(i1, i2, i3)
{	
	if(i1.length != 3)
	{
		alert ("Pole kod musi mieć dokładnie 3 znaki !");
			
		return 0;
	}
	 
	let pattern = /[0-9][0-9]/;
	let result = i1.match(pattern);
	var first_char = i1.charAt(0);
	  
		// document.write(first_char);
	  
	if(first_char != first_char.toUpperCase())
	{
		alert (" pierwsza litera powinna być duża !");
			
		return 0;
	}
		
	//document.write(first_char);
		
	if(!(isNaN(first_char)))
	{
		alert (" pierwszy znak w polu Kod nie może być liczbą !");
			
		return 0;
	}
		
	if(result == null)
	{
		alert ("to nie jest liczba !");
			
		return 0;
	}	  
		
	if((i2.length < 3) || (i2.length > 255))
	{
		alert ("Pole Zadanie musi miec conajmniej 3 znaki, i nie więcej niż 255 !");
			
		return 0;
	}
	  
	var date = new Date();
	var today = date.toLocaleDateString("en-US");
		
	var day = date.getDate();
	var month = date.getMonth()+1;
	var year = date.getFullYear();		
	  
		//alert (today);
		//alert (inputValue3);
	var check_date = year+"-"+month+"-"+day;
	  
		//alert(check_date);
	  
					/*
					function odliczanie()
				{
					var dzisiaj = new Date();
					
					var dzien = dzisiaj.getDate();
					var miesiac = dzisiaj.getMonth()+1;
					var rok = dzisiaj.getFullYear();
					
					var godzina = dzisiaj.getHours();
					if (godzina<10) godzina = "0"+godzina;
					
					var minuta = dzisiaj.getMinutes();
					if (minuta<10) minuta = "0"+minuta;
					
					var sekunda = dzisiaj.getSeconds();
					if (sekunda<10) sekunda = "0"+sekunda;
					
					document.getElementById("zegar").innerHTML = 
					 dzien+"/"+miesiac+"/"+rok+" | "+godzina+":"+minuta+":"+sekunda;
					 
					 setTimeout("odliczanie()",1000);
				}
		
		*/  
	//alert(taskInput3.value);	
	//alert(check_date);		
		
	if(i3 != "")
	{
		if(i3 < check_date)
		{
			alert ("Zła data!");
			
			return 0;
		}
	}
}

var addTask = function()
{
	console.log("Add Task...");	

	if(validate_form(taskInput.value, taskInput2.value, taskInput3.value) == 0)
	{
		return 0;	
	}
	else
	{		
		//li_counter += 1;
		//alert(li_counter);
		//Create a new list item with the text from the #new-task:
		
	var listItem = createNewTaskElement(taskInput.value, taskInput2.value, taskInput3.value);
	//var listItem2 = createNewTaskElement(taskInput2.value);

	//Append listItem to incompleteTaskHolder
	incompleteTaskHolder.appendChild(listItem); // TUTAJ COŚ ZMIENIĆ ! 
	//incompleteTaskHolder.appendChild(listItem2);
	
	bindTaskEvents(listItem, taskCompleted);

	//taskInput.value="";
	}
}

function changeColor(element, color)
{
			document.getElementById(element).style.color = color
			setTimeout(function(){ changeColor(element, '#000') }, 5000)
}

//Edit an existing task.

function search_task()
{
	//taskInput
	//taskInput2
	//taskInput3	
	
	input = taskInput;
	input2 = taskInput2;
	input3 = taskInput3;
	
	if(validate_form(input.value, input2.value, input3.value) == 0)
	{
		alert("Błędne dane !");
		return 0;	
	}
	else
	{
		ul_ = document.getElementById("incomplete-tasks");	
	
		li = ul_.getElementsByTagName("li");
		li__ = document.querySelectorAll('li.item');
		
		filter = input.value.toUpperCase();
		filter2 = input2.value.toUpperCase();
		filter3 = input3.value.toUpperCase();				
		
		//console.log(ul_);
		//console.log(li);
		//console.log(li__);
		//console.log(filter);	

		//console.log(ul_.textContent);
		//console.log(li.textContent);
			//console.log(filter);			
		
		var original = ul_.style.background;		
		
		//alert('org color = ' + li[0].style.background);		
		
		//originalColor = $el.css("background");		
		
		var originalColor = "#333";
		// get from local storage .... 
		//alert(li_counter__);
		
		if(li__)
		{
			for(var j = 0; j<li_counter__; j++)
			{			
				a = li[j].getElementsByTagName("a")[0];			
				
				//console.log("a = " + a);
				//console.log("j = " + j);
				
				txtValue = a.textContent;
			   
				//alert(txtValue);
				//console.log("txtValue = " + txtValue);
				
				//console.log(txtValue);
				//console.log(txtValue.toUpperCase().indexOf(filter) );
				
				if ((txtValue.toUpperCase().indexOf(filter) > -1) && (txtValue.toUpperCase().indexOf(filter2) > -1) && (txtValue.toUpperCase().indexOf(filter3) > -1))
				{
					//if (j == 0) 
					//{
					//	alert('Ten element znajduje się na liście!');
					//}
					
					//alert(li[i].innerText);
					
					//li[i].style.background = 'lightblue';			
					
					/*var prevColor = li[i].style.background;
					li[i].style.color = '#222222';
					li[i].style.background ='red';
					setTimeout(function(){
						ul_.style.background = 'blue';
					}, 1000); //5 seconds*/
					
					 li[j].style.background = 'green';		
					
					setInterval(
					function () {
					  //var randomColor = Math.floor(Math.random()*16777215).toString(16);
					  li[j].style.background = '#91a2bd';			  
					  
					},500);
					
					break;
					
				}
			}
		}
	}	
}
	
	

var editTask = function()
{
console.log("Edit Task...");
console.log("Change 'edit' to 'save'");

//validate_form();	

var listItem = this.parentNode;

var editInput = listItem.querySelector('input[id=editInput_1]');
var editInput2 = listItem.querySelector('input[id=editInput_2]');
var editInput3 = listItem.querySelector('input[id=editInput_3]');
var label = listItem.querySelector("label[id=label_1]");
var label2 = listItem.querySelector("label[id=label_2]");
var label3 = listItem.querySelector("label[id=label_3]");

//if(validate_form(editInput.value, editInput2.value, editInput3.value) == 0)
//{
//	  return 0;	
//}
	var containsClass = listItem.classList.contains("editMode");
		//If class of the parent is .editmode
		if(containsClass)
		{

		//switch to .editmode
		//label becomes the inputs value.
		
			if(validate_form(editInput.value, editInput2.value, editInput3.value) == 0)
			{					
					return 0;	
			}			
			else
			{
				label.innerText=editInput.value;
				//addToLocalStorage(todos);
				//deleteTodo(listItem.getAttribute('data-key'));
				
				label2.innerText=editInput2.value;
				label3.innerText=editInput3.value;
			
				//var editTask = function(){
	
				//li_counter -= 1;
				//console.log("Edit Task...");

				//var listItem = this.parentNode;
				//var ul=listItem.parentNode;
				//Remove the parent list item from the ul.
				//ul.removeChild(listItem);
				
				//alert("li - this.id =" + listItem.getAttribute('data-key'));
				//alert("li - this.id =" + listItem.getAttribute('data-key'));
				editTodo(listItem.getAttribute('data-key'), editInput.value, editInput2.value, editInput3.value);			
			}				
		}		
		else		
		{
			if(validate_form(label.innerText, label2.innerText, label3.innerTexte) == 0)
			{				
					return 0;	
			}
			else
			{
				editInput.value=label.innerText;
				editInput2.value=label2.innerText;
				editInput3.value=label3.innerText;
			}			
		}

		//toggle .editmode on the parent.
		listItem.classList.toggle("editMode");
}

function searchTask()
{
console.log("Search task...");
alert(taskInput.value);
alert(taskInput2.value);
alert(taskInput3.value);

	//var listItem = this.parentNode;

/*const ul_ = document.getElementById('incomplete-tasks');
var ul_2 = document.getElementById('incomplete-tasks').getElementsByTagName('li').value;

const listItems_ = ul_.getElementsByTagName('li');

var var_2 = document.querySelector('label[id=label_1]');

//var var_1 = listItems_.querySelector('label[id=label_1]');

alert("list item length = " + listItems_.length);
alert(" var_1 = " + var_2);
alert(" ul_2 = " + ul_2);


for (let i = 0; i <= listItems_.length - 1; i++) {
    console.log (listItems_[i]);
}

console.log (listItems_[0].value);*/

var var_1 = document.getElementById('label_1');
var var_2 = document.getElementById('label_2');
var var_3 = document.getElementById('label_3');


	var var_array = [var_1, var_2, var_3];

alert('var_1' + var_array[0].innerHTML);
alert('var_2' + var_array[1].innerHTML);
alert('var_3' + var_array[2].innerHTML);



var ul_ = document.getElementById('incomplete-tasks');

var listItems_ = ul_.getElementsByTagName('li');

alert('taskInput = ' + taskInput.value);
alert('var_1.innerHTML = ' + var_1.innerHTML);

for (let i = 0; i <= listItems_.length - 1; i++)
	{
	
		//var var_1 = listItems_[i].getElementById('label_1');
	//alert('var_1.innerHTML = ' + var_1.innerHTML);
	
	for (let j = 0; j < 3; j++) 
	{
	
		//var var_1 = listItems_[i].getElementById('label_1');
	//alert('var_1.innerHTML = ' + var_1.innerHTML);
	
	//alert(var_array[j].innerHTML);
	
	
	if(taskInput.value == var_array[i].innerHTML)
	{
		alert("Na liscie jest taki element!");
	}
	
    console.log (listItems_[i]);
	}
	
	// https://code-boxx.com/filter-search-list-in-javascript/
	
	
	// https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_filter_list
	
	//alert(var_array[i].innerHTML);
	
	
	if(taskInput.value == var_array[i].innerHTML)
	{
		alert("Na liscie jest taki element!");
	}
	
    console.log (listItems_[i]);
}

for (let i = 0; i <= listItems_.length - 1; i++) {
    console.log (listItems_[i]);
}


//alert(" var_1 = " + var_1);
//alert(" var_2 = " + var_2);
//alert(" var_3 = " + var_3);


console.log (var_1.innerHTML);
console.log (var_2.innerHTML);
console.log (var_3.innerHTML);


var ul__ = document.getElementById('incomplete-tasks');

for(var i=0;i<ul__.length;i++){
   var listItems__ = ul_.getElementsByTagName('li');
    for(var j=0;j<lis.length;j++){
        console.log(listItems__[j].innerHTML);
    }
}

/*
var listItem = this.parentNode;

var editInput = listItem.querySelector('input[id=editInput_1]');
var editInput2 = listItem.querySelector('input[id=editInput_2]');
var editInput3 = listItem.querySelector('input[id=editInput_3]');
var label = listItem.querySelector("label[id=label_1]");
var label2 = listItem.querySelector("label[id=label_2]");
var label3 = listItem.querySelector("label[id=label_3]");


//if(validate_form(editInput.value, editInput2.value, editInput3.value) == 0)
//{
//	  return 0;	
//}

	var containsClass = listItem.classList.contains("editMode");
		//If class of the parent is .editmode
		if(containsClass)
		{

		//switch to .editmode
		//label becomes the inputs value.
		
			if(validate_form(editInput.value, editInput2.value, editInput3.value) == 0)
			{					
					return 0;	
			}			
			else
			{
				label.innerText=editInput.value;
				label2.innerText=editInput2.value;
				label3.innerText=editInput3.value;
			}				
		}		
		else		
		{
			if(validate_form(label.innerText, label2.innerText, label3.innerTexte) == 0)
			{				
					return 0;	
			}
			else
			{
				editInput.value=label.innerText;
				editInput2.value=label2.innerText;
				editInput3.value=label3.innerText;
			}			
		}

		//toggle .editmode on the parent.
		listItem.classList.toggle("editMode");*/
}

// https://www.encodedna.com/javascript/how-to-get-all-li-elements-in-ul-using-javascript.htm

//var label2 = listItem.querySelector("label2");

//Delete task.
var deleteTask=function()
{		
		console.log("Delete Task...");

		var listItem = this.parentNode;
		var ul = listItem.parentNode;
		//Remove the parent list item from the ul.
		ul.removeChild(listItem);
		
		//alert("li - this.id =" + listItem.getAttribute('data-key'));
		
		deleteTodo(listItem.getAttribute('data-key'));
		
		//li_counter -= 1;
}

/*function deleteTodo(id) {
  // filters out the <li> with the id and updates the todos array
  todos = todos.filter(function(item) {
    // use != not !==, because here types are different. One is number and other is string
    return item.id != id;
  });

  // update the localStorage
  addToLocalStorage(todos);
}*/

function getFromLocalStorage() 
{
  const reference = localStorage.getItem('todos');
  // if reference exists
  if (reference) {
    // converts back to array and store it in todos array
    todos = JSON.parse(reference); // The JSON.parse() used here is to convert the stringified array back into a real array. The rest is self-explanatory.
    renderTodos(todos);
  }
}

function getFromLocalStorage_()
{
  const reference = localStorage.getItem('li_counter__');
  // if reference exists
  if (reference) {
    // converts back to array and store it in todos array
    
	li_counter__ = JSON.parse(reference); 
	//li_counter__ = reference;	
  }
}

// deletes a todo from todos array, then updates localstorage and renders updated list to screen
function deleteTodo(id) 
{
  // filters out the <li> with the id and updates the todos array
  todos = todos.filter(function(item) {
    // use != not !==, because here types are different. One is number and other is string
    return item.id != id;
  });

  // update the localStorage
  addToLocalStorage(todos);
  
  li_counter__ -= 1;
  addToLocalStorage_(li_counter__);  
}

function editTodo(id, editInput, editInput2, editInput3) 
{
	todos_ = todos.filter(function(item) {
		// use != not !==, because here types are different. One is number and other is string
		return item.id == id;
	  });
	  
	console.log(todos_);  
	//alert("todos = " + todos);
	//console.log(todos[0].id); // todos to TEN OBIEKT o tym ID, który chcemy EDYTOWAĆ
	//console.log(todos[1].id); // todos to TEN OBIEKT o tym ID, który chcemy EDYTOWAĆ
	//console.log(todos[0].id); // todos to TEN OBIEKT o tym ID, który chcemy EDYTOWAĆ
	//console.log(todos[0].id); // todos to TEN OBIEKT o tym ID, który chcemy EDYTOWAĆ
	
	todos_.id = todos_.id;
	todos_[0].name = editInput;
	todos_[0].name2 = editInput2;
	todos_[0].name3 = editInput3;
	todos_[0].completed = todos_[0].completed;
	
	addToLocalStorage(todos);	
}

//Mark task completed
var taskCompleted=function()
{
		//console.log("Complete Task...");	
	var listItem=this.parentNode;
	completedTasksHolder.appendChild(listItem);
				bindTaskEvents(listItem, taskIncomplete);
}


var taskIncomplete=function()
{
		//console.log("Incomplete Task...");	
			var listItem=this.parentNode;
		incompleteTaskHolder.appendChild(listItem);
				bindTaskEvents(listItem,taskCompleted);
}

var ajaxRequest=function()
{
	//console.log("AJAX Request");
}


//Set the click handler to the addTask function.
addButton.onclick=addTask;
//addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);

var bindTaskEvents = function(taskListItem,checkBoxEventHandler)
{
	//console.log("bind list item events");
//select ListItems children
	var checkBox=taskListItem.querySelector("input[type=checkbox]");
	var editButton=taskListItem.querySelector("button.edit");
	var deleteButton=taskListItem.querySelector("button.delete");


			//Bind editTask to edit button.
			editButton.onclick=editTask;
			//Bind deleteTask to delete button.
			deleteButton.onclick=deleteTask;
			//Bind taskCompleted to checkBoxEventHandler.
			//checkBox.onchange=checkBoxEventHandler;
}

getFromLocalStorage();
getFromLocalStorage_();