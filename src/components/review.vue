<template>
  <div>
    <h2>Reviews</h2>
    <ul>
      <li v-for="review in reviews" :key="review.id">
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
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "review",
  data() {
    return {
      reviews: [
        { id: 1, user: "ArturoPichaCurta", comment: "Comentario 1" },
        { id: 2, user: "Leuis", comment: "Comentario 2" },
        { id: 3, user: "Ziji69", comment: "Comentario 3" },
        { id: 4, user: "NilMaricus", comment: "Comentario 4" }
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
.rating {
  font-size: 24px;
  color: #ffd700; /* Color de las estrellas llenas */
}

.rating .filled {
  color: #f9ca24; /* Color de las estrellas rellenadas */
}
</style>
