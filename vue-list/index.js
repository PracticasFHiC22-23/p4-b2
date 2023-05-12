const miapp = Vue.createApp({

    data() {
        return {
            //Modificar todos los ejemplos de productos etc...no meter nutricion.html y demas en una carpeta porque no te funcionara la parte de pillar los demas archivos
            //Hacer paginas de Nutricion, Ropa, Accesorios, Blog y rellenar con un par de objetos, lo que se puede hacer es:
            //Unos datos en un js, que tengan un tipo: Nutricion/Ropa/Accesorios/Blog, y ahi solo pillar de esos tipos y q se impriman dichos objetos
            navegacion: [
                { texto: 'Nutricion', urlNav: './nutricion.html', productos: [{nombre: 'Ejemplo1', url: './creatine-monohydrate-biotech-offer.html'}, {nombre: 'Ejemplo2', url: './creatine-monohydrate-biotech-offer.html'}] },
                { texto: 'Ropa', urlNav: '#', productos: [] },
                { texto: 'Accesorios', urlNav: '#', productos: [] },
                { texto: 'Blog', urlNav: '#' , productos: []},
            ],
            objetivos: [
                { texto: 'Objetivos', url: './objetivos.html' },
                { texto: 'Calculadora', url: './calculadora.html' },
            ]
        }
    },
    methods:{

    }
});

miapp.mount("#index");
