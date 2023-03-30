<template>
    <div>
        <span class="post-title">{{ postObj.postTitle }}</span>
        <div class="demo-image__placeholder">
            <div class="block">
                <el-image :src="postObj.pictureLink" />
            </div>
        </div>
        <div class="post-content">{{ postObj.postContent }}</div>
        <hr />
        <span style="margin-left: 140px;">以下是帖子的评论区</span>
        <hr />
        <ul>
            <li v-for="(comment, index) in postObj.postComments" :key="index">
                {{ comment }}
            </li>
        </ul>
    </div>
    <hr />
    <el-form :model="form" label-width="120px">
        <el-form-item label="回帖">
            <el-input v-model="form.comment" type="textarea" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">发送</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ethers } from 'ethers';
import { onMounted, ref, reactive } from 'vue';
import { useContract } from '../store/index.js'

// 得到合约的address和abi
const contractAddress = useContract().contractAttributes.contractAddress
const contractAbi = useContract().contractAttributes.contractAbi

let postObj = ref({
    postTitle: "正在加载帖子标题",
    postContent: "正在加载帖子内容",
    postComments: ["正在加载帖子评论"],
    pictureLink: ""
})

let postPosition;

const form = reactive({
    comment: '',
})

onMounted(async () => {
    const { params } = useRoute()
    postPosition = params.postPosition
    let provider;
    if (window.ethereum == null) {
        console.log("MetaMask not installed; using read-only defaults")
    } else {
        provider = new ethers.BrowserProvider(window.ethereum)
    }
    const contract = new ethers.Contract(contractAddress, contractAbi, provider);
    const postObjInChain = await contract.get_post_object(postPosition)
    postObj.value = {
        postTitle: postObjInChain[0],
        postContent: postObjInChain[1],
        // pictureLink: "https://ipfs.io/ipfs/" + postObjInChain[2],
        pictureLink: "https://gateway.pinata.cloud/ipfs/" + postObjInChain[2],
        postComments: postObjInChain[3]
    }
})

const onSubmit = async () => {
    let signer;
    let provider;
    if (window.ethereum == null) {
        console.log("MetaMask not installed; using read-only defaults")
    } else {
        provider = new ethers.BrowserProvider(window.ethereum)
        signer = await provider.getSigner();
    }
    const contract = new ethers.Contract(contractAddress, contractAbi, signer)
    const comment = form.comment
    await contract.publish_comment(comment, postPosition)
    location.reload()
}
</script>

<style scoped>
.post-title {
    font-size: 30px;
    text-align: center;
    display: block;
    padding-bottom: 20px;
}

div.el-image {
    padding-bottom: 20px;
    width: 50%;
    height: 50%;
}

.post-content {
    margin-bottom: 20px;
}

.el-form-item {
    margin-top: 10px;
    margin-left: -80px
}

.el-form-item__label {
    padding: 10px 12px 0 0;
}
</style>