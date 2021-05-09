import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Home() {
  return (
  <form id="form"> 
    <div class="card">
    <div class="card-body">

    <table class="table table-striped">
      <tr>
      <th><Link to="/categorias">
          <button type="button" class="btn btn-light">Ver categorias</button>
         </Link>
      </th>
      <th>
        <Link to="/libros">
          <button type="button" class="btn btn-light">Ver libros</button>
        </Link>
      </th>
      <th>
        <Link to="/personas">
          <button type="button" class="btn btn-light">Ver personas</button>
        </Link>
      </th>
      </tr>
    </table> 
    </div>
    </div>
  </form>
  );
}

export default Home;
