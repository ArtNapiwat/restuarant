<template>
  <div class="ma-auto">
    <h1>เมนูอาหาร</h1>

    <div class="d-flex flex-wrap">
      <v-card
        v-for="items in desserts"
        :key="items.id"
        class="ma-auto"
        max-width="ma-2"
        outlined
      >
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1">{{
              items.name
            }}</v-list-item-title>
            <v-list-item-subtitle class="caption">{{
              items.price
            }}</v-list-item-subtitle>
          </v-list-item-content>
          <img :src="items.img" />
        </v-list-item>
        <v-card-actions>
          <v-btn depressed small color="primary">ใส่ตะกร้า</v-btn>
          <v-btn depressed small color="error">ยกเลิก</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      desserts: []
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.desserts = await this.$axios.$get('/api/moji')
      console.log(this.desserts)
    }
  }
}
</script>
