import React, {useState, createContext, useContext} from 'react';
import './App.css';
import {Form} from './components/Form';
import { FormStore, FormContext } from './stores';

function App() {
  const [formStore] = useState(new FormStore());

  return (
    <div className="App">
      <FormContext.Provider value={formStore}>
        <Form />
      </FormContext.Provider>
    </div>
  );
}

export default App;
