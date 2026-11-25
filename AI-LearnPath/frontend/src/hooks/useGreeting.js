import { useState, useEffect } from 'react';

export const useGreeting = () => {
  const getGreetingData = () => {
    const now = new Date();
    const hour = now.getHours();
    let greeting;
    if (hour >= 5 && hour < 12) greeting = 'Good Morning';
    else if (hour >= 12 && hour < 17) greeting = 'Good Afternoon';
    else if (hour >= 17 && hour < 21) greeting = 'Good Evening';
    else greeting = 'Good Night';
    
    const timeString = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    return { greeting, timeString, message: 'Your NEET (UG) 2026 preparation journey is active. Master Physics, Chemistry & Biology!' };
  };
  
  const [data, setData] = useState(getGreetingData());
  
  useEffect(() => {
    const interval = setInterval(() => setData(getGreetingData()), 60000);
    return () => clearInterval(interval);
  }, []);
  
  return data;
};
