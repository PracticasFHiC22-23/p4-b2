<template>
  <div>
    <div><inici :main-page="false"/></div>
    <input type="text" v-model="searchQuery" @keydown.enter="searchFood" />
    <button @click="searchFood">Buscar</button>
    <ul>
      <li v-for="alimento in searchResults" :key="alimento.nombre">
        {{ alimento.nombre }}
        <input type="number" v-model="alimento.cantidad" min="0" step="25" />
        <button @click="agregarAlimento(alimento)">Añadir</button>
      </li>
    </ul>
    <table>
      <thead>
      <tr>
        <th>Nombre</th>
        <th>Cantidad</th>
        <th>Calorías</th>
        <th>Hidratos</th>
        <th>Grasas</th>
        <th>Proteína</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="alimento in selectedFoods" :key="alimento.nombre">
        <td>{{ alimento.nombre }}</td>
        <td>{{ alimento.cantidad }}</td>
        <td>{{ alimento.calorias * alimento.cantidad / 100 }}</td>
        <td>{{ alimento.hidratos * alimento.cantidad / 100 }}</td>
        <td>{{ alimento.grasas * alimento.cantidad / 100 }}</td>
        <td>{{ alimento.proteina * alimento.cantidad / 100 }}</td>
        <td><button @click="eliminarAlimento(alimento)">Eliminar</button></td>
      </tr>
      <tr>
        <td><strong>Total</strong></td>
        <td></td>
        <td>{{ totalCalorias }}</td>
        <td>{{ totalHidratos }}</td>
        <td>{{ totalGrasas }}</td>
        <td>{{ totalProteina }}</td>
        <td></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import inici from '../components/inici.vue'

export default {
  data() {
    return {
      alimentos: [
        { nombre: "Manzana", cantidad: 100, calorias: 95, hidratos: 25, grasas: 0, proteina: 1 },
        { nombre: "Pera", cantidad: 100, calorias: 85, hidratos: 22, grasas: 0, proteina: 1 },
        { nombre: "Leche", cantidad: 100, calorias: 150, hidratos: 12, grasas: 8, proteina: 8 },
        { nombre: "Yogur", cantidad: 100, calorias: 110, hidratos: 10, grasas: 2, proteina: 12 },
        { nombre: "Pollo", cantidad: 100, calorias: 165, hidratos: 0, grasas: 6, proteina: 31 },
        { nombre: "Arroz", cantidad: 100, calorias: 205, hidratos: 45, grasas: 0, proteina: 4 }
      ],
      searchQuery: "",
      searchResults: [],
      selectedFoods: []
    };
  },
  methods: {
    buscarAlimentos() {
      const query = this.searchQuery.trim();
      if (query === "") {
        this.searchResults = [];
        return;
      }
      this.searchResults = this.alimentos.filter((alimento) => {
        const nombre = alimento.nombre.toLowerCase();
        return nombre.includes(query.toLowerCase());
      });
    },
    searchFood() {
      this.buscarAlimentos();
    },
    agregarAlimento(nuevoAlimento) {
      this.selectedFoods.push(nuevoAlimento);
    },
    eliminarAlimento(alimento) {
      const index = this.selectedFoods.indexOf(alimento);
      if (index !== -1) {
        this.selectedFoods.splice(index, 1);
      }
    }
  },
  computed: {
    totalCalorias() {
      return this.selectedFoods.reduce((total, alimento) => {
        return total + (alimento.calorias * alimento.cantidad / 100);
      }, 0);
    },
    totalHidratos() {
      return this.selectedFoods.reduce((total, alimento) => {
        return total + (alimento.hidratos * alimento.cantidad / 100);
      }, 0);
    },
    totalGrasas() {
      return this.selectedFoods.reduce((total, alimento) => {
        return total + (alimento.grasas * alimento.cantidad / 100);
      }, 0);
    },
    totalProteina() {
      return this.selectedFoods.reduce((total, alimento) => {
        return total + (alimento.proteina * alimento.cantidad / 100);
      }, 0);
    },
  },
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
