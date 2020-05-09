<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">เพิ่มข้อมูลขนมโมจิ</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="moji.name" label="Name*" required />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <input
                type="file"
                @change="previewImage"
                accept="image/*"
                enctype="multipart/form-data"
              />
              <div class="image-preview">
                <img class="preview" :src="img" />
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="moji.price"
                label="Price*"
                type="number"
                required
              />
            </v-col>
          </v-row>
          <small>*indicates required field</small>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="dialog = false">
          CLOSE
        </v-btn>
        <v-btn color="blue darken-1" text @click.prevent="save">
          SAVE
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      mode: '',
      moji: {
        name: '',
        img: null,
        price: ''
      }
    }
  },
  methods: {
    open(mode, data) {
      this.dialog = true
      this.mode = mode
      if (data) {
        this.moji = { ...data }
      }
    },
    close() {
      this.dialog = false
      this.clearData()
    },
    clearData() {
      this.moji = {
        name: '',
        img: null,
        price: ''
      }
    },
    previewImage(e) {
      const file = event.target
      if (file.files && file.files[0]) {
        const reader = new FileReader()

        reader.onload = (file) => {
          this.moji.img = reader.result
          console.log('RESULT', reader.result)
        }
        reader.readAsDataURL(file.files[0])
      }

      console.log(event)
      this.moji.img = event.target.files[0]
    },
    save(e) {
      this.$emit(this.mode, this.moji)
    }
  }
}
</script>
<style scoped>
.file-upload-form,
.image-preview {
  padding: 20px;
}
img.preview {
  width: 200px;
  background-color: white;
  border: 1px solid #ddd;
  padding: 5px;
}
</style>
