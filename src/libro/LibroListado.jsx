import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import myHost from '../config.js';

export default function LibroListado() {
  const dispatch = useDispatch();
  const listadoLibros = useSelector((state) => state.libros);
  

const [error, setError] = React.useState('');
const host = myHost;

const handleBorrarLibro = async(id) => {
    try {

      const respuesta = await axios.delete(host + '/api/libro/'+ id);
      dispatch({ type: 'ELIMINAR_LIBRO', idElementoARemover: id });
      swal( "Libro", respuesta.response.data,"success");
    } catch (e) {
        console.log(e.message);
        setError(e.response.data.Error);
        swal( "No se elimino", e.response.data.Error,"error");
    }
  }

const handleDevolver = async(id) => {
    console.log("devolver " + id);
    try {
      const respuesta = await axios.put(host + '/api/libro/devolver/'+ id);
      swal( "Libro", "Fue devuelto correctamente","success");
      
    } catch (e) {
        console.log(e.message);
        setError(e.message);
        swal( "No se devolvio", e.response.data.Error,"error");
    }
}
  
return (
    <div>
      <Link to="/"><button type="button" class="btn btn-light">Volver</button></Link>
      <Link to={"/libros/nuevo"}><button type="button" class="btn btn-info">Agregar</button></Link>
      {error ? <> error en la conexion </> : <></>}
      <h1>Libros</h1>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Prestado</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {listadoLibros.map(unLibro => (
            <tr key={unLibro.id}>
              <td>{unLibro.id}</td>
              <td>{unLibro.nombre}</td>
              <td>{unLibro.descripcion}</td>
              <td>{unLibro.alias}</td>
              <td><button type="button" class="btn btn-secondary" onClick={() => handleDevolver(unLibro.id.toString())}>Devolver</button>
              <Link to={"/libros/prestar/"+unLibro.id.toString()}>
                <button type="button" class="btn btn-success">
                  Prestar
                </button>
              </Link>
              <Link to={"/libros/editar/"+unLibro.id.toString()}>
                <button type="button" class="btn btn-info">                
                  Editar
                </button>
              </Link>
              <button  type="button" class="btn btn-danger" onClick={() => handleBorrarLibro(unLibro.id)}>Borrar</button></td>              
            </tr>
          ))}
          
        </tbody>
      </table>
    </div>

  )

}


