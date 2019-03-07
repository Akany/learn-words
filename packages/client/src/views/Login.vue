<template>
  <Login @login="goToHome()" />
</template>

<script>
import Login from '@/components/Login'

export default {
  components: {
    Login
  },

  methods: {
    goToHome() {
      this.$router.push('/');
    }
  }
}
</script>