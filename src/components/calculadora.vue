<template>
  <div class='container'>
    <h1>Buscar alimentos</h1>
    <div class='search-container'>
      <input type='text' id='search-input' v-model='busqueda' placeholder='Buscar alimentos'/>
      <button id='search-button'>Buscar</button>
      <ul>
        <li v-for='(alimento, index) in alimentosFiltrados' :key='alimento' @click='agregarAlimento(index)'></li>
      </ul>
    </div>
    <div class='table-container'>
      <table>
        <thead>
        <tr>
          <th>Nombre</th>
          <th>Cantidad</th>
          <th>Calorías</th>
          <th>Hidratos</th>
          <th>Grasas</th>
          <th>Proteína</th>
          <th>Agregar</th>
        </tr>
        </thead>
        <tbody id='table-body'>
        <tr v-for='alimento in alimentosSeleccionados' :key='alimento'>
          <td>{{ alimento.nombre }}</td>
          <td><input type='number' v-model='alimento.cantidad'></td>
          <td>{{ alimento.calorias }}</td>
          <td>{{ alimento.hidratos }}</td>
          <td>{{ alimento.grasas }}</td>
          <td>{{ alimento.proteina }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'calculadora',
  data () {
    return {
      alimentos: [
        { nombre: 'Manzana', cantidad: 100, calorias: 95, hidratos: 25, grasas: 0, proteina: 1 },
        { nombre: 'Pera', cantidad: 100, calorias: 85, hidratos: 22, grasas: 0, proteina: 1 },
        { nombre: 'Leche', cantidad: 100, calorias: 150, hidratos: 12, grasas: 8, proteina: 8 },
        { nombre: 'Yogur', cantidad: 100, calorias: 110, hidratos: 10, grasas: 2, proteina: 12 },
        { nombre: 'Pollo', cantidad: 100, calorias: 165, hidratos: 0, grasas: 6, proteina: 31 },
        { nombre: 'Arroz', cantidad: 100, calorias: 205, hidratos: 45, grasas: 0, proteina: 4 }
      ],
      busqueda: '',
      alimentosSeleccionados: [],
    };
  },
  methods: {
    agregarAlimento(index) {
      this.alimentosSeleccionados.push(alimentos[index]);
    }
  },
  computed: {
    alimentosFiltrados() {
      if (this.busqueda) {
        return this.alimentos.filter(alimento =>
          alimento.nombre.toLowerCase().includes(this.busqueda.toLowerCase())
        );
      }
    },
  }
}
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
  }

  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }

  h1 {
    text-align: center;
  }

  .search-container {
    display: flex;
    margin-bottom: 20px;
  }

  #search-input {
    flex: 1;
    padding: 10px;
    border: none;
    border-radius: 5px 0 0 5px;
    font-size: 16px;
  }

  #search-button {
    padding: 10px;
    border: none;
    border-radius: 0 5px 5px 0;
    background-color: #008CBA;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
  }

  .search-results {
    margin-bottom: 20px;
  }

  #food-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  #food-list li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border: 1px solid #ccc;
    margin-bottom: 10px;
    border-radius: 5px;
  }

  .table-container {
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ccc;
  }

  th {
    background-color: #008CBA;
    color: #fff;
  }

  td:last-child {
    text-align: center;
  }
</style>
