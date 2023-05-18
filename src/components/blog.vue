<template>
  <div class="recipe-container">
    <div v-if="recetaActual">
      <div class="receta">
        <h2>{{ recetaActual.titulo }}</h2>
        <img :src="getImatgeUrl(recetaActual.url)" :alt="recetaActual.titulo" class="receta-image" />
        <h3>Ingredientes:</h3>
        <ul>
          <li v-for="(ingrediente, index) in recetaActual.ingredientes" :key="index">
            {{ Object.keys(ingrediente)[0] }}: {{ Object.values(ingrediente)[0] }}
          </li>
        </ul>
        <h3>Instrucciones:</h3>
        <ol>
          <li v-for="(instruccion, index) in recetaActual.intrucciones" :key="index">
            {{ Object.values(instruccion)[0] }}
          </li>
        </ol>
        <h2>Calorías: {{ recetaActual.calorias }}</h2>
      </div>
    </div>
    <div v-else>
      <p>No se encontró la receta.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "recipe",
  props: ["parametro"],
  data() {
    return {
      recetas: [
        {
          id: 1,
          titulo: "Pollo al yogur",
          ingredientes: [
            { Yogur: 100 },
            { Pollo: 200 },
            { Verduras: 150 },
            { Sal: 5 },
            { Pimienta: 3 },
          ],
          calorias: 400,
          url: "recetapollo.jpg",
          intrucciones: [
            {
              1:
                "En un tazón grande, mezcla el yogur con el aceite de oliva, el ajo picado, la sal y la pimienta. Añade los trozos de pollo a la mezcla y revuelve para asegurarte de que estén bien cubiertos. Deja marinar durante al menos 30 minutos, preferiblemente en el refrigerador.",
            },
            {
              2:
                "Mientras el pollo se marina, prepara las verduras. En una sartén grande o wok, calienta un poco de aceite de oliva a fuego medio-alto. Agrega los pimientos, la cebolla, la zanahoria y el calabacín. Saltea las verduras durante unos 5-7 minutos, hasta que estén tiernas pero aún crujientes. Retira las verduras de la sartén y reserva.",
            },
            {
              3:
                "En la misma sartén, agrega un poco más de aceite de oliva si es necesario. Retira los trozos de pollo de la marinada y colócalos en la sartén caliente. Cocina el pollo durante unos 6-8 minutos por cada lado, o hasta que esté bien dorado y completamente cocido.",
            },
            {
              4:
                "Una vez que el pollo esté cocido, vuelve a añadir las verduras salteadas a la sartén. Exprime el jugo de medio limón sobre la mezcla y revuelve todo junto durante unos minutos para que los sabores se mezclen.",
            },
            {
              5:
                "Sirve el pollo con yogur y verduras caliente, decorado con hojas frescas de cilantro. Puedes acompañarlo con arroz, couscous o pan naan. ¡Disfruta de tu delicioso plato de pollo con yogur y verduras!",
            },
          ],

        },
      ],
      recetaActual: null,
    };
  },
  mounted() {
    const nombreReceta = this.$route.params.parametro;
    this.recetaActual = this.recetas.find(
      (receta) => receta.titulo === nombreReceta
    );
  },
  methods: {
    getImatgeUrl(url) {
      return require(`../assets/${url}`);
    },
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
* {
  font-family: 'Open Sans', sans-serif;
  box-sizing: border-box;
}
.recipe-container {
  background-color: #eaf7ea; /* Fondo verde suave */
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  /* Estilos para dispositivos móviles */
  .recipe-container {
    padding: 10px;
  }
}
</style>
