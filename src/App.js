import logo from './logo.svg';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CategoriaEditar from './categoria/CategoriaEditar.jsx';
import CategoriaListado from './categoria/CategoriaListado.jsx';
import CategoriaNueva from './categoria/CategoriaNueva.jsx';
import CategoriaVerLibros from './categoria/CategoriaVerLibros.jsx';
import LibroListado from './libro/LibroListado.jsx';
import LibroEditar from './libro/LibroEditar.jsx';
import LibroPrestar from './libro/LibroPrestar.jsx';
import LibroNuevo from './libro/LibroNuevo.jsx';
import PersonaListado from './persona/PersonaListado.jsx';
import PersonaVer from './persona/PersonaVer.jsx';
import PersonaNueva from './persona/PersonaNueva.jsx';
import PersonaEditar from './persona/PersonaEditar.jsx';
import Home from './home.jsx';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import myHost from './config.js';
import swal from 'sweetalert';

function App() {
  const dispatch = useDispatch();
  const host = myHost;
  const [error, setError] = React.useState('');

  React.useEffect(async () => {
    try { 
      const respuesta = await axios.get(host + '/api/libro');
      dispatch({ type: 'LISTADO_LIBROS', listadoLibros: respuesta.data });
    } catch (e) {
      setError('No se pudo conectar al servidor')
      swal("Atención",'No se pudo conectar al servidor', "warning");
    }
  }, []);

  React.useEffect(async () => {
    try {
      const respuesta = await axios.get(host + '/api/persona');
      dispatch({ type: 'LISTADO_PERSONAS', listadoPersonas: respuesta.data });
    } catch (e) {
      setError('No se pudo conectar al servidor')
      console.log('No se pudo conectar al servidor')
      swal("Atención",'No se pudo conectar al servidor', "warning");
    }
  }, []);

  React.useEffect(async () => {
    try {
      const respuesta = await axios.get(host + '/api/categoria');
      dispatch({ type: 'LISTADO_CATEGORIAS', listadoCategorias: respuesta.data });
    } catch (e) {
      setError('No se pudo conectar al servidor')
      console.log('No se pudo conectar al servidor')
      swal("Atención",'No se pudo conectar al servidor', "warning");
    }
  }, []);

  return (
    <form> 
    <div >
      <div class="shadow p-3 mb-5 bg-body rounded" >
        <div class="text-center">
        <h3>Trabajo final</h3></div>
      </div>

      
      {error ? <> {error} </> : <></>}
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/categorias" component={CategoriaListado} />
        <Route exact path="/categorias/editar/:id" component={CategoriaEditar} />
        <Route exact path="/categorias/nueva/" component={CategoriaNueva} />
        <Route exact path="/categorias/verlibros/:id" component={CategoriaVerLibros} />
        <Route exact path="/libros" component={LibroListado} />
        <Route exact path="/libros/editar/:id" component={LibroEditar} />
        <Route exact path="/libros/prestar/:id" component={LibroPrestar} />
        <Route exact path="/libros/nuevo/" component={LibroNuevo} />
        <Route exact path="/personas" component={PersonaListado} />
        <Route exact path="/personas/ver/:id" component={PersonaVer} />
        <Route exact path="/personas/nueva/" component={PersonaNueva} />
        <Route exact path="/personas/editar/:id" component={PersonaEditar} />
      </Router>
    </div>
    </form>
  );
}


export default App;

