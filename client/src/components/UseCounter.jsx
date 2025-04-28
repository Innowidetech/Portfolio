import { useState, useEffect, useRef } from "react";

export default function useCounter({ end, startOnView = false, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);
  const observerRef = useRef(null);
  const hasStarted = useRef(false); // Prevent multiple starts

  useEffect(() => {
    let start = 0;
    const increment = Math.ceil(end / (duration / 50)); // Adjust speed
    let interval = null;

    const updateCounter = () => {
      if (interval) clearInterval(interval);
      interval = setInterval(() => {
        setCount((prev) => {
          if (prev >= end) {
            clearInterval(interval);
            return end;
          }
          return prev + increment;
        });
      }, 50);
    };

    if (startOnView) {
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasStarted.current) {
            hasStarted.current = true;
            updateCounter();
            observerRef.current.disconnect();
          }
        },
        { threshold: 0.5 }
      );

      if (counterRef.current) {
        observerRef.current.observe(counterRef.current);
      }
    } else {
      updateCounter();
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
      if (interval) clearInterval(interval);
    };
  }, [end, startOnView, duration]);

  return { count, counterRef };
}
