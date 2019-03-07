<template>
  <div>
    <router-view/>
  </div>
</template>

<style lang="scss">
.text-input {
  padding: 10px 15px;
  border: solid #755353 1px;
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

html * {
  box-sizing: border-box;
}
</style>
