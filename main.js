import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false;
// Vue.prototype.tempUrl = 'http://122.112.225.34:8090/';
// Vue.prototype.tempUrl = 'http://localhost:8090/';

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
