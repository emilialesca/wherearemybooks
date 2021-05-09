import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import myHost from '../config.js';

export default function CategoriaListado() {
  const dispatch = useDispatch();
  //const [listadoCategorias, setListado] = React.useState([]);
  const listadoCategorias = useSelector((state) => state.categorias);
  const [error, setError] = React.useState('');
  const host = myHost;
  
  /*const lstCategorias = async() => {
    try {
      const respuesta = await axios.get(host + '/api/categoria');
      setListado(respuesta.data);
      setError('');
    } catch (e) {
      console.log(e.message);
      setError(e.message);
      swal("Atención",e.message, "warning");
    }
  }

  React.useEffect(() => {
    lstCategorias();
  }, [])*/

  const handleBorrarCategoria = async(id) => {
    try {
      console.log("borraR " + id);
      await axios.delete(host + '/api/categoria/'+ id);
      console.log("LUEGO");
      dispatch({ type: 'ELIMINAR_CATEGORIA', idElementoARemover: id });
      //lstCategorias();
    } catch (e) {
      console.log(e.message);
      setError(e.response.data.Error);
      swal("Error al borrar", e.response.data.Error, "error");
    }
  }

return (
    <form name="frm">
    <div className="./App">
    <Link to="/"><button type="button" class="btn btn-light">Volver</button></Link>
    <Link to={"/categorias/nueva"}><button type="button" class="btn btn-info">Agregar</button></Link>
      {error ? <> {error} </> : <></>}
      <h1>Categorias</h1>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {listadoCategorias.map(unaCategoria => (
            <tr>
              <td>{unaCategoria.id}</td>
              <td>{unaCategoria.nombre}</td>
              <td><Link to={"/categorias/editar/"+unaCategoria.id.toString()}>
                <button type="button" class="btn btn-info">Editar</button>
              </Link>
              <button type="submit" class="btn btn-danger" onClick={() => handleBorrarCategoria(unaCategoria.id)}>Borrar</button>
              <Link to={"/categorias/verlibros/"+unaCategoria.id.toString()}>
              <button type="button" class="btn btn-light">Ver libros</button>
              </Link> </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </form>
  )

}


