<template>
  <div class="home_container">
    <folder />
    <fat />
    <file-view />
    <bit-map />
  </div>
</template>

<script setup>
import {ref} from "vue"

</script>

<style lang="scss" scoped> 
.home_container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 10px;
}
</style>