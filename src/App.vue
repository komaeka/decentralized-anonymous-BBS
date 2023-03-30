<script setup>
import Header from "./components/Header.vue"
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </div>
</template>

<style>
body {
  display: flex;
  place-items: center;
  flex-direction: column;
  margin-top: 20px;
  margin-left: 440px;
}
</style>

