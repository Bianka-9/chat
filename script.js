import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyBPKSvahzB95RJP5qZ5e3qyrEfkpevF-FA",
  authDomain: "project-01-1125e.firebaseapp.com",
  databaseURL: "https://project-01-1125e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "project-01-1125e",
  storageBucket: "project-01-1125e.firebasestorage.app",
  messagingSenderId: "707199014527",
  appId: "1:707199014527:web:a0fb541816fc90c2cc114a",
  measurementId: "G-RPC9D24ZZQ"};

const app = initializeApp(firebaseConfig)
const auth = getAuth()
const provider = new GoogleAuthProvider()

// console.log("Helló")
const api= `https://project-01-1125e-default-rtdb.europe-west1.firebasedatabase.app/messages.json`
const send = document.getElementById("send")
const newMessage = document.getElementById("newmessage")
const messages = document.getElementById("messages")
const googleLogin = document.getElementById("googlelogin")
const logOut = document.getElementById("logout")
const userInfo = document.getElementById("userinfo")
const loggedUser= {}

googleLogin.onclick = ()=>{
  signInWithPopup(auth, provider)
} 

logOut.onclick = ()=>{
  signOut(auth)
}

onAuthStateChanged(auth, user =>{
  if(user){
    console.log(user)
    loggedUser.token = user.accessToken
    loggedUser.displayName = user.displayName
    userInfo.innerHTML = user.displayName+"; "+loggedUser.token
  }else{
    userInfo.innerHTML = "Senki sincs belépve"
    loggedUser.token =""
    loggedUser.displayName =""
  }
})


async function sendMessage(){
  const body = {
    user: loggedUser.displayName,
    date: Date.now(),
    message: newMessage.value
  }

  const ujCim=api+ `?auth=${loggedUser.token}`
  console.log(ujCim)
  const reposnse= await fetch(ujCim,{
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
      if (m.user==loggedUser.displayName) {
        div.classList.add("mymessage")
        m.user="Én"
      }
      const date = new Date(m.date).toLocaleTimeString()
      div.innerHTML= `${date} - ${m.user}: ${m.message} `
      messages.appendChild(div) 
  })

    // document.getElementById('alja').scrollIntoView({ behavior: "smooth"})
  }



getMessages()

setInterval(getMessages, 1000)

send.addEventListener('click', sendMessage)