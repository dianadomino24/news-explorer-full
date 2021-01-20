import React from 'react';
import './Button.css';

function Button({
  onClick,
  onMouseEnter,
  onMouseLeave,
  disabled = false,
  forwardedRef,
  children,
  buttonClasses,
}) {
  return (
        <button
            className={`button ${buttonClasses}`}
            ref={forwardedRef}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            disabled={disabled}
        >
            {children}
        </button>
  );
}

export default Button;
