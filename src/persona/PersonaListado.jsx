import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import myHost from '../config.js';

export default function PersonaListado() {
  const dispatch = useDispatch();
  const listadoPersonas = useSelector((state) => state.personas);
  const host = myHost;

  const handleBorrarPersona = async(id) => {
    try {
      await axios.delete(host + '/api/persona/'+ id);
      dispatch({ type: 'ELIMINAR_PERSONA', idElementoARemover: id });

    } catch (e) {
      console.log(e.response.data.Error);      
      swal("Error al borrar", e.response.data.Error , "error");
    }
  }

  return (
    <div>
    <Link to="/"><button type="button" class="btn btn-light">Volver</button></Link>
    <Link to={"/personas/nueva/"}><button type="button" class="btn btn-info">Agregar</button></Link>
    <h1>Listado de Personas</h1>      
    <div>
    <table class="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Alias</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {listadoPersonas.map(unaPersona => (
            <tr key={unaPersona.id}>
            <td>{unaPersona.nombre}</td>
            <td>{unaPersona.apellido}</td>
            <td>{unaPersona.alias}</td>
            <td>{unaPersona.email}</td>
            <td>
            <Link to={"/personas/editar/"+unaPersona.id.toString()}>
              <button type="button" class="btn btn-info">Editar
            </button>
            </Link>
            <button type="button" class="btn btn-danger" onClick={() => handleBorrarPersona(unaPersona.id)}>Borrar</button>
            <Link to={"/personas/ver/"+unaPersona.id.toString()}>
              <button type="button" class="btn btn-light">Ver libros</button>
            </Link> </td>

            </tr>
            
          ))}
        </tbody>
    </table>
    </div>
    </div>
  );
  


}


