import React, { useEffect } from "react";

interface KeydownCallback {
  (): void;
}

function useKeydown(key: string, callback: KeydownCallback): void {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent): void {
      if (event.code === key) {
        callback();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [key, callback]);
}

export default useKeydown;