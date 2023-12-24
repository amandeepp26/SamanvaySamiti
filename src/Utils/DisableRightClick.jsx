// DisableRightClick.js
import React, { useEffect } from "react";

const DisableRightClick = () => {
  useEffect(() => {
    const handleContextMenu = (event) => {
      event.preventDefault();
    };

    // Add event listener when the component mounts
    window.addEventListener("contextmenu", handleContextMenu);

    // Remove event listener when the component unmounts
    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default DisableRightClick;
