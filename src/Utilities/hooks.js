import { useEffect, useRef } from "react";

export default function UseEventListener(eventName, handler, element = window) {
  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isAllowed = element && element.addEventListener;
    if (isAllowed) {
      const eventListener = (event) => savedHandler.current(event);
      element.addEventListener(eventName, eventListener);
      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    } else return;
  }, [eventName, element]);
}
