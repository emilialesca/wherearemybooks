import React from 'react';
import CategoriaListado from './CategoriaListado';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import myHost from '../config.js';

export default function CategoriaEditar(props) {

  const params = useParams();
  const host = myHost;
  const [form, setForm] = React.useState({})
  
  const buscarCategoria = async(idCategoria) => {
      try {
          const respuesta = await axios.get(host+'/api/categoria/'+ idCategoria)
          console.log(host+'/api/categoria/'+ idCategoria)            
          setForm(respuesta.data[0])
          console.log(JSON.parse(JSON.stringify(respuesta.data[0])))
          console.log(JSON.parse(JSON.stringify(form)))
          
      } catch (e) {
          console.log(e)
          swal("Atención", e.response.data.Error, "warning")
      }
  }

  React.useEffect(() => {
      console.log(params.id);
      if (!params.id) return;
      buscarCategoria(params.id)

  }, [params])

  const handelChangeNombre = (e) => {
      const nuevoState = JSON.parse(JSON.stringify(form));
      console.log(nuevoState);
      nuevoState.nombre = e.target.value;
      console.log(nuevoState.nombre);
      setForm(nuevoState);
  }

  const handleCancel = (e) => {
    props.history.push('/categorias');
  }

  const guardar = async() => {
      try {
         await axios.put(host + '/api/categoria/'+params.id, form);
        //swal("Listo!", "Se grabó correctamente", "success");
        swal({
          title: form.nombre,
          text: "Se grabó correctamente",
          icon: "success",
          button: "Ok",
        });
        props.history.push('/categorias');
      } catch (e) {
        console.log(e);
        swal("Error al grabar", e.response.data.Error, "error");
      }
  }

  return ( 
    <form id="form">
    <div class="card">
    <div class="card-body">
        <Link to="/categorias/"><button type="button" class="btn btn-light">Volver</button></Link><br/>    
        <h5>Categría {form.id}</h5> <br/>
        <div class="mb-form-floating mb-3">          
          <label for="floatingInput">Nombre</label>
          <input type="text" class="form-control" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handelChangeNombre}/><br/>
        </div> 
        <div class="col">
          <button type="submit" class="btn btn-primary" onClick={guardar}>Guardar</button>
          <button type="submit" class="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
        </div>
    </div>
    </div>
    </form> 
  )
}




