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
          <li v-for="alimento in searchResults" :key="alimento.id">
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
            <tr v-for="alimento in selectedFoods" :key="alimento.id">
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
      <div v-if="selectedFoods.length >= 2">
        <h1>Recetas</h1>
        <div v-for="receta in selectedRecetas" class="card">
          <div class="card-container">
            <div class="card-header">
              <img class="card-image" :src="getImatgeUrl(receta.url)" alt="">
            </div>
            <div class="card-body">
              <h2>{{ receta.titulo }}</h2>
              <ul>
                <li v-for="(ingrediente, index) in receta.ingredientes" :key="index">
                  Nombre: {{ Object.keys(ingrediente)[0] }}
                  Cantidad: {{ Object.values(ingrediente)[0] }}
                </li>
              </ul>
              <h3>Total Calorías: {{ receta.calorias }}</h3>
            </div>
            <div class="card-footer" style="display: contents">
              <button class="green-button" @click="irBlog(receta.titulo)">Ir a la receta</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import inici from '../components/inici.vue';
import router from "../router";

export default {
  data() {
    return {
      recetas: [
        {id: 1, titulo: 'Pollo al yogur', ingredientes: [{Yogur: 100}, {Pollo: 200}], calorias: 400, url: "recetapollo.jpg"}

      ],
      alimentos: [
        { id: 1, nombre: "Manzana", cantidad: 100, calorias: 95, hidratos: 25, grasas: 0, proteina: 1 },
        { id: 2, nombre: "Pera", cantidad: 100, calorias: 85, hidratos: 22, grasas: 0, proteina: 1 },
        { id: 3, nombre: "Leche", cantidad: 100, calorias: 150, hidratos: 12, grasas: 8, proteina: 8 },
        { id: 4, nombre: "Yogur", cantidad: 100, calorias: 110, hidratos: 10, grasas: 2, proteina: 12 },
        { id: 5, nombre: "Pollo", cantidad: 100, calorias: 165, hidratos: 0, grasas: 6, proteina: 31 },
        { id: 6, nombre: "Arroz", cantidad: 100, calorias: 205, hidratos: 45, grasas: 0, proteina: 4 }
      ],
      searchQuery: "",
      searchResults: [],
      selectedFoods: [],
      selectedRecetas: []
    };
  },
  methods: {
    buscarRecetas() {
      const ingredientesSeleccionados = this.selectedFoods.map(alimento => alimento.nombre);

      this.selectedRecetas = this.recetas.filter(receta => {
        const ingredientesReceta = receta.ingredientes.map(ingrediente => Object.keys(ingrediente)[0]);
        return ingredientesSeleccionados.every(ingrediente => ingredientesReceta.includes(ingrediente));
      });
    },
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
    },
    getImatgeUrl(url) {
      return require(`../assets/${url}`);
    },
    irBlog(name) {
      router.push('/blog/'+ name);
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
  watch: {
    selectedFoods: {
      handler: 'buscarRecetas',
      deep: true
    }
  }
}
</script>

<style scoped>
  @import '../../styles/calculadora.css';
  .card {
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 16px;
  }
  .card-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .card-header {
    margin-bottom: 8px;
  }

  .card-image {
    width: 100%;
    height: auto;
    object-fit: cover; /* Ajusta la imagen al contenedor manteniendo la relación de aspecto */
  }
  .green-button {
    background-color: green;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    align-self: flex-end; /* Alinea el botón a la derecha del contenedor */
  }

  .green-button:hover {
    background-color: darkgreen;
  }
</style>
