import { Route, Routes, HashRouter } from 'react-router-dom'
import Factura from './components/factura/Factura';
import NavBar from './components/navBar/NavBar';
import Registro from './components/registro/Registro';
import RegistroGeneral from './components/registroGeneral/RegistroGeneral';

function App() {
  return (
    <>
      <HashRouter basename='/'>
        <div style={{display:'flex', justifyContent:'center'}} >
        <NavBar />
        </div>

        <Routes>
          <Route exact path='/*' element={<Factura />} />
          <Route exact path='/registro' element={<Registro />} />
          <Route exact path='/registroGeneral' element={<RegistroGeneral/>}/>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
