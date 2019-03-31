<template>
<form class="full-width" @submit.prevent="addWord">
  <div class="form-row">
    <input type="text" name="word" class="text-input full-width" @input="onInput" :value="word" v-autofocus />
  </div>
  <div class="form-row">
    <button class="full-width submit-input" type="submit" :disabled="loading">Store It</button>
  </div>
</form>
</template>

<script>
import Autofocus from '@/directives/Autofocus'
export default {
  directives: {
    Autofocus
  },

  computed: {
    word() {
      return this.$store.getters['word/value']
    },
    loading() {
      return this.$store.getters['word/loading']
    }
  },

  methods: {
    addWord(event) {
      this.$store.dispatch('word/store')
    },
    onInput(event) {
      this.$store.commit('word/set', event.target.value)
    }
  }
};
</script>