import * as React from 'react';

// Define the type for the button's props
type ButtonProps = {
  count: number,
  onClick: () => void,
  isFocussed: boolean,
  isPrime: boolean,
};

// Create a functional component for the button
const Button: React.FC<ButtonProps> = ({ count, onClick, isFocussed, isPrime }) => (
  <button onClick={onClick} style={{ color: isFocussed ? 'green' : 'red' }}>
    {count} is{isPrime ? '' : ' not'} a prime number
  </button>
);

// Define the type for the prime counter's props
type PrimeCounterProps = {};

// Create a functional component for the prime counter
const PrimeCounter: React.FC<PrimeCounterProps> = () => {
  const [count, setCount] = React.useState<number>(2);
  const [isPrime, setIsPrime] = React.useState<boolean>(false);
  const [isFocussed, setIsFocussed] = React.useState<boolean>(true);
  const ref = React.useRef<boolean>(false);

  const handleFocusChange = React.useCallback(() => {
    setIsFocussed(document.hasFocus());
  }, []);

  React.useEffect(() => {
    // Check if the current number is a prime number
    if (isFocussed && !ref.current) {
      let isPrime = true;
      for (let i = 2; i < count / 2; i++) {
        if (count % i === 0) {
          isPrime = false;
          break;
        }
      }

      setIsPrime(isPrime);
      ref.current = true;

    }
  }, [count, isFocussed]);

  React.useEffect(() => {
    // Add event listeners to the window to track focus changes
    window.addEventListener('blur', handleFocusChange);
    window.addEventListener('focus', handleFocusChange);

    // Return a cleanup function
    return () => {
      window.removeEventListener('blur', handleFocusChange);
      window.removeEventListener('focus', handleFocusChange);
    };
  }, [handleFocusChange]);

  const onClick = React.useMemo(() => () => setCount(count + 1), []);

  return (
    <Button count={count} onClick={onClick} isFocussed={isFocussed} isPrime={isPrime} />
  );
};

export default PrimeCounter;