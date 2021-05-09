import React from 'react';
//import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert';
import myHost from '../config.js';

export default function CategoriaNueva(props) {

  const host = myHost;
  const [form, setForm] = React.useState({})
  const dispatch = useDispatch();

  const handelChangeNombre = (e) => {
      const nuevoState = JSON.parse(JSON.stringify(form));
      nuevoState.nombre = e.target.value;
      setForm(nuevoState);
  }

  const guardar = async() => {
      try {
        console.log('guardar ' + form.nombre );
        console.log(host + '/api/categoria' + form ) ;
        const respuesta = await axios.post(host + '/api/categoria', form);
        console.log('paso guardar');
        dispatch({ type: 'AGREGAR_CATEGORIA', categoria: respuesta.data});
        props.history.push('/categorias');
      } catch (e) {
        console.log(e.response.data.Error);
        swal("Error al grabar",e.response.data.Error, "error");
           
      }
  }

  const handleCancel = (e) => {
    props.history.push('/categorias');
  }

  return ( 
    <form id="form">
    <div class="card">
    <div class="card-body">
      <Link to="/categorias">Volver</Link><br/>
      <br/>
      <h5>Nueva categoría</h5>
      
      <div class="mb-3">
          <input type="text" class="form-control" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handelChangeNombre}/><br/>
      </div>
      <div class="mb-3">
          <button type="button" class="btn btn-primary" onClick={guardar}>Guardar</button>
          <button type="button" class="btn btn-seconday" onClick={handleCancel}>Cancelar</button>
      </div>
    </div>
    </div>
    </form>
  )
}





