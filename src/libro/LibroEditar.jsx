import React from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert';
import myHost from '../config.js';


export default function LibroEditar(props) {
    const params = useParams();
    const host = myHost;
    const listadoCategorias = useSelector((state) => state.categorias);
    const [form, setForm] = React.useState({
        nombre: '', 
        descripcion: '', 
        categoria_id: '',
        persona_id: '',
        alias: '',
        nombre_categoria: ''
    })

    const buscarLibro = async(idLibro) => {
        try {
            const respuesta = await axios.get(host+'/api/libro/'+ idLibro);
            console.log(host+'/api/libro/'+ idLibro);
            setForm(respuesta.data[0]);
            
        } catch (e) {
            console.log(e.response.data.Error);
            swal("Atención", e.response.data.Error, "warning")
        }
    }

    React.useEffect(() => {
        console.log(params.id);
        if (!params.id) return;
        buscarLibro(params.id)

    }, [params])

    const handleChangeNombre = (e) => {
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.nombre = e.target.value;
        setForm(nuevoState);
    }

    const handleChangeDescripcion = (e) => {
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.descripcion = e.target.value;
        setForm(nuevoState);
    }


    const handleChangeCategoria = (e) => {
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.categoria_id = e.target.value;
        setForm(nuevoState);
    }

    const handleCancel = (e) => {
        props.history.push('/libros');
    }



    const guardar = async() => {
        try {
            const libro = {
                nombre: form.nombre,
                descripcion: form.descripcion,
                categoria_id: form.categoria_id,
                persona_id: form.persona_id
            }
            console.log('guardar ' + libro );
            console.log(host + '/api/libro/'+ params.id + '  ' + form.id + '  ' + form.nombre + '  ' + form.descripcion) ;
            const respuesta = await axios.put(host + '/api/libro/'+params.id, libro);
            swal({
                title:"Listo!", 
                text: "Se grabó correctamente", 
                icon: "success",
                button: "Ok"});
            props.history.push('/libros');
        } catch (e) {
            console.log(e.response.data.Error);
            swal("Error al grabar", e.response.data.Error, "error");
        }
    }

    return ( 
    <form id="form" >
    <div class="card">
    <div class="card-body">
            <Link to="/libros/"><button type="button" class="btn btn-light">Volver</button></Link><br/>    
            <div class="mb-3"> 
                <label class="form-label">Nombre </label>
                <input type="text" class="form-control" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChangeNombre}/><br/>
            </div>
            <div class="mb-3"> 
                <label class="form-label">Descripción</label>
                <input type="text" class="form-control" name="descripcion" placeholder="Descripcion" value={form.descripcion} onChange={handleChangeDescripcion}/><br/>
            </div>
            <div class="mb-3" > 
                <label class="form-label">Categoría</label>
                
                {/*<input type="text" name="id_categoria" placeholder="Categoria" value={form.categoria_id} onChange={handleChangeCategoria}/><br/>
                <p>{form.nombre_categoria}</p>*/}
                <select class="form-select" value={form.categoria_id} onChange={handleChangeCategoria}>
                    {listadoCategorias.map(unaCategoria => (
                    <option value={unaCategoria.id}>{unaCategoria.nombre}</option>))}
                </select>
        
            </div>
            <div class="col"> 
            <label class="form-label">
                Prestado a:  {form.alias}
            </label>
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