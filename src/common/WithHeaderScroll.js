import React, { useState, useEffect, useRef } from "react";

export default function WithHeaderScroll(WrappedComponent) {
  function HeaderScroll(props) {
    const headerRef = useRef(null);
    const [scroll, setScroll] = useState(0);
    const [isHeaderFixed, setIsHeaderFixed] = useState(false);

    useEffect(() => {
      function handleScroll() {
        setScroll(window.scrollY);
      }

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

    useEffect(() => {
      if (scroll >= headerRef.current.offsetHeight) {
        setIsHeaderFixed(true);
      } else {
        setIsHeaderFixed(false);
      }
    }, [scroll]);

    return (
      <div
        ref={headerRef}
        className={`header-scroll-wrapper ${isHeaderFixed ? "fixed" : ""}`}
      >
        <WrappedComponent {...props} />
      </div>
    );
  }

  // Set the display name for the component
  HeaderScroll.displayName = `WithHeaderScroll(${getDisplayName(WrappedComponent)})`;

  return HeaderScroll;
}

// Helper function to get the display name of a component
function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}
