import { Routes, Route } from 'react-router-dom'

import SignIn from '../Pages/SignIn';
import SignUp from '../Pages/SignUp';
import Dashboard from '../Pages/Dashboard';
import Home from '../Pages/Home';
import Minhas_Notas from '../Pages/Minhas_Notas';
import Profile from '../Pages/Profile';

import Private from './Private';

function RoutesApp(){
  return(
    <Routes>
      <Route path="/" element={ <SignIn/> } />
      <Route path="/register" element={ <SignUp/> } />

      <Route path="/dashboard" element={ <Private><Dashboard/></Private> } />
      
      <Route path="/profile" element={ <Private><Profile/></Private> } />

      <Route path="/home" element={<Private><Home/></Private>} />
      
      <Route path="/minhasNotas" element={<Private><Minhas_Notas/></Private>} />

    </Routes>
  )
}

export default RoutesApp;