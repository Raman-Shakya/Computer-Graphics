import './App.css';

import DDA from './Line-Algorithms/DDA';
import BLA from './Line-Algorithms/BLA';
import { useState } from 'react';

function App() {
  const [selected, setSelected] = useState("DDA");

  
  return (
    <div className="App">
      <div className='selector-wrapper'>
        <button className={selected==="DDA" ? "selected-button": ""} onClick={ () => setSelected("DDA")}>DDA</button>
        <button className={selected==="BLA" ? "selected-button": ""} onClick={ () => setSelected("BLA")}>BLA</button>
      </div>
      { selected==="DDA" && 
        <DDA
          width={20}
          height={10}
          // start={[1,2]}
          // end={[3,4]}
          delay={100}
          acceptInput={true}
        />
      }
      { selected==="BLA" && 
        <BLA
          width={20}
          height={10}
          // start={[1,2]}
          // end={[3,4]}
          delay={100}
          acceptInput={true}
        />
      }
      <div className='copyright'>
        <div className='copyright-content'>©Raman Shakya 2024</div>
      </div>
    </div>
  );
}

export default App;
