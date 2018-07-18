import React, { Component } from "react";
import Picker from "./picker";
import Button from "./button";
import Clock from "./clock";
import { relativeTimeThreshold } from "../../../../.cache/typescript/2.8/node_modules/moment";
import ChangeDate from "./changeDate";
import LargeText from './largeText';
import moment from 'moment';


export default class App extends Component {

  constructor(props) {
    super(props)

    this.timer = 0;

    this.state = {
      active: false,
      startDate: moment(),
      timeRemaining: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
      age: 0
    };

    this.handleGenerate = this.handleGenerate.bind(this);
  }

  handleChange = function(date) {
    console.log('APP JS HANDLE CHANGE', date._d)
    clearInterval(this.timer);
  this.setState({
    startDate: date
  });
}.bind(this);


   handleGenerate = function() {
    this.setState({ active: true });


    var bday = this.state.startDate.toDate();
    var today = new Date();
    var currentMonth = today.getMonth();
    var birthMonth = bday.getMonth();

    const monthDay = this.getBirthDate(bday);
    console.log(monthDay);
    var timeBetween = today.getTime() - bday.getTime();
    var daysOld = Math.floor(timeBetween / (1000 * 60 * 60 * 24))
    var age = Number((daysOld/365).toFixed(0))
    this.setState({ 
      age,
     active: true
    })

    if(birthMonth > currentMonth) {
      bday.setFullYear(today.getFullYear())
    } else if(birthMonth < currentMonth) {
      bday.setFullYear(today.getFullYear() + 1)
    } else if(birthMonth == currentMonth) {
      var currentDay = today.getDate();
      var birthDay = bday.getDate();

      if(birthDay > currentDay) {
        bday.setFullYear(today.getFullYear())
      }
      if(birthDay <= currentDay) {
        bday.setFullYear(today.getFullYear() + 1)
      }
    }

   // Set the date we're counting down to
 var countDownDate = bday.getTime();

 // Update the count down every 1 second
  this.timer = setInterval(function() {

   // Get todays date and time
   var now = moment().toDate().getTime();
   
   // Find the distance between now an the count down date
   var distance = countDownDate - now;
   
   // Time calculations for days, hours, minutes and seconds
   var days = Math.floor(distance / (1000 * 60 * 60 * 24));
   var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
   var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
   var seconds = Math.floor((distance % (1000 * 60)) / 1000);
   
   // Output the result in an element with id="demo"
    const time = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
    const timeRemaining = {
        days,
        hours,
        minutes,
        seconds,
      
    }
    this.setState({timeRemaining})

 

    // If the count down is over, write some text 
    if (distance < 0) {
        clearInterval(this.timer);
        // document.getElementById("demo").innerHTML = "EXPIRED";
    }
}.bind(this), 1000);
}.bind(this)

getBirthDate = function(date) {
 const month = date.getMonth() + 1;
 const day = date.getDate();
 if(month < 10) {
  return `0${month}/${day}`
 }
 return `${month}/${day}`
}.bind(this);



  renderItems = function() {
    if(this.state.active) {
      return [
       <Clock key={0} timeRemaining={this.state.timeRemaining} />,
        ChangeDate ('Change Date', () => this.setState({active: false})),
        LargeText(this.getBirthDate(this.state.startDate.toDate())),
        <label key={3} className="grid__remaining">Remaining until you turn {this.state.age} yr(s) old! </label>
      ]
    } else {
      return [
        <Picker key={0} startDate={this.state.startDate} callback={(date) => this.handleChange(date)}/>,
        Button('Generate Countdown', () => this.handleGenerate())
      ]
    }
  }.bind(this)

  

  render() {
    return (
      <div className="grid">
        <h2 className="grid__title">Birthday Countdown </h2>

        <div className="grid__skew-dark-one"> </div>
        <div className="grid__skew-dark-two"> </div>
        <div className="grid__skew-dark-three"> </div>

        <div className="grid__skew-light-one"> </div>
        <div className="grid__skew-light-two"> </div>
        <div className="grid__skew-light-three"> </div>

        
        { this.renderItems() }

      
   
      </div>
    );
  }
}
