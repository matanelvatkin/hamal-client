import { useState } from 'react';
import { createContext } from 'react';
import Layout from './Layout';
import { Route, Routes } from 'react-router-dom';


export const userContext = createContext()
function App() {
  const [user,setUser] = useState()
  return (
    <userContext.Provider value={{user,setUser}}>
        <Layout/>
    </userContext.Provider>
  );
}

export default App;
