import React from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert';
import myHost from '../config.js';


export default function LibroPrestar(props) {
    const params = useParams();
    const host = myHost;
    const listadoPersonas = useSelector((state) => state.personas);
    const [form, setForm] = React.useState({})

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


    const handleChangePersona = (e) => {
        const nuevoState = JSON.parse(JSON.stringify(form));
        console.log("persona " + e.target.value);
        nuevoState.persona_id = e.target.value;
        setForm(nuevoState);
    }

    const handleCancel = (e) => {
        props.history.push('/libros');
    }



    const guardar = async() => {
        try {
            const persona = {
                persona_id: form.persona_id 
            } 
            console.log(form.persona_id) ;
            const respuesta = await axios.put(host + '/api/libro/prestar/'+params.id, persona);
            console.log("respuesta : " + respuesta.data);
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
    <form id="formPrestar">
    <div class="card">
    <div class="card-body">
            <Link to="/libros/"><button type="button" class="btn btn-light">Volver</button></Link><br/>    
            <div class="mb-3"> 
                <label class="form-label">Nombre </label>
                <p>{form.nombre}</p>
            </div>
            <div class="mb-3"> 
                <label class="form-label">Descripción</label>
                <p>{form.descripcion}</p>
            </div>
            <div class="mb-3"> 
            <label class="form-label">Prestar a: </label>
                <select class="form-select" value={form.persona_id} onChange={handleChangePersona}>
                    <option value="0"> Seleccione una persona </option>
                    {listadoPersonas.map(unaPersona => (
                    <option value={unaPersona.id}>{unaPersona.alias}</option>))} 
                </select>
        
            </div>
            <button type="button" class="btn btn-primary" onClick={guardar} classs="button">Guardar</button>
            <button type="button" class="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
            
    </div>
    </div>
    </form>
    )
}