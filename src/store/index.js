import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useContract = defineStore('contractAttributes', () => {
    const contractAttributes = reactive({
        // Ganache本地链
        contractAddress: '0x558adfAc1b84042B83545FEfCDfA61BB1BA5b14a',
        contractAbi: '[{"inputs":[{"name":"_post_title","type":"string"},{"name":"_post_content","type":"string"},{"name":"_publish_time","type":"uint256"},{"name":"_picture_hash","type":"string"}],"name":"publish_post","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_comment","type":"string"},{"name":"_post_position","type":"uint8"}],"name":"publish_comment","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"get_posts_titles","outputs":[{"components":[{"name":"post_title","type":"string"},{"name":"post_position","type":"uint8"},{"name":"publish_time","type":"uint256"}],"name":"","type":"tuple[100]"}],"stateMutability":"view","type":"function"},{"inputs":[{"name":"_post_position","type":"uint8"}],"name":"get_post_object","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string[]"}],"stateMutability":"view","type":"function"}]'
    })
    return { contractAttributes }
})

export const usePostsTitles = defineStore('postsTitles', () => {
    const postsTitles = reactive([{
        postTitle: '正在加载帖子',
        postPosition: 0,
        publishTime: 0,
    }])
    return { postsTitles }
})
