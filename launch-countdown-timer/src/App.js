import './App.css';
import  React,{ useEffect, useState } from 'react';

function useInterval(callback, delay){
  const savedCallback = React.useRef();

  React.useEffect(()=>{
    savedCallback.current = callback;
  });

  React.useEffect(()=>{
    function tick(){
      savedCallback.current();
    }

    const timerId = setInterval(tick, delay);
    return ()=>{clearInterval(timerId);}
  },[delay])
}

const Card = ({time, title})=>{
  return(
    <div className="time-card">
            <div className="time-card__flipper">
              <div className="time-card__top"></div>
              {time>10 ? time : `0${time}`}
            </div>
            <div className="time-card__title">{title}</div>
  </div>
  )
}

function App() {
  
  const [days,setDay] = useState(8);
  const [hours,setHours] = useState(23);
  const [minutes,setMinutes] = useState(60);
  const [seconds,setSeconds] = useState(60);

  const cards = document.getElementsByClassName('time-card__flipper');

  const animate = (card) => {
    setTimeout(()=>cards[card].classList.remove('animate-card'),500);
    cards[card].classList.toggle('animate-card'); 
  }

  const runTime = () => {
    setSeconds(seconds-1);
    animate(3);
      if(seconds===0){
        setMinutes(minutes-1);
        setSeconds(60);

        animate(2);

        if(minutes===0){
          setHours(hours-1);
          setMinutes(60);
          animate(1);
          if(hours===0){
            setDay(days-1);
            setHours(24);
            animate(0);
          }
        }
      }
    
  }

  useInterval(runTime, 1000)

  useEffect(()=>{
   
     return function cleanup(){
       console.log('unmounting component')
     }
  },[])

  return (
    <div className="wrapper">
      <div className="stars-container">
      <div className="background__stars"></div>
      <div className="background__stars move"></div>
      </div>
        <div className="container">
          <h1>We're Launching Soon</h1>

        <div className="clock">
          <Card time={days} title="Days" />
          <Card time={hours} title="Hours" />
          <Card time={minutes} title="Minutes" />
          <Card time={seconds} title="Seconds" />
        </div>
          
          <div className="social-media">
            <div className="social-media__link"></div>
            <div className="social-media__link"></div>
            <div className="social-media__link"></div>
          </div>
        </div>
        <div className="background__sky"></div>
    </div>
  );
}

export default App;
