import logo from './logo.svg';
import './App.css';
import Grid from './Grid-Component/gridClass';
import DDA from './Line-Algorithms/DDA';

function App() {
  return (
    <div className="App">
      <h1>DDA algorithm implementation</h1>
      <DDA
        width={20}
        height={10}
        start={[4,5]}
        end={[1,9]}
        delay={500}
      />
    </div>
  );
}

export default App;
