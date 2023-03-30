<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="帖子标题">
      <el-input v-model="form.postTitle" />
    </el-form-item>
    <input type="file" @change="upLoadPicture">
    <el-form-item label="帖子内容">
      <el-input v-model="form.postContent" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">发布</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive } from 'vue'
import { ethers } from 'ethers';
import { useRouter } from 'vue-router';
import { useContract } from '../store/index.js'
import axios from 'axios'

// 得到合约的address和abi
const contractAddress = useContract().contractAttributes.contractAddress
const contractAbi = useContract().contractAttributes.contractAbi

const router = useRouter()
const form = reactive({
  postTitle: '',
  postContent: '',
})

// 定义上传后的图片哈希
let PictureIpfsHash = ''
// 上传按钮
const upLoadPicture = async (event) => {
  console.log(event.target.files[0])

  // 设置 Pinata key and secret
  const key = 'bc27a20f63d8fa71e04b'
  const secret = 'dc4d320fc5c7b5e48f545b6a63e4543abd54ac404111d82215c7e9a918d99bbd'

  const formData = new FormData();
  formData.append('file', event.target.files[0])

  try {
    const response = await axios({
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
      data: formData,
      headers: {
        'pinata_api_key': key,
        'pinata_secret_api_key': secret,
        "Content-Type": "multipart/form-data"
      }
    })
    PictureIpfsHash = response.data.IpfsHash
    console.log(PictureIpfsHash)
    alert("图片上传成功")
    // console.log("上传成功")
  } catch (error) {
    console.log(error)
  }
}

// 发帖按钮
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
  const postTitle = form.postTitle
  const postContent = form.postContent
  const publishTime = Number(new Date())
  const pictureHash = PictureIpfsHash
  console.log(postTitle, postContent, publishTime, pictureHash)
  await contract.publish_post(postTitle, postContent, publishTime, pictureHash)
  router.push('/')
}
</script>

<style scoped>
input {
  margin-left: 50px;
  margin-bottom: 15px;
}
</style>