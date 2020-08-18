import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import "tabulator-tables/dist/css/tabulator.min.css";

Vue.config.productionTip = false;

new Vue({
    vuetify,
    render: h => h(App)
}).$mount("#app");
