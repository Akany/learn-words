<template>
  <div class="screen-center screen-height">
    <div class="preloader">
      <div class="column"></div>
      <div class="column"></div>
      <div class="column"></div>
      <div class="column"></div>
      <div class="column"></div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '@/scss/colors.scss';

$columns-count: 5;

.preloader {
  height: 75px;
  width: 75px;
  display: flex;
  justify-content: space-around;

  .column {
    width: 10px;
    height: 100%;
    background: red;
    animation: bounce-height 1.5s infinite;
    transform: scaleY(0);
    transform-origin: bottom;

    @for $index from 0 to $columns-count {
      &:nth-child(#{$index + 1}) {
        animation-delay: .1s * $index;
      }
    }
    
  }
}

@keyframes bounce-height {
  0% {
    transform: scaleY(0);
    background: $secondary;
  }

  50% {
    transform: scaleY(1);
    background: $primary;
  }

  100% {
    transform: scaleY(0);
    background: $secondary;
  }
}
</style>