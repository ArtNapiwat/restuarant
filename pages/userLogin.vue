<template>
  <div class="text-center">
    <h1>ล็อคอินก่อนเข้าร้านค้า</h1>
    <div class="mt-10">
      <v-btn
        class="blue darken-4"
        @click="loginFacebook"
        height="60"
        width="700"
        >Facebook
      </v-btn>
    </div>
  </div>
</template>

<script>
import * as firebase from 'firebase/app'
import 'firebase/auth'
export default {
  data() {
    return {}
  },
  methods: {
    loginFacebook() {
      const provide = new firebase.auth.FacebookAuthProvider()
      firebase
        .auth()
        .signInWithPopup(provide)
        .then((result) => {
          // create user in db
          const obj = {
            facebook_id: result.additionalUserInfo.profile.id,
            fullname: result.additionalUserInfo.profile.name,
            email: result.additionalUserInfo.profile.email,
            profile_image: result.user.photoURL + '?height=500',
            user_type_id: 1
          }
          this.$router.replace('/')
          console.log(obj)
        })
        .catch((err) => {
          alert('Oops. ' + err.message)
        })

      console.log('LoggedIn..')
    }
  }
}
</script>

<style></style>
