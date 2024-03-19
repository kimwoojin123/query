import { useState } from 'react';
import './App.css';
import Counter from './redux/counter';

const App = (): JSX.Element => {
	const [count, setCount] = useState(0);

	return (
		<>
			<Counter />
		</>
	);
};

export default App;
