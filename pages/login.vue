<template>
  <div class="justify-center">
    <div class="display-2">
      <v-flex class="align-md-center">
        <p>Login</p>
        <v-form ref="form" v-model="valid" @click.prevent>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              :counter="20"
              label="email"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="password"
              :rules="passwordlRules"
              label="yourpassword"
              required
            ></v-text-field>
          </v-col>
        </v-form>
        <v-btn color="success" dark @click="pressed">Login</v-btn>
      </v-flex>
    </div>
  </div>
</template>

<script>
import * as firebase from 'firebase/app'
import 'firebase/auth'
// import Cookie from 'js-cookie'

export default {
  data: () => ({
    valid: true,
    email: '',
    emailRules: [
      (v) => !!v || 'email is required',
      (v) => (v && v.length > 5) || 'email must be less than 5 characters'
    ],
    password: '',
    passwordlRules: [
      (v) => !!v || 'password is required',
      (v) => /.+@.+\..+/.test(v) || 'password must be valid'
    ]
  }),

  methods: {
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    pressed() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          console.log(data)
          this.$router.replace('/admin/dashboard')
        })
        .catch((e) => {
          alert('email or password is worng!')
        })
      console.log(this.pressed)
    }
  }
}
</script>

<style></style>
