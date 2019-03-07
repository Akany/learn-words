<template>
  <transition mode="out-in">
    <router-view/>
  </transition>
</template>

<style lang="scss">
@import '@/scss/colors.scss';

.text-input {
  padding: 10px 15px;
  border: solid $secondary 1px;
  width: 100%;
}

.submit-input {
  padding: 10px 15px;
  border: none;
  background: $primary;
  color: white;
  width: 100%;
}

.form-row {
  margin-bottom: 15px;
  width: 100%;
}

.screen-height {
  height: 100vh;
}

.full-width {
  width: 100%;
}

.screen-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.v-enter {
  opacity: 0;
  transform: translateY(-100%);
}

.v-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.v-enter-active {
  transition: transform .5s, opacity .5s;
  transition-timing-function: ease-out;
}

.v-leave {
  opacity: 1;
  transform: translateX(0);
}

.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.v-leave-active {
  transition: transform .5s, opacity .5s;
  transition-timing-function: ease-in;
}

html * {
  box-sizing: border-box;
}
</style>
