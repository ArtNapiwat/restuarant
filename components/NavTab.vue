<template>
  <div>
    <div>
      <v-card height="350px">
        <div>
          <v-card-text class="subtitle-3">
            <div v-for="(item, key) in confirmOrder" :key="key" class="mt-6">
              {{ key + 1 }}
              {{ item.name }}
              {{ item.numberPhone }}
              {{ item.locations }}
              {{ item.itemFood[key] }}
              {{ item.itemFood }}
              {{ item.itemFood[key].price }}
            </div>
          </v-card-text>
        </div>
        <v-navigation-drawer absolute permanent right>
          <template v-slot:prepend>
            <v-list-item two-line>
              <v-list-item-avatar>
                <img src="https://randomuser.me/api/portraits/women/81.jpg" />
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>Admin</v-list-item-title>
                <v-list-item-subtitle>Logged In</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>

          <v-divider></v-divider>

          <v-list dense>
            <v-list-item v-for="item in items" :key="item.title">
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-btn @click="logout()">logout</v-btn>
        </v-navigation-drawer>
      </v-card>
    </div>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
import * as firebase from 'firebase/app'
import 'firebase/database'
import { db } from '~/plugins/firebase.js'
import 'firebase/auth'
export default {
  data() {
    return {
      items: [
        { title: 'Menu', icon: 'mdi-home-city' },
        { title: 'Oder', icon: 'mdi-account' },
        { title: 'Users', icon: 'mdi-account-group-outline' }
      ],
      confirmOrder: []
    }
  },
  created() {
    db.on('child_added', (snapshot) => {
      this.confirmOrder.push({ ...snapshot.val(), id: snapshot.key })
      console.log(this.confirmOrder)
    })
  },
  asyncData() {},
  methods: {
    showOrder() {},
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          Cookies.remove('access_token')
          this.$router.replace({ name: 'login' })
          console.log(this.logout)
        })
    }
  }
}
</script>
