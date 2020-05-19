<template>
  <v-row justify="end">
    <v-btn color="primary" dark @click.stop="dialog = true">
      ตะกร้าสินค้า
    </v-btn>

    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="headline">รายการสั่งซื้ออาหารทั้งหมด</v-card-title>

        <v-card-text class="subtitle-3">
          <div v-for="(item, key) in chartbox" :key="key" class="mt-6">
            {{ key + 1 }}
            {{ item.name }} ราคา
            {{ item.price }}
            {{ item.createdAt }}
            <v-btn
              class=""
              depressed
              small
              color="error"
              v-bind="item"
              @click="onDelete(item)"
              >delete</v-btn
            >
          </div>
        </v-card-text>
        <v-card-text>
          <div class="title">
            ราคารวมทั้งหมด :
            {{ total() }}
            บาท
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="dialog = false">
            ดูสินค้าต่อ
          </v-btn>

          <v-btn color="green darken-1" text @click="dialog = false">
            สั่งซื้อ
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import 'firebase/database'
import { dbref } from '~/plugins/firebase.js'

export default {
  data() {
    return {
      dialog: false,
      chartbox: []
    }
  },
  created() {
    dbref.on('child_added', (snapshot) => {
      this.chartbox.push({ ...snapshot.val(), id: snapshot.key })
      // console.log(this.chartbox)
    })
    dbref.on('child_removed', (snapshot) => {
      const deleteItembox = this.chartbox.find(
        (item) => item.id === snapshot.key
      )
      const index = this.chartbox.indexOf(deleteItembox)
      this.chartbox.splice(index, 1)
    })
  },
  methods: {
    async onDelete(item) {
      await dbref.child(item.id).remove()
      console.log('REMOVESUCCESS!')
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
