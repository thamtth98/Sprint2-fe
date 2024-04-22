import React, { useState, useEffect } from 'react';

function CountdownTimer({ targetDate }) {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const addLeadingZero = (value) => {
    return value < 10 ? `0${value}` : value;
  };

  return (
    <div style={{ fontSize: '24px', color: 'red', fontWeight: 'bold' }}>
      {timeLeft.hours > 0 && (
        <>
          <span>{addLeadingZero(timeLeft.hours)}</span> :
        </>
      )}
      <span>{addLeadingZero(timeLeft.minutes)}</span> :
      <span>{addLeadingZero(timeLeft.seconds)}</span>
    </div>
  );
}

export default CountdownTimer;
