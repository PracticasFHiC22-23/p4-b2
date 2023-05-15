<template>
  <div>
    <div><inici :main-page="false"/></div>
    <div class="container">
      <h1>Buscar alimentos</h1>
      <div class="search-container">
        <input type="text" id="search-input" v-model="searchQuery" @keydown.enter="searchFood" placeholder="Buscar alimentos" />
        <button id="search-button" @click="searchFood">Buscar</button>
      </div>
      <div class="search-results">
        <ul id="food-list">
          <li v-for="alimento in searchResults" :key="alimento.nombre">
            {{ alimento.nombre }}
            <input class="food-quantity" type="number" v-model="alimento.cantidad" min="0" step="25" />
            <button class="add-food" @click="agregarAlimento(alimento)">Añadir</button>
          </li>
        </ul>
      </div>
      <div class="table-container">
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
          <tbody id="table-body">
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
    </div>
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
  @import '../../styles/calculadora.css';
</style>
