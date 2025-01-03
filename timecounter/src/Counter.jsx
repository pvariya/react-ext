import React, { useEffect, useState } from 'react'

const Counter = () => {
    const [minutes, setMinutes] = useState('');
    const [timeLeft, setTimeLeft] = useState(0);  
    const [isActive, setIsActive] = useState(false);
  
    useEffect(() => {
      let timer;
      if (isActive && timeLeft > 0) {
        timer = setInterval(() => {
          setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);
      } else if (timeLeft === 0) {
        setIsActive(false);
      }
  
      return () => clearInterval(timer);
    }, [isActive, timeLeft]);
  
    const handleStart = () => {
      if (minutes > 0) {
        setTimeLeft(minutes * 60);
        setIsActive(true);
      }
    };
  
    const handleStop = () => {
      setIsActive(false);
    };
  
    const handleReset = () => {
      setIsActive(false);
      setTimeLeft(0);
      setMinutes('');
    };
  
    const formatTime = (seconds) => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60); 
      const remainingSeconds = seconds % 60;    
  
      return `${hours}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };
  
    return (
      <div>
        <h1>Simple Timer</h1>
        <input
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          placeholder="Enter minutes"
        />
        <div>
          <button onClick={handleStart}>Start</button>
          <button onClick={handleStop}>Stop</button>
          <button onClick={handleReset}>Reset</button>
        </div>
        <h2>{formatTime(timeLeft)}</h2>
      </div>
    );
}

export default Counter