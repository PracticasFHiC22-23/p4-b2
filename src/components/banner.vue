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
#banner {
  height: 25vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
}

#banner img {
  position: absolute;
  left: 45%;
  top: 0;
  max-width: 100%;
  max-height: 100%;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

#banner img.active {
  opacity: 1;
}

#prev, #next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2em;
  font-weight: bold;
  color: white;
  background-color: black;
  padding: 0.5em;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

#prev:hover, #next:hover {
  background-color: black;
}

#prev {
  left: 0;
}

#next {
  right: 0;
}

.ofertas-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;

}

.producto {
  position: relative;
  margin-right: 20px;
  width: 50%;
  height: 50%;
}


.producto:last-child{
  margin-right: 0;
}

.producto-img{
  width: 100%;
  height: 80%;
  overflow: hidden;
}

.producto-img img {
  width: 60%;
  height: 60%;
  object-fit: cover;
}

.producto-info {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: black;
  color: white;
  padding: 10px;
  opacity: 0;
  transition: opacity 0.1s ease-in-out;
}

.productoBanner {
  width: 100%;
  height: 100%;
}

.productoBanner:hover .producto-info{
  opacity: 1
}

.producto:hover .producto-info{
  opacity: 1
}

.producto-info h3 {
  margin: 0;
  font-size: 18px;
}

.producto-info a {
  color: white;
  text-decoration: none;
}

.producto-info a:hover {
  text-decoration: underline;
}

</style>
