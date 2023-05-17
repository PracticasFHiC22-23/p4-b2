<template>
  <div>
    <div><inici :main-page="false"/></div>
    <div v-if="productoEncontrado">
      <h1>{{ productoEncontrado.name }}</h1>
      <div id="product">
        <img :src="getImatgeUrl(productoEncontrado.urlproduct)" alt="">
      </div>
      <h2>Description</h2>
      <div id="text">
        {{ productoEncontrado.description }}
      </div>
      <div id="imgUrl">
        <img :src="getImatgeUrl(productoEncontrado.url)" alt="">
      </div>
    </div>
    <review />
  </div>
</template>

<script>
import router from "../router"
import inici from '../components/inici.vue'
import review from "./review";

export default {
  name: "producte",
  props: ['parametro'],
  data (){
    return {
      productes: [
        {name: 'Whey Gold Standard', description: 'Whey Gold Standard es un producto de suplemento nutricional de alta calidad diseñado especialmente para los entusiastas del fitness y los atletas que buscan maximizar su rendimiento y alcanzar sus objetivos de construcción muscular. Este producto se ha convertido en un referente en la industria de los suplementos debido a su fórmula avanzada y a sus beneficios excepcionales.\n' +
            '\n' +
            'El Whey Gold Standard se elabora utilizando una mezcla exclusiva de proteína de suero de leche de la más alta calidad, extraída mediante un proceso de microfiltración de flujo cruzado para asegurar una pureza y calidad superiores. Esta tecnología de filtración garantiza que el producto final contenga una concentración óptima de proteínas, mientras se minimiza la presencia de grasas, lactosa y otros componentes no deseados.\n' +
            '\n' +
            'Cada porción de Whey Gold Standard proporciona una cantidad significativa de aminoácidos esenciales, incluyendo una cantidad elevada de aminoácidos de cadena ramificada (BCAAs), que son fundamentales para la síntesis de proteínas musculares y la recuperación después del ejercicio intenso. Estos nutrientes esenciales ayudan a promover el crecimiento muscular magro, acelerar la recuperación muscular y mejorar el rendimiento atlético.\n' +
            '\n' +
            'Además de su perfil nutricional excepcional, el Whey Gold Standard se destaca por su delicioso sabor y su fácil mezclabilidad. Está disponible en una amplia variedad de sabores irresistibles, lo que permite a los usuarios disfrutar de su consumo diario sin sacrificar el placer sensorial.\n' +
            '\n' +
            'Con Whey Gold Standard, puedes tener la tranquilidad de estar proporcionando a tu cuerpo la mejor calidad de proteína para apoyar tus metas de fitness y rendimiento deportivo. Ya sea que estés buscando aumentar tu masa muscular, mejorar tu recuperación o mantener una alimentación saludable, este producto se ha ganado su reputación como el estándar de oro en suplementos de proteína de suero de leche.',
             url: 'info_product.png', urlproduct: 'whey-ofert.jpg'},
        {name: 'Creatina MonoHydrate BioTech', description: 'La Creatina MonoHydrate BioTech es un suplemento de alta calidad y pureza que ha ganado popularidad entre los atletas y entusiastas del fitness en todo el mundo. Diseñada para mejorar el rendimiento físico y la fuerza muscular, esta creatina monohidratada ofrece una amplia gama de beneficios para aquellos que desean maximizar su potencial atlético.\n' +
            '\n' +
            'La Creatina MonoHydrate BioTech se caracteriza por su formulación avanzada y su proceso de fabricación cuidadosamente controlado. Utilizando únicamente la creatina monohidratada de grado farmacéutico más pura y de mayor calidad, este suplemento proporciona una fuente confiable y efectiva de creatina para el cuerpo.\n' +
            '\n' +
            'La creatina es un compuesto natural presente en nuestro organismo y desempeña un papel crucial en la producción de energía para los músculos. Al tomar Creatina MonoHydrate BioTech, aumentas los niveles de creatina en tus músculos, lo que resulta en un incremento notable en la fuerza, la potencia y el rendimiento atlético general. Además, la creatina también promueve la hidratación muscular, lo que puede contribuir a un aspecto más voluminoso y definido.\n' +
            '\n' +
            'Una de las ventajas de la Creatina MonoHydrate BioTech es su versatilidad. Puede ser utilizada por una amplia gama de deportistas, desde levantadores de pesas y culturistas hasta corredores, jugadores de fútbol y otros atletas de alto rendimiento. Además, su presentación en polvo permite una fácil mezcla con agua u otras bebidas, lo que la convierte en una opción conveniente y práctica para su consumo diario.\n' +
            '\n' +
            'La Creatina MonoHydrate BioTech se destaca por su pureza y ausencia de aditivos innecesarios. Además, es sometida a rigurosas pruebas de calidad y se fabrica según los más altos estándares de la industria, lo que garantiza un producto confiable y seguro para su uso.\n' +
            '\n' +
            'En resumen, si buscas mejorar tu rendimiento atlético, aumentar tu fuerza y potencia muscular, y obtener una ventaja en tus entrenamientos, la Creatina MonoHydrate BioTech es una opción excelente. Con su pureza, efectividad y respaldo científico, este suplemento te ayudará a alcanzar tus metas deportivas y llevar tus entrenamientos al siguiente nivel.',
            url: 'info_product.png', urlproduct: 'creatina.jpg'},
        {name: 'Creatine MonoHydrate Drasanvi', description: 'La Creatina MonoHydrate BioTech es un suplemento de alta calidad y pureza que ha ganado popularidad entre los atletas y entusiastas del fitness en todo el mundo. Diseñada para mejorar el rendimiento físico y la fuerza muscular, esta creatina monohidratada ofrece una amplia gama de beneficios para aquellos que desean maximizar su potencial atlético.\n' +
            '\n' +
            'La Creatina MonoHydrate BioTech se caracteriza por su formulación avanzada y su proceso de fabricación cuidadosamente controlado. Utilizando únicamente la creatina monohidratada de grado farmacéutico más pura y de mayor calidad, este suplemento proporciona una fuente confiable y efectiva de creatina para el cuerpo.\n' +
            '\n' +
            'La creatina es un compuesto natural presente en nuestro organismo y desempeña un papel crucial en la producción de energía para los músculos. Al tomar Creatina MonoHydrate BioTech, aumentas los niveles de creatina en tus músculos, lo que resulta en un incremento notable en la fuerza, la potencia y el rendimiento atlético general. Además, la creatina también promueve la hidratación muscular, lo que puede contribuir a un aspecto más voluminoso y definido.\n' +
            '\n' +
            'Una de las ventajas de la Creatina MonoHydrate BioTech es su versatilidad. Puede ser utilizada por una amplia gama de deportistas, desde levantadores de pesas y culturistas hasta corredores, jugadores de fútbol y otros atletas de alto rendimiento. Además, su presentación en polvo permite una fácil mezcla con agua u otras bebidas, lo que la convierte en una opción conveniente y práctica para su consumo diario.\n' +
            '\n' +
            'La Creatina MonoHydrate BioTech se destaca por su pureza y ausencia de aditivos innecesarios. Además, es sometida a rigurosas pruebas de calidad y se fabrica según los más altos estándares de la industria, lo que garantiza un producto confiable y seguro para su uso.\n' +
            '\n' +
            'En resumen, si buscas mejorar tu rendimiento atlético, aumentar tu fuerza y potencia muscular, y obtener una ventaja en tus entrenamientos, la Creatina MonoHydrate BioTech es una opción excelente. Con su pureza, efectividad y respaldo científico, este suplemento te ayudará a alcanzar tus metas deportivas y llevar tus entrenamientos al siguiente nivel.',
            url: 'info_product.png', urlproduct: 'creatina.jpg'},
        {name: 'Trembolona', description: 'La trembolona es un potente esteroide anabólico que se ha ganado una reputación formidable en el mundo del culturismo y el rendimiento atlético. Conocido por su alta efectividad en la construcción de masa muscular magra y la mejora del rendimiento físico, la trembolona se ha convertido en una opción popular entre los atletas que buscan llevar sus habilidades y físicos al siguiente nivel.\n' +
            '\n' +
            'Este compuesto se destaca por su capacidad para aumentar significativamente la síntesis de proteínas, lo que resulta en un rápido crecimiento muscular y una mayor fuerza. Además, la trembolona tiene la capacidad única de aumentar la retención de nitrógeno en los tejidos musculares, lo que lleva a un ambiente anabólico óptimo para el desarrollo y la recuperación muscular.\n' +
            '\n' +
            'Además de sus beneficios en la construcción muscular, la trembolona también puede ayudar a mejorar la resistencia y la resistencia, lo que es fundamental para los atletas que desean mantener un alto nivel de rendimiento durante entrenamientos intensos y competencias.\n' +
            '\n' +
            'Si bien la trembolona ofrece notables ventajas, es importante tener en cuenta que su uso debe ser cuidadosamente supervisado y regulado. Dado que es un esteroide de alta potencia, puede tener efectos secundarios significativos si se utiliza incorrectamente. Es esencial que los usuarios consulten a profesionales de la salud y sigan pautas adecuadas de dosificación y ciclo para maximizar los beneficios y minimizar los riesgos asociados.\n' +
            '\n' +
            'En resumen, la trembolona es un esteroide anabólico altamente potente y eficaz que ha ganado popularidad entre los culturistas y atletas por su capacidad para aumentar la masa muscular magra, la fuerza y la resistencia. Sin embargo, su uso debe ser realizado con precaución y bajo supervisión médica para garantizar resultados óptimos y minimizar cualquier efecto secundario potencial.',
            url: 'info_product.png', urlproduct: 'trembolona.jpg'}
      ],
      productoEncontrado: null
    }
  },
  mounted () {
      const producto = this.productes.find(p => p.name === this.parametro);
      if (producto) {
        this.productoEncontrado = producto

      } else {
        this.productoEncontrado = null

      }
    },
  methods: {
    getImatgeUrl(url) {
      return require(`../assets/${url}`);
    },
  }

}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
* {
  font-family: 'Open Sans', sans-serif;
  box-sizing: border-box;
}

</style>
