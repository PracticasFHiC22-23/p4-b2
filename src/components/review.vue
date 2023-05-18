<template>
  <div>
    <h2>Reviews</h2>
    <div class="card-container">
      <div class="card" v-for="review in reviews" :key="review.id">
        <h3>{{ review.user }}</h3>
        <p>{{ review.comment }}</p>
        <div class="rating">
          <span
            v-for="n in 5"
            :key="n"
            :class="{ 'filled': n <= review.rating }"
            @click="updateRating(review, n)"
          >
            ★
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "review",
  data() {
    return {
      reviews: [
        { id: 1, user: "ArturoPichaCurta", comment: "Buen Producto" },
        { id: 2, user: "Leuis", comment: "Calidad Precio de lkos" },
        { id: 3, user: "Ziji69", comment: "Ploducto mu balato pa lo que es" },
        { id: 4, user: "NilFollaPoco", comment: "Me han ayudado mucho con el soporte" }
      ]
    };
  },
  methods: {
    updateRating(review, rating) {
      review.rating = rating;
    }
  }
}
</script>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
}

.card {
  width: 300px;
  margin: 10px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 5px;
}

.rating {
  font-size: 24px;
  color: #ffd700; /* Color de las estrellas llenas */
}

.rating .filled {
  color: #f9ca24; /* Color de las estrellas rellenadas */
}
</style>
