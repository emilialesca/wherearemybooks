import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import myHost from '../config.js';

export default function PersonaVer(props) {
    const params = useParams();
    const listado = useSelector((state) => state.personas);
    const [persona, setPersona] = React.useState({});
    const [listadoLibros, setLibros] = React.useState([]);
    const [error, setError] = React.useState('');
    const host = myHost;

    const buscarLibrosPrestados = async(idPersona) => {
        try {
            const respuesta = await axios.get(host+'/api/librosprestados/'+ idPersona)
            console.log(host+'/api/librosprestados/'+ idPersona)            
            setLibros(respuesta.data);
            console.log(JSON.parse(JSON.stringify(respuesta.data)))
            console.log(listadoLibros.nombre);
        } catch (e) {
            console.log(e);
            setError(e.response.data.Error);
            swal("Atención", e.response.data.Error, "warning");
        }
    }
  
    React.useEffect(() => {
        console.log("ver persona " + listado);
        if (!listado || listado.length == 0) return;
        console.log(listado)
        setPersona(listado.find((item) => item.id == params.id));
        buscarLibrosPrestados(params.id);
        console.log("tiene libros " + listadoLibros.nombre);
    }, [params, listado]);

    return (
    <form id="form"> 
    <div>
    <Link to="/personas/"><button type="button" class="btn btn-light">Volver</button></Link><br/>    
      <div class="mb-3"> 
        <h5>Libros que se le prestó a </h5>
        <h3>{persona.alias}</h3>
        <label class="form-label">{persona.email}</label> <br/>
      </div>
        <div>

        <table class="table table-striped">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripcion</th>
              </tr>
            </thead>
            <tbody>
              {listadoLibros.map(unLibro => (
              <tr>
                <td>{unLibro.nombre}</td>
                <td>{unLibro.descripcion}</td>
              </tr>
              ))}
          
            </tbody> 
          </table>
        </div>
    </div>
    </form>
    );

}