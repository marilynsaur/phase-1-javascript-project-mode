
//This is where the trains loads up on the page
document.addEventListener("DOMContentLoaded", () => {
  //this function adding the trains and fetching them to the DOM

  fetch('http://localhost:3000/trains')
    .then(response => response.json())
    .then(data => {
      console.log(data)

      data.forEach(train => createTrains(train))
    })

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
   
   // trainLoads();

    const totalCount = card.querySelector("p");
    const incrementCount = card.querySelector('.like-btn');
    console.log(incrementCount)
    let count = data.likes;


    const handleIncrement = () => {
      console.log(incrementCount)
      count++;
      totalCount.innerText = `${count} likes!`;
      console.log(count)

    fetch(`http://localhost:3000/trains/${data.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },

      body: JSON.stringify({ likes: count })

    })
      .then(response => response.json())
      .then(likesTrain => createTrains(likesTrain))

  }
  incrementCount.addEventListener("click", handleIncrement);



    // function patchTrains(train) {


    // }
   
  }





  const trainLoads = () => {
    const inputForm = document.querySelector('form');
    const trainContainer = document.querySelector('#train-collection');
    inputForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const input = document.querySelector('p');
      function trainInput(e) {

        function postTrains(train) {
          let trainObj = {
            name: e.target.name.value,
            image: e.target.image.value,
            description: e.target.description.value,
            likes: 0
          }

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

      
          createTrains(trainObj);
        }

        trainContainer.addEventListener('submit', trainInput);





      }

    })

  }












})
