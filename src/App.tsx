import { useState } from 'react';
import './App.css'
import { GeneralSelect, SingleSelect } from './components'

function App() {
  const [selected, setSelected] = useState<string[]>([]);
  const options = [
    "Education 🎓",
    "Yeeeah, science! 🚙",
    "Art 🎨🎻",
    "Sport ⚽️",
    "Games 🎮",
    "Health 🏥",
  ];


  return (
    <>
      <h1>General Select</h1>
      <div className="card">
        <div style={{ padding: "50px" }}>
          <GeneralSelect
            options={options}
            value={selected}
            onChange={setSelected}
            placeholder="Select category"
          />
          <SingleSelect
            options={options}
            value={selected}
            onChange={setSelected}
            placeholder="Select category"

          />
        </div>
      </div>
    </>
  )
}

export default App