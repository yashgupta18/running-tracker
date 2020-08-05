
const goal=25;

var storedValue ;
    


const entriesWrapper= document.querySelector('#entries')
document.querySelector("#target").innerText=goal;


function getBooksFromLocalStorage(){
    if(localStorage.getItem('user') === null) {
        storedValue = [];
    } else {
        storedValue = JSON.parse(localStorage.getItem('user'));
        storedValue.forEach((li)=>addNewEntry(li));
    calTotal();
    calcAverage();
    weeklyHigh();
    calcGoal();
    }
    

}

function addNewEntry(newEntry){
    entriesWrapper.removeChild(entriesWrapper.firstElementChild);
    const listItem=document.createElement('li')
    const listValue=document.createTextNode(newEntry.toFixed(1))
    listItem.appendChild(listValue)
    entriesWrapper.appendChild(listItem);
    
}

//calculate total running miles
function reducer(total,currentValue){
    return total+currentValue;
}

function calTotal(){
    const totalValue=storedValue.reduce(reducer).toFixed(1);
    document.getElementById('total').innerText=totalValue
    document.getElementById('progressTotal').innerText=totalValue
} 

function calcAverage(){
    const average = (storedValue.reduce(reducer)/storedValue.length).toFixed(1);
    document.getElementById('average').innerText=average
}

//to calculate weekly high distance
function weeklyHigh(){
    const high=Math.max(...storedValue);
    document.getElementById('high').innerText=high;
}

//function to change the progress graph(conic gradient)
function calcGoal(){
    const totalValue=storedValue.reduce(reducer).toFixed(1);
    const completedPercent= totalValue/(goal/100);
    const progressCircle= document.querySelector('#progressCircle'); 
    // console.log(progressCircle)
    if(completedPercent>100) completedPercent===100;
    progressCircle.style.background= `conic-gradient(#70db70 ${completedPercent}% , rgb(74, 118, 129) ${completedPercent}%100%)`;  
}

//when a new user is clicked. Reset the list element.
function newRunner(){
    storedValue=[];
    for (let i = 0; i<7; i++){
        entriesWrapper.children[i].textContent="-"
    }
    lists=document.querySelector("entriesWrapper")
    console.log(lists);
    delete localStorage.user;
    document.getElementById('total').innerText=0;
    document.getElementById('average').innerText=0;
    document.getElementById('high').innerText=0;
    document.getElementById('progressTotal').innerText=0;
    const progressCircle= document.querySelector('#progressCircle'); 
    progressCircle.style.background= `conic-gradient(#70db70 0% , rgb(74, 118, 129) 0%100%)`;
}



function handleSubmit(event){
    event.preventDefault()
    const entry= Number(document.querySelector('#entry').value);
    if(!entry) return;
    document.querySelector('form').reset();
    storedValue.push(entry)
   
    //delete 1st element if array gets >7
    var store=new Array(7);
    store = storedValue;
    if (storedValue.length>7){
        store.shift()
    }

    //set content to local storage array "user"
    localStorage.setItem("user", JSON.stringify(store));
    // var storedValue = JSON.parse(localStorage.getItem("user"));
    

    addNewEntry(entry);
    calTotal();
    calcAverage();
    weeklyHigh();
    calcGoal();
    
    // console.log(entries)
}

const form= document.querySelector('form').addEventListener('submit', handleSubmit);


document.addEventListener('DOMContentLoaded', getBooksFromLocalStorage());












