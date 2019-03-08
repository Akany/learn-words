<template>
  <form class="login screen-center screen-height" @submit.prevent="login(email, password)">
    <div class="form-row">
      <input class="text-input" type="email" name="email"
        placeholder="Enter email" v-model="email" v-autofocus />
    </div>
    <div class="form-row">
      <input class="text-input" type="password" name="password"
        placeholder="Your password" v-model="password" />
    </div>
    <div class="form-row">
      <input class="submit-input" type="submit" name="submit" value="Submit" />
    </div>
  </form>
</template>

<script>
import Autofocus from '@/directives/Autofocus'
export default {
  directives: {
    Autofocus
  },

  data() {
    return {
      email: 'some@ss.ss',
      password: null
    }
  },

  methods: {
    login(email, password) {
      this.$store
        .dispatch('session/login', {email, password})
        .then(() => this.$emit('login'))
    }
  }
}
</script>

<style lang="scss">
.login {
  flex-direction: column;

  width: 80%;
  max-width: 300px;
  margin: auto;
}
</style>