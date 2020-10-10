import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@/styles.sass' // Add this line

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#2a429e',
                accent: '#374785'
            },
        },
    },
});
