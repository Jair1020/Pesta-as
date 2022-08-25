import { Route, Routes, HashRouter } from 'react-router-dom'
import './App.css';
import Factura from './components/factura/Factura';
import Registro from './components/registro/Registro';

function App() {
  return (
    <>
      <HashRouter basename='/'>
        <Routes>
          <Route exact path='/*' element={<Factura/>}/>
          <Route exact path='/registro' element={<Registro/>}/>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
