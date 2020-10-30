console.log('Client side Javascript file is loaded');

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('one')
const messageTwo = document.getElementById('two')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  
  const location = search.value

  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ' '

  fetch(`http://localhost:3000/weather?address=${location}`).then((res) => {

  res.json().then((data) => {
    if(data.error) {
      messageOne.textContent = data.error
      return data.error
    }
    messageOne.textContent = data[0].forecast
    messageTwo.textContent = data[0].location
  })
})
})