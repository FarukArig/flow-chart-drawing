import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { Message } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(Message);
Vue.prototype.$message = Message;

Vue.config.productionTip = false;

new Vue({
    router,
    render: (h) => h(App),
}).$mount("#app");
