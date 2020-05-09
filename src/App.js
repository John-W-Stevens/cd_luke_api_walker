import React, { useState } from 'react';
import "./bootstrap.css"
import './App.css';

import FetchSWDataForm from "./components/FetchSWDataForm"
import DataDisplay from "./components/DataDisplay"

function App() {

  const [data, setData] = useState({})
  const [error, setError] = useState(false)

  return (
    <div className="App container">
      <FetchSWDataForm data={ data } setData={ setData } error={ error } setError={ setError } />
      <DataDisplay data={ data } error={ error} />
    </div>
  );
}

export default App;
