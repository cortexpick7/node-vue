import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import './assets/styles/style.scss'
import axios from 'axios'

const cors = require('cors')

createApp(App).use(router, axios, cors()).mount('#app')
