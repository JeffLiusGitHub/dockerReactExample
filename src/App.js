import * as React from 'react';

const PrimeCounter = () => {
	const [count, setCount] = React.useState(2);
	const [isPrime, setIsPrime] = React.useState(false);
	const [isFocussed, setIsFocussed] = React.useState(true);

	React.useEffect(() => {
		// Check if the current number is a prime number
		if (isFocussed) {
			let isPrime = true;
			const sqrt = Math.sqrt(count);

			for (let i = 2; i < sqrt; i++) {
				if (count % i === 0) {
					isPrime = false;
					break;
				}
			}
			setIsPrime(isPrime);
		}

		// Update the focus state when the window loses or gains focus
		const handleFocusChange = () => setIsFocussed(!isFocussed);
		window.addEventListener('blur', handleFocusChange);
		window.addEventListener('focus', handleFocusChange);
		return () => {
			window.removeEventListener('blur', handleFocusChange);
			window.removeEventListener('focus', handleFocusChange);
		};
	}, [count, isFocussed]);

	// Increment the number when the button is clicked
	const onClick = React.useMemo(() => () => setCount(count + 1), [count]);

	return (
		<>
			<p> Click to check the next prime number</p>
			<p>{`Hello ${process.env.REACT_APP_NAME}`}</p>
			<button onClick={onClick} style={{ color: isFocussed ? 'green' : 'red' }}>
				{count} is{isPrime ? '' : ' not'} a prime number
			</button>
		</>
	);
};

export default PrimeCounter;
