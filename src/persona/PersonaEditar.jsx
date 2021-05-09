import React from 'react';
//import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import myHost from '../config.js';

export default function PersonaNueva(props) {

  const params = useParams();
  const host = myHost;
  const [form, setForm] = React.useState([])
  
  const buscarPersona = async(idPersona) => {
    try {
        const respuesta = await axios.get(host+'/api/persona/'+ idPersona)
        console.log(host+'/api/persona/'+ idPersona)            
        setForm(respuesta.data)
        console.log(JSON.parse(JSON.stringify(respuesta.data)))
        console.log(JSON.parse(JSON.stringify(form)))
        
    } catch (e) {
        console.log(e)
        swal("Atención", e.response.data.Error, "warning")
    }
}

React.useEffect(() => {
    console.log(params.id);
    if (!params.id) return;
    buscarPersona(params.id)

}, [params])

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
        const respuesta = await axios.put(host + '/api/persona/'+params.id, form);
        swal(form.nombre, "Se guardo correctamente", "success");
        props.history.push('/personas');
      } catch (e) {
        console.log(e.message);
        swal("Error al grabar", e.response.data.Error, "error");
           
      }
  }

  const handleCancel = (e) => {
    props.history.push('/personas');
  }

  return ( 
    <form id="form" >
    <div class="card">
    <div class="card-body">
    <h2>Persona {form.id}</h2>
    <div class="container">
        <div class="mb-3"> 
          <label class="form-label">Nombre</label>
          <input type="text" class="form-control" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handelChangeNombre}/><br/>
        </div>
        <div class="mb-3"> 
          <label class="form-label">Apellido</label>
          <input type="text" class="form-control" name="apeliido" placeholder="Apellido" value={form.apellido} onChange={handelChangeApellido}/><br/>
        </div>
        <div class="mb-3"> 
          <label class="form-label">Alias</label>
          <input type="text" class="form-control" name="alias" placeholder="Alias" value={form.alias} onChange={handelChangeAlias}/><br/>
        </div>
        <div class="mb-3"> 
          <label class="form-label">Email</label>
          <input type="text" class="form-control" name="email" placeholder="Email" value={form.email} onChange={handelChangeEmail}/><br/>
        </div>
        <div class="mb-3"> 
          <button type="button" class="btn btn-primary" onClick={guardar}>Guardar</button>
          <button type="button" class="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
          </div>
      </div>
    </div>
    </div>
    </form>
  )
}





