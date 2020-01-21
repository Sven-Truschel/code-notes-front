import Vue from 'vue'

import './styles/quasar.sass'
import 'quasar/dist/quasar.ie.polyfills'
import '@quasar/extras/material-icons/material-icons.css'
import { Quasar } from 'quasar'

Vue.use(Quasar, {
    config: {
        brand: {
            primary: '#383299',
            secondary: '#6721b8',
            accent: '#9C27B0',

            dark: '#121212',

            positive: '#26ab6a',
            negative: '#C10015',
            info: '#31CCEC',
            warning: '#F2C037'
        }
    },
    components: { /* not needed if importStrategy is not 'manual' */ },
    directives: { /* not needed if importStrategy is not 'manual' */ },
    plugins: {}
})