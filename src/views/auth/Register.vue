<template>
<div>
  <h1>Register</h1>

  <form @submit.prevent="register">
      <div>
          <label for="username">Username</label>
          <input v-model="form.username" type="text" autocomplete="off" placeholder="username">
      </div>

      <div>
          <label for="username">Email</label>
          <input v-model="form.email" type="text" autocomplete="off" placeholder="email">
      </div>

      <div>
          <label for="username">Password</label>
          <input v-model="form.password" type="password" autocomplete="off" placeholder="email">
      </div>

      <div>
          <button type="submit">Register</button>
      </div>
      
  </form>
</div>
</template>

<script>
import AuthService from '@/services/AuthService'
import AuthUser from '@/store/AuthUser'

export default {
    data() {
        return {
            form: {
                username: '',
                email: '',
                password: ''
            }
        }
    },
    methods: {
        async register () {
            // let res = await AuthService.register(this.form)      
            try {
            let res = await AuthUser.dispatch('register', this.form)
            if (res.succes) {
                this.$swal("Register Success", `Welcome ${res.user.username}`, "success")
                this.$router.push("/pokedex")
            }
            } catch (e) {
                return {
                    success: false,
                    message: e.response.data.message[0].messages[0].message
                }
            }
        }
    }

}
</script>

<style>

</style>