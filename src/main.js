import Vue from 'vue'
import App from './App.vue'
// import VueTree from 'light-vue-tree'

// Vue.use(VueTree)


console.log('Vue', Vue)

new Vue({
    render: h => h(App)
}).$mount('#app')