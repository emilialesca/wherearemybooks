import React, {useState} from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import myHost from '../config.js';


export default function LibroNuevo(props){
    const host = myHost;
    const [error, setError] = React.useState('');
    const [form, setForm] = React.useState({})
    const listadoCategorias = useSelector((state) => state.categorias);
    const dispatch = useDispatch();

    const handleNombreChange = (e) => {
        const newForm = JSON.parse(JSON.stringify(form));
        newForm.nombre = e.target.value;
        setForm(newForm);
    }

    const handleDescripcionChange = (e) => {
        const newForm = JSON.parse(JSON.stringify(form));
        newForm.descripcion = e.target.value;
        setForm(newForm);
    }

    const handleCategoriaChange = (e) => {
        console.log('id categoria ' + e.target.value);
        const newForm = JSON.parse(JSON.stringify(form));
        newForm.categoria_id = e.target.value;
        setForm(newForm);
    }

    const handleCancel = (e) => {
        props.history.push('/libros');
    }

    const handleSave = async () => {
        try {
            console.log()
            const respuesta = await axios.post(host + '/api/libro',form);
            dispatch({ type: 'AGREGAR_LIBRO', libro: respuesta.data});
            props.history.push('/libros');
            swal("Listo!", "Se grabó correctamente", "success");
            
        } catch (e) {
            console.log(e);
            setError(e.response.data.Error);
            swal({
                title: "No se guardo",
                text: e.response.data.Error,
                icon: "error",
                button: "Aceptar"});

        }
    }

    return (
    <form id="form" >
    <div class="card">
    <div class="card-body">
      <h5>Nuevo libro</h5>
      <br/>
      
        <div class="mb-3"> 
            <input type="text" class="form-control" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleNombreChange} />
        </div>
        <div>            
            <input type="text" class="form-control" name="descripcion"  placeholder="Descripción" value={form.descripcion} onChange={handleDescripcionChange} />
        </div>
        <div class="mb-3">   
        <label class="form-label">Categoría</label>          
          <select   class="form-select" onChange={handleCategoriaChange}>
            {listadoCategorias.map(unaCategoria => (
              <option value={unaCategoria.id}>{unaCategoria.nombre}</option>))}
            </select>
          {/*  <input type="number" name="categoria"  placeholder="Categoría"  value={form.categoria} onChange={handleCategoriaChange} />*/}
        </div>
        <div class="mb-3"> 
            <button type="button" class="btn btn-primary" onClick={handleSave}>Guardar</button>
            <button type="button" class="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
        </div>
    </div>
    </div>
    </form>
    )

}