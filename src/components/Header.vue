<template>
    <el-row class="mb-4">
        <el-button type="primary" class="home-button">
            <RouterLink to="/">首页</RouterLink>
        </el-button>
        <el-button type="primary" class="publish-button">
            <RouterLink to="/publish">发帖</RouterLink>
        </el-button>
    </el-row>
</template>
  
<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
a,
.green {
    color: hsl(0deg 0% 100%);
    font-size: 25px;
}

.el-button {
    padding: 20px 30px;
}

.el-button+.el-button {
    margin-left: 175px;
}
</style>