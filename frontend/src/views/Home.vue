<template>
  <div class="home">
    <!--Add new phone form-->
    <div class="create">
      <div class="form">
              <h1>Add new phone</h1>
      <div class="formPart">
        <input type="text"
        v-model="brand"
        class="refresh"
        placeholder="Brand name">
      </div>
      <div class="formPart">
        <input type="text"
        v-model="model"
        class="refresh"
        placeholder="Model">
      </div>
      <div class="formPart">
        <input type="number"
        v-model="display"
        class="refresh"
        placeholder="Display size">
      </div>
      <div class="formPart">
        <input type="number"
        v-model="price"
        class="refresh"
        placeholder="Price">
      </div>
       <div class="formPart">
        <input type="text"
        v-model="photo"
        class="refresh"
        placeholder="Photo URL">
      </div>
      </div>
      <button class="addPhone" @click="addPhone(brand, model, display, price, photo)"> Add new </button>
    </div>
    <button class="update" v-if="update" @click="updatePush()">Update</button>
    <div class="forPhones">
    <div id="{{datas.id}}" v-for="datas in this.info1" :key="datas.id" class="phoneForm row">
      <div class="imagebox"><img  :src="datas.photo " alt="404" v-if="!update"></div>
      <h1 v-if="!update">{{ datas.brand }}</h1>
      <h2 v-if="!update">{{ datas.model }}</h2>
      <p v-if="!update">Display size: {{ datas.display }}" </p>
      <p v-if="!update">Price: {{ datas.price }} czk</p>
      <input type="text" v-model="brand" v-if="update" placeholder="{{ datas.brand }}">
      <input type="text" v-model="model" v-if="update" placeholder="{{ datas.model }}">
      <input type="number" v-model="display" v-if="update" placeholder="{{ datas.display }}">
      <input type="number" v-model="price" v-if="update" placeholder="{{ datas.price }}">
      <input type="text" v-model="photo" v-if="update" placeholder="{{ datas.photo }}">
      <div class="b">
        <button class="delete" @click="deletePhone(datas.id)">Delete</button>
        <button class="done" v-if="update" @click="updatePhone(brand, model, display, price, photo)">Done</button>
      </div>
    </div>
    </div>
  </div>
</template>

<script>

const apiLink = 'http://localhost:5050/phones'

export default {
  name: 'Home',
  components: {},
  data () {
    return {
      update: null,
      info: null,
      info1: null,
      id: null,
      brand: null,
      model: null,
      display: null,
      price: null,
      photo: null
    }
  },
  methods: {
    // GET All
    async getAllPhones () {
      const axios = require('axios')
      const config = {
        headers: {
          Accept: 'application/json'
        }
      }
      const info = await axios.get(apiLink, config)
      this.info1 = info.data
    },
    // GET by id
    async getById (id) {
      const axios = require('axios')
      const config = {
        headers: {
          Accept: 'application/json'
        }
      }
      const info = await axios.get(apiLink + '/' + id, config)
      this.info = info.data
      console.log(this.info[0])
    },
    // POST
    async addPhone (brand, model, display, price, photo) {
      const axios = require('axios')
      axios.post(apiLink, {
        brand: brand,
        model: model,
        display: display,
        price: price,
        photo: photo
      }
      )
      this.photo = null
      this.brand = null
      this.model = null
      this.display = null
      this.price = null
      this.getAllPhones()
      window.location.reload()
    },
    // DELETE
    async deletePhone (id) {
      const axios = require('axios')
      await axios.delete(apiLink + '/' + id, {
        'Content-Type': 'application/json'
      })
      this.getAllPhones()
    },
    // PUT //TODO Make this work
    async updatePhone (id, brand, model, display, price, photo) {
      const axios = require('axios')
      axios.put(apiLink + '/' + id, {
        brand: brand,
        model: model,
        display: display,
        price: price,
        photo: photo
      }
      )
      this.getAllPhones()
      this.photo = null
      this.brand = null
      this.model = null
      this.display = null
      this.price = null
      this.update = !this.update
    },
    updatePush (id) {
      this.update = !this.update
    }
  },
  beforeMount () {
    this.getAllPhones()
  }
}
</script>
