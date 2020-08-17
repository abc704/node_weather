



// fetch('http://localhost:3000/weather?address=!').then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//             console.log('error')
//         }
//         else
//        { console.log(data.location)
//         console.log(data.forecast)}
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne= document.querySelector('#messageOne')
const messageTwo= document.querySelector('#messageTwo')
// messageOne.textContent='frpm javascript'
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    messageOne.textContent='loading.....'
    messageTwo.textContent=''
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
       
        if(data.error){
            messageOne.textContent='error'
        }
        else
        messageOne.textContent=data.location
        messageTwo.textContent=data.forecast
    })
})
    console.log(location)
})