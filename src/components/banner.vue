<template>
  <div id="banner">
    <img src="../assets/creatine-offer.jpg">
    <img src="../assets/gorra-offer.jpg">
    <img src="../assets/whey-offer.jpg">
    <button id="prev" @click="prevImage"><</button>
    <button id="next" @click="nextImage">></button>
  </div>
</template>

<script>
export default {
  data(){
    return {
      images : null,
      prevBtn : null,
      nextBtn : null,
      index : 0,
    };
  },
  mounted(){
    this.images = document.querySelectorAll('#banner img');
    this.prevBtn = document.querySelector('#prev');
    this.nextBtn = document.querySelector('#next');
  },
  name: "banner",
  methods : {
    showImage() {
      this.images.forEach(image => {
        image.classList.remove('active');
      });
      this.images[this.index].classList.add('active');
    },
    nextImage() {
      this.index++;
      if (this.index >= this.images.length) {
        this.index = 0;
      }
      this.showImage();
    },
    prevImage() {
      this.index--;
      if (this.index < 0) {
        this.index = this.images.length - 1;
      }
      this.showImage();
    },

  }
}
</script>

<style scoped>
  @import '../../styles/index.css';
</style>
