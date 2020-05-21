<template>
  <div class="text-center">
    <div>
      <h2>ข้อมูลผู้ซื้อ และ จัดส่ง</h2>
      <v-dialog v-model="dialog" max-width="500">
        <v-card>
          <v-card-title class="headline"
            >รายการสั่งซื้ออาหารทั้งหมด</v-card-title
          >

          <v-card-text class="subtitle-3">
            <div v-for="(item, key) in chartbox" :key="key" class="mt-6">
              {{ key + 1 }}
              {{ item.name }} ราคา
              {{ item.price }}
              {{ item.createdAt }}
            </div>
          </v-card-text>
          <v-card-text>
            <div class="title">
              ราคารวมทั้งหมด :
              {{ total() }}
              บาท
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-container class="justify-start">
        <v-form @submit.prevent="addsubmit">
          <v-text-field
            v-model="reciveName"
            label="ชื่อผู้รับ"
            class="ma-1"
          ></v-text-field>
          <v-text-field
            v-model="numberPhone"
            label="เบอร์โทรติดต่อ"
            class="ma-2"
          ></v-text-field>
          <v-text-field
            v-model="locations"
            label="สถาที่จัดส่ง"
            class="ma-2"
          ></v-text-field>
          <v-btn color="primary" dark @click.stop="dialog = true">
            ดูออเดอร์ทั้งหมด
          </v-btn>
        </v-form>
      </v-container>
      <v-btn color="success" class="mr-4" @click="addsubmit(item)"
        >Confirm</v-btn
      >
    </div>
  </div>
</template>

<script>
import 'firebase/database'
import { dbref, db } from '~/plugins/firebase.js'

export default {
  data() {
    return {
      reciveName: '',
      locations: '',
      numberPhone: '',
      chartbox: [],
      confirmOrder: [],
      dialog: false
    }
  },
  created() {
    dbref.on('child_added', (snapshot) => {
      this.chartbox.push({ ...snapshot.val(), id: snapshot.key })
      console.log(this.chartbox)
    })
    db.on('child_added', (snapshot) => {
      this.confirmOrder.push({ ...snapshot.val(), id: snapshot.key })
      console.log(this.confirmOrder)
    })
  },
  methods: {
    async addsubmit(chartbox) {
      const itemFood = this.chartbox
      const reciveName = this.reciveName
      const locations = this.locations
      const numberPhone = this.numberPhone

      await db.push({ reciveName, locations, numberPhone, itemFood })
      console.log(
        'ConfirmOrder',
        this.reciveName,
        this.locations,
        this.numberPhone + 'SEND DATA SUCCESS!!',
        this.confirmOrder
      )
      this.reciveName = ''
      this.locations = ''
      this.numberPhone = ''
      this.$router.replace('/')
    },
    total() {
      let total = 0
      this.chartbox.forEach(function(item) {
        total += item.price
        console.log('total is :', total)
      })
      return total
    }
  }
}
</script>

<style></style>
