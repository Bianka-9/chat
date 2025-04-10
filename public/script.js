// console.log("Helló")
const api= `https://project-01-1125e-default-rtdb.europe-west1.firebasedatabase.app/messages.json`
const send = document.getElementById("send")
const newMessage = document.getElementById("newmessage")
const messages = document.getElementById("messages")


async function sendMessage(){
  const body = {
    user: "Attila",
    date: Date.now(),
    message: newMessage.value
  }

  const reposnse= await fetch(api,{
    method:"POST",
    body: JSON.stringify(body)
  })


  console.log("Status: ",reposnse.status)
  newMessage.value=""
}


async function getMessages(){
  const response= await fetch(api)
  const json = await response.json()
  console.log(json)
  messages.innerHTML=""

  // for (const key in json) {
  
  //     const m = json[key];
  //     const div = document.createElement("div")
  //     div.className="message"
  //     if (m.user=="Attila") {
  //       div.classList.add("mymessage")
  //       m.user="Én"
  //     }
  //     // const date = new Date(m.date).toLocaleString()
  //     const date = new Date(m.date).toLocaleTimeString()
  //     div.innerHTML= `${date} - ${m.user}: ${m.message} `
  //     messages.appendChild(div)      
  //   }  

  const tomb=Object.entries(json)
  // console.log(tomb)

  tomb.forEach( ([_,m])=>{
      console.log(m)
      const div = document.createElement("div")
      div.className="message"
      if (m.user=="Attila") {
        div.classList.add("mymessage")
        m.user="Én"
      }
      const date = new Date(m.date).toLocaleTimeString()
      div.innerHTML= `${date} - ${m.user}: ${m.message} `
      messages.appendChild(div) 
  })

    document.getElementById('alja').scrollIntoView({ behavior: "smooth"})
  }



getMessages()

setInterval(getMessages, 1000)

send.addEventListener('click', sendMessage)