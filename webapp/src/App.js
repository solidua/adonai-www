import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase'; 
import Scroll from 'react-scroll'; 

var app = firebase.initializeApp({
    apiKey: "AIzaSyD-4Ubb1WSsSOOvMk-Q8GYyW1q39mnlAnY",
    authDomain: "adonai-f640c.firebaseapp.com",
    databaseURL: "https://adonai-f640c.firebaseio.com",
    projectId: "adonai-f640c",
    storageBucket: "adonai-f640c.appspot.com",
    messagingSenderId: "135726549345"
})

var scroll     = Scroll.animateScroll;

var name  = ''
var phone = ''
var email = ''


const Menu = () => (
  <div className="menu-container animated fadeIn">
    <span onClick={scroll.scrollToBottom}>register</span>
    <span onClick={scroll.scrollToBottom}>donate</span>
  </div>
)

const Banner = () => (
  <div className="banner-container animated fadeIn">
    <h1>ADONAI</h1>
  </div> 
)

const About = () => (
  <div className="about-container">
    <h2>Can we understand the unfathomable love of Jesus Christ?</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</p>
  </div>
)

const Donate = () => (
  <div id="donate" className="donate-container">
    <h1>$15 <span>out of $7,000 goal</span></h1>
    <div className="progress-container">
      <div className="progress-bar"></div>
    </div>
    <h2>3 months left to go</h2>
    <button>Donate!</button>
  </div>
)


const handleSubmit = (event) => {

  firebase.database().ref('campers/').push({
    name: document.getElementById("fullname").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value
  })

  document.getElementById("fullname").value = ''
  document.getElementById("phone").value = ''
  document.getElementById("email").value = ''
  event.preventDefault()
}


const Registration = () => {
  return (
    <div id="registration" className="registration-container">
      <h3>Registration</h3>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>
            Full Name
          </label>
          <input id="fullname" type="text" name="fullname" placeholder="First and last name" required/>
        </div>
        <div className="input-container">
          <label>
            Phone
          </label>
          <input id="phone" type="text" name="phone"  placeholder="###-###-###" required/>
        </div>
        <div className="input-container">
          <label>
            Email
          </label>
          <input id="email" type="email" name="email" placeholder="john.doe@email.com" required/>
        </div>
        <input type="submit" value="Register!" className="btn-register"/>
      </form>
    </div>
  )
}


const App = () => (
  <div className="container">
      <div className="App">
        <Menu/>
        <Banner />
        <About />
        <Donate />
        <Registration />
      </div> 
  </div>
)


export default App;
