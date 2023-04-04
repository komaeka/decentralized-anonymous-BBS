<template>
  <div class="example-pagination-block">
    <div class="example-demonstration">
      <ul>
        <li v-for="postTitle in currentTableData" :key="postTitle.postPosition">
          <RouterLink :to="'/post/' + postTitle.postPosition">
            {{ postTitle.postTitle }}
          </RouterLink>
        </li>
      </ul>
    </div>
    <el-pagination layout="prev, pager, next" :total="tableData.length" :page-size="pageSize"
      v-model:current-page="currentPage" v-on:current-change="currentChange" />
  </div>
</template>

<script setup>
import { ethers } from 'ethers';
import { onMounted, ref } from 'vue';
import { usePostsTitles, useContract } from '../store/index.js'
import { RouterLink } from 'vue-router';

// 得到合约的address和abi
const contractAddress = useContract().contractAttributes.contractAddress
const contractAbi = useContract().contractAttributes.contractAbi

// 从状态中读取帖子列表
const pageSize = 10
let tableData = usePostsTitles().postsTitles
let currentPage = ref(1)
let currentTableData = ref(tableData)

onMounted(async () => {
  // console.log(contractAddress, contractAbi)
  let provider;
  if (window.ethereum == null) {
    console.log("MetaMask not installed; using read-only defaults")
  } else {
    provider = new ethers.BrowserProvider(window.ethereum)
  }
  const contract = new ethers.Contract(contractAddress, contractAbi, provider);
  const postsTitlesObj = await contract.get_posts_titles()
  // 筛选出元素不为空字符串的数组
  const filteredPostsTitlesObj = postsTitlesObj.filter(([title, ...rest]) => title !== '');
  if (filteredPostsTitlesObj.length == 0) {
    currentTableData.value = [{
      postTitle: '目前暂无帖子',
      postPosition: 0,
      publishTime: 0,
    }]
  } else {
    // 将剩余的每个数组转化为对象
    const preSortPostsTitlesObj = filteredPostsTitlesObj.map(([postTitle, ...rest]) => ({ postTitle: postTitle, postPosition: rest[0], publishTime: rest[1] }));
    // 将bigint转化为Number类型，并按照发布时间重新排序帖子列表，新发布的帖子排在前面
    const sortedPosts = preSortPostsTitlesObj.map(post => ({
      postTitle: post.postTitle,
      postPosition: Number(post.postPosition),
      publishTime: Number(post.publishTime)
    })).sort((a, b) => b.publishTime - a.publishTime);

    // 把查到的帖子列表维护进状态
    const storePostsTitles = usePostsTitles()
    storePostsTitles.postsTitles = sortedPosts

    tableData = sortedPosts

    var postsTitles = new Array()
    for (let i = 0; i < sortedPosts.length; i++) {
      postsTitles.push(sortedPosts[i])
    }

    var postsTitlesList = new Array()
    for (let i = 0; i < postsTitles.length; i += pageSize) {
      postsTitlesList.push(postsTitles.slice(i, i + pageSize))
    }

    currentTableData.value = postsTitlesList[currentPage.value - 1]

  }
})

function currentChange() {
  const storePostsTitles = usePostsTitles()
  var postsTitles = new Array()
  for (let i = 0; i < storePostsTitles.postsTitles.length; i++) {
    postsTitles.push(storePostsTitles.postsTitles[i])
  }

  var postsTitlesList = new Array()
  for (let i = 0; i < postsTitles.length; i += pageSize) {
    postsTitlesList.push(postsTitles.slice(i, i + pageSize))
  }
  currentTableData.value = postsTitlesList[currentPage.value - 1]
}
</script>

<style scoped>
.example-pagination-block+.example-pagination-block {
  margin-top: 10px;
}

.example-pagination-block .example-demonstration {
  margin-bottom: 16px;
}

a,
.green {
  color: hsl(0deg 0% 0%);
  font-size: large;
  padding: 3px 260px -1px 10px
}

ul {
  list-style-type: none;
  padding: 1px
}

.el-pagination {
  padding: 20px 70px 20px 160px;
  --el-pagination-font-size: 16px;
}
</style>