// src/components/Timer.jsx
import React, { useState, useEffect, useRef } from 'react';
import alertSound from '../assets/alert.mp3'; // Đặt file mp3 ở src/assets/

const Timer = ({ workMinutes, breakMinutes, onSessionComplete }) => {
  const [secondsLeft, setSecondsLeft] = useState(workMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('work');
  const intervalRef = useRef(null);
  const audioRef = useRef(new Audio(alertSound));

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev === 1) {
            clearInterval(intervalRef.current);
            audioRef.current.play();
            const nextMode = mode === 'work' ? 'break' : 'work';
            const nextTime = nextMode === 'work' ? workMinutes * 60 : breakMinutes * 60;
            onSessionComplete(mode);
            setMode(nextMode);
            setSecondsLeft(nextTime);
            return nextTime;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, mode]);

  // ... giống phần còn lại như phiên bản gốc
};

export default Timer;
