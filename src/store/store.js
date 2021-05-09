import { createStore } from 'redux';

const estadoInicial = {
    categorias: [],
    libros: [],
    personas: []
    
}

function reducer(state = estadoInicial, action) {
    const newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case 'LISTADO_CATEGORIAS':
            newState.categorias= action.listadoCategorias;
            /*const nuevoEstado = JSON.parse(JSON.stringify(state))
            nuevoEstado.seleccionados.push({ ...action.elementoAAgregar })*/
            return newState;
        case 'AGREGAR_CATEGORIA':
            newState.personas.push(action.persona);
            return newState;
        case 'ELIMINAR_CATEGORIA':
            newState.categorias = newState.categorias.filter((unElemento) => unElemento.id !== action.idElementoARemover);
            return newState;
        case 'LISTADO_LIBROS':
            newState.libros = action.listadoLibros;
            return newState;
        case 'AGREGAR_LIBRO':
            newState.libros.push(action.libro);
            return newState;
        case 'ELIMINAR_LIBRO':
            newState.libros = newState.libros.filter((unElemento) => unElemento.id !== action.idElementoARemover);
            return newState;    
        case 'LISTADO_PERSONAS':
            newState.personas = action.listadoPersonas;
            return newState;
        case 'AGREGAR_PERSONA':
            newState.personas.push(action.persona);
            return newState;
        case 'ELIMINAR_PERSONA':
            newState.personas = newState.personas.filter((unElemento) => unElemento.id !== action.idElementoARemover);
            return newState;
        default:
            return state;
    }
}

export default createStore(reducer);
