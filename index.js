const submitForm = () => {
    const inputForm = document.querySelector('form');
  
    inputForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const input = document.querySelector('p');
  
      console.log(input.value);
  
      fetch('http://localhost:3000/trains')
      .then(response => response.json())
      .then(data => {
        console.log(data)

        data.forEach(train => createTrains(train))
      })

  })
}
  document.addEventListener('DOMContentLoaded', submitForm);
  

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

  
  const totalCount = card.querySelector("p");
  const incrementCount = card.querySelector('.like-btn');
  console.log(incrementCount)
  let count = data.likes;
 

   const handleIncrement = () => {
     console.log(incrementCount)
     count++;
     totalCount.innerText =`${count} likes!`;
     console.log(count)
     

   };
  
  incrementCount.addEventListener("click",handleIncrement);
  }

  const trainContainer = document.querySelector('#train-collection');
 
  function handleSubmit(e) {
    e.preventDefault()

    let trainObj = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    }

    postTrains(trainObj);
    

    createTrains(trainObj);
   
  }
  trainContainer.addEventListener('submit', handleSubmit);


  function postTrains(trainObj) {
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

  }

  function patchTrains(train,count) {
    console.log(toy)
    fetch(`http://localhost:3000/trains/${train.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },

      body: JSON.stringify({likes:count})
      
  })
  .then(response => response.json())
  .then(likesTrain => createTrains(likesTrain))

}


  