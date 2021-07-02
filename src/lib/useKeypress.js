import { useEffect } from "preact/hooks";

const noop = () => {};

const useKeyPress = (targetKey, { onKeyUp = noop, onKeyDown = noop }) => {
  const handler = (callback) => (event) => {
    if (event.key === targetKey) {
      callback(event);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handler(onKeyDown));
    window.addEventListener("keyup", handler(onKeyUp));

    return () => {
      window.removeEventListener("keydown", handler(onKeyDown));
      window.removeEventListener("keyup", handler(onKeyUp));
    };
  }, []);
};

export default useKeyPress;
