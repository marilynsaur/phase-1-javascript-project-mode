
//This is where the trains loads up on the page
document.addEventListener("DOMContentLoaded", () => {
  //this function adding the trains and fetching them to the DOM

  fetch('http://localhost:3000/trains')
    .then(response => response.json())
    .then(trainArray => {

      
      trainArray.forEach(train => createTrains(train))
    
    })
  // this functions renders the data and puts on the DOM
  function createTrains(data) {
    
   
    
    let container = document.querySelector("#train-collection");
    let card = document.createElement('div');
    //card.className("card");
    card.innerHTML =
      `<div class="card">
        <h2 class= "title">${data.name}</h2>
        <img src=${data.image} class="train-avatar" />
        <div class="container">
            <p class="description">${data.description}</p>
            <ul class="list">
              <li><span class="label">${data.list}</li>
            </ul>
            <p class="fact">${data.fact}</p>
           
            <button class="like-btn" id=${data.id}>Like ❤️</button>
            <button class="delete-train">🚂</button>

         </div>
       `
    container.appendChild(card);

    card.querySelector('.delete-train').addEventListener('click',
    () =>{ card.innerHTML=''
    })
   
    const incrementCount = card.querySelector('.like-btn');
    let count = data.likes;

    //this function adds the likes and puts on the DOM
    const handleIncrement = () => {
      count++;
      incrementCount.innerText = `${count} likes!`;

     //this patch updates the likes using the id of the trains
      fetch(`http://localhost:3000/trains/${data.id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },

        body: JSON.stringify({ likes: count })

      })
        .then(response => response.json())
        .then(likesTrain => console.log(likesTrain))

    }
    incrementCount.addEventListener("click", handleIncrement);

  }

  

  //this function is where the user can add their own train on the database and it goes on the dom
  const inputForm = document.querySelector('form');
  inputForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let trainObj = {
      name: event.target.name.value,
      image: event.target.image.value,
      description: event.target.description.value,
      list: event.target.list.value,
      fact: event.target.fact.value,
      likes: 0
    }
   

  //this function updates the server with a new train that the user creates from the form
    fetch('http://localhost:3000/trains', {
      method: 'POST',
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },

      body: JSON.stringify(trainObj)
    })
      .then(response => response.json())
      .then(newTrain => createTrains(newTrain))


    inputForm.reset();
  })



})













