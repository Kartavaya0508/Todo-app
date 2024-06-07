const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if(inputBox.value === '') {
        alert("You must write something!");
    }

    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
    }
}

export default addTask;

    const listContainer = document.getElementById("list-container");
  
    listContainer.addEventListener("click",function(e) {
    if(e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
  }
    else if(e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
  }
  } , false);
  