<template>
  <div class="ma-auto">
    <h1>เมนูอาหาร</h1>
    <v-btn @click="logout">Logout</v-btn>
    <Order />

    <div class="d-flex flex-wrap">
      <v-card
        v-for="items in desserts"
        :key="items.id"
        class="ma-auto mt-5"
        width="300"
        height="310"
        outlined
      >
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="headline"
              >{{ items.name
              }}<v-list-item-subtitle></v-list-item-subtitle>ราคา{{
                items.price
              }}</v-list-item-title
            >

            <v-img
              :src="items.img.data.map((b) => String.fromCharCode(b)).join('')"
              width="170px"
              height="150px"
              class="ma-auto"
            />
          </v-list-item-content>
        </v-list-item>
        <v-card-actions>
          <div class="my-2">
            <v-btn
              v-bind="items"
              :key="items.id"
              v-on:click="selectedToChart(items)"
              color="primary"
              >ใส่ตะกร้า</v-btn
            >
          </div>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import Order from '../components/Order'
import { dbref } from '~/plugins/firebase.js'
export default {
  components: { Order },
  data() {
    return {
      chartbox: [],
      desserts: []
    }
  },
  mounted() {
    this.fetchData()
  },
  created() {
    const user = firebase.auth().currentUser
    if (!user) {
      this.$router.push('/userLogin')
    }
  },

  methods: {
    async fetchData() {
      this.desserts = await this.$axios.$get('/api/moji')
      console.log(this.desserts)
    },
    async selectedToChart(items) {
      const id = items.id
      const name = items.name
      const price = items.price
      const createdAt = new Date()
      console.log(id, name, price)
      await dbref.push({ id, name, price, createdAt })
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace('/userLogin')
          console.log(this.logout)
        })
    }
  }
}
</script>
