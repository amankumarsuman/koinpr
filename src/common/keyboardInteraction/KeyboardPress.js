import { useEffect, useRef } from "react";

function Usekey(key, callback) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    function handleEnterKey(event) {
      if (event.code === key) {
        callbackRef.current(event);
      }
    }

    document.addEventListener("keypress", handleEnterKey);
    return () => document.removeEventListener("keypress", handleEnterKey);
  }, [key]);
}

export { Usekey };
