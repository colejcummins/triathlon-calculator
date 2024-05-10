import React, {useState} from 'react';
import {CssVarsProvider} from '@mui/joy';

import './App.css';
import {Form} from './components/Form';
import {DarkModeToggle} from './components/DarkModeToggle';
import { FormStore, FormContext } from './stores';

function App() {
  const [formStore] = useState(new FormStore());

  return (
    <CssVarsProvider defaultMode='system'>
      <DarkModeToggle />
      <FormContext.Provider value={formStore}>
        <Form />
      </FormContext.Provider>
    </CssVarsProvider>
  );
}

export default App;
