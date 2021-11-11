const pwa = {
    data () {
        return {
            title: "Aplicación contador",
            counter: 0
        }
    },
    methods: {
        updateCount (option = "add", limit = 1) {
            if (option === "add") {
                this.counter += limit;
            } else {
                this.counter -= limit;
            }
        },
        incrementar () {
            this.counter++;
        },
        decrementar () {
            this.counter--;
        }
    }
}

Vue.createApp(pwa).mount('#app')