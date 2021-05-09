import React from 'react';
//import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import myHost from '../config.js';

export default function PersonaNueva(props) {

  const host = myHost;
  const [form, setForm] = React.useState({})
  

  const handelChangeNombre = (e) => {
      const nuevoState = JSON.parse(JSON.stringify(form));
      nuevoState.nombre = e.target.value;
      setForm(nuevoState);
  }

  const handelChangeApellido = (e) => {
    const nuevoState = JSON.parse(JSON.stringify(form));
    nuevoState.apellido = e.target.value;
    setForm(nuevoState);
}

  const handelChangeAlias = (e) => {
    const nuevoState = JSON.parse(JSON.stringify(form));
    nuevoState.alias = e.target.value;
    setForm(nuevoState);
  }

  const handelChangeEmail = (e) => {
    const nuevoState = JSON.parse(JSON.stringify(form));
    nuevoState.email = e.target.value;
    setForm(nuevoState);
  }


  const guardar = async() => {
      try {
        console.log('guardar ' + form.nombre );
        console.log(host + '/api/persona' + form ) ;
        const respuesta = await axios.post(host + '/api/persona', form);
        props.history.push('/personas');
      } catch (e) {
        console.log(e.response.data.Error);
        swal("Error al grabar", e.response.data.Error, "error");
           
      }
  }

  const handleCancel = (e) => {
    props.history.push('/personas');
  }

  return ( 
    <form id="form" class="topBefore">
      <div class="container">
          <h5>Nueva persona</h5><br/>
          <div class="form-floating mb-3">
          <input type="text" class="form-control" id="floatingInput"  name="nombre" placeholder="Nombre" value={form.nombre} onChange={handelChangeNombre}/><br/>
          <label for="floatingInput">Nombre</label>
          </div>
          <div class="form-floating mb-3">
          <input type="text" class="form-control" id="fi2" name="apellido" placeholder="Apellido" value={form.apellido} onChange={handelChangeApellido}/><br/>
          <label for="fi2">Apellido</label>
          </div>
          <div class="form-floating mb-3">
          <input type="text"  class="form-control" id="fi3" name="alias" placeholder="Alias" value={form.alias} onChange={handelChangeAlias}/><br/>
          <label for="fi3">Alias</label>
          </div>
          <div class="form-floating mb-3">
          <input type="text"  class="form-control" id="fi4" name="email" placeholder="Email" value={form.email} onChange={handelChangeEmail}/><br/>
          <label for="fi4">Email</label>
          </div>
      </div>
      <div class="container">
          <button type="button" class="btn btn-primary" onClick={guardar}>Guardar</button>
          <button type="button" class="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
        
      </div>
    </form>
  )
}





