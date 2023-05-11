const miapp = Vue.createApp({

    data() {
        return {

            navegacion: [
                { texto: 'Nutricion', url: '#' },
                { texto: 'Ropa', url: '#' },
                { texto: 'Accesorios', url: '#' },
                { texto: 'Blog', url: '#' },
            ],
            objetivos: [
                { texto: 'Objetivos', url: '#' },
                { texto: 'Calculadora', url: '#' },
            ],
        }
    },
    methods:{



    }



});



miapp.mount('#app')
