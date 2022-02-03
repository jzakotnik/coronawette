import { useState, useEffect } from "react";

export default function useWindowDimensions() {
  const hasWindow = typeof window !== "undefined";

  function debounce(fn, ms) {
    let timer;
    return (_) => {
      clearTimeout(timer);
      timer = setTimeout((_) => {
        timer = null;
        fn.apply(this, arguments);
      }, ms);
    };
  }

  function getWindowDimensions() {
    const width = hasWindow ? window.innerWidth : 300;
    const height = hasWindow ? window.innerHeight : 300;
    return {
      width,
      height,
    };
  }

  const [windowDimensions, setWindowDimensions] = useState({
    width: 100,
    height: 100,
  });

  useEffect(() => {
    if (hasWindow) {
      setWindowDimensions(getWindowDimensions());

      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [hasWindow]);

  return windowDimensions;
}
/*
const debouncedHandleResize = debounce(function handleResize() {
  setDimensions({
    height: window.innerHeight,
    width: window.innerWidth,
  });
}, 1000);

window.addEventListener("resize", debouncedHandleResize);

return (_) => {
  window.removeEventListener("resize", debouncedHandleResize);
};
*/
