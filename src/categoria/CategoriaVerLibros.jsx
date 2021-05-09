import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import myHost from '../config.js';

export default function CategoriaEditar(props) {

  const params = useParams();
  const host = myHost;
  const [error, setError] = React.useState('');
  const [form, setForm] = React.useState([]);
  const [categoria, setCateg] = React.useState({});
  
  const buscarLibros = async(idCategoria) => {
      try {
          const rta = await axios.get(host+'/api/categoria/'+ idCategoria);
          setCateg(rta.data[0]);
          console.log("categoria " + rta.data);

          const respuesta = await axios.get(host+'/api/libroscategoria/'+ idCategoria)
          console.log(host+'/api/libroscategoria/'+ idCategoria)            
          setForm(respuesta.data);

          
      } catch (e) {
          console.log(e.message)
          if (e.message != "Request failed with status code 404") {
            swal("Atención",e.response.data.Error, "warning")
          }

        }
  }

  React.useEffect(() => {
      console.log(params.id);
      if (!params.id) return;
      buscarLibros(params.id)
  }, [params])


  return ( 
    <form name="frm">
    <div>
    <Link to="/categorias"><button type="button" class="btn btn-light">Volver</button></Link>
      <h5>Libros que pertenencen a la categoria {categoria.nombre}</h5>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th></th>
          </tr>
        </thead>
        
        <tbody>
          {form.map(unLibro => (
            <tr>
              <td>{unLibro.nombre}</td>
              <td>{unLibro.descripcion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </form>
  )
}




