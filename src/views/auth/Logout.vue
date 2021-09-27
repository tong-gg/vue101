<template>
  <div>
      <button>Logout</button>
  </div>
</template>

<script>
// import AuthService from "@/services/AuthService"
import AuthUser from '@/store/AuthUser'

export default {
    mounted () {
        // AuthService.logout()
        AuthUser.dispatch('logout')
        console.log(AuthUser.getters.isAuthen)
        this.$router.push('/pokedex') // redirect

    }
}
</script>

<style>

</style>