
//This is where the trains loads up on the page
document.addEventListener("DOMContentLoaded", () => {
  //this function adding the trains and fetching them to the DOM
  
  fetch('http://localhost:3000/trains')
    .then(response => response.json())
    .then(data => {
      console.log(data)

      data.forEach(train => createTrains(train))
    })
// this functions renders the data and puts on the DOM
  function createTrains(data) {
    container = document.querySelector("#train-collection");
    console.log(container)
    let card = document.createElement('div');
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
         </div>
       `
    container.appendChild(card);

    

    //const totalCount = card.querySelector('');
    const incrementCount = card.querySelector('.like-btn');
    console.log(incrementCount)
    let count = data.likes;

  //this function adds the likes and puts on the DOM
    const handleIncrement = () => {
     // console.log(incrementCount)
      count++;
      incrementCount.innerText = `${count} likes!`;
     // console.log(count)

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
  console.log(inputForm)

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
    createTrains(trainObj);

    console.log(trainObj)
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


   
  })



})













