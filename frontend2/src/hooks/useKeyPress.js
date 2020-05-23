import { useState, useEffect } from 'react';

// Usage
// function App() {
//   // Call our hook for each key that we'd like to monitor
//   const happyPress = useKeyPress('h');
//   const sadPress = useKeyPress('s');
//   const robotPress = useKeyPress('r');
//   const foxPress = useKeyPress('f');
//
//   return (
//     <div>
//       <div>h, s, r, f</div>
//       <div>
//         {happyPress && '😊'}
//         {sadPress && '😢'}
//         {robotPress && '🤖'}
//         {foxPress && '🦊'}
//       </div>
//     </div>
//   );
// }

// Hook
export default function useKeyPress(targetKey) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);

  // If pressed key is our target key then set to true
  function downHandler(e) {
    if (e.key === targetKey && e.target.id === 'newNoteTitle') {
      e.preventDefault();
      setKeyPressed(true);
    }
  }

  // If released key is our target key then set to false
  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  // Add event listeners
  useEffect((e) => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return keyPressed;
}
