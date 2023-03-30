import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useContract = defineStore('contractAttributes', () => {
    const contractAttributes = reactive({
        // 测试合约
        // contractAddress: '0xFCe59FfF225D8F2da36230b57473fFec14581bea',
        // 正式合约
        contractAddress: '0xBd9AA5E6eC442CA8dE74BF8D829e95c3b38b96c0',
        contractAbi: '[{"inputs":[],"outputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"name":"_post_title","type":"string"},{"name":"_post_content","type":"string"},{"name":"_publish_time","type":"uint256"},{"name":"_picture_hash","type":"string"}],"name":"publish_post","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_comment","type":"string"},{"name":"_post_position","type":"uint8"}],"name":"publish_comment","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"get_posts_titles","outputs":[{"components":[{"name":"post_title","type":"string"},{"name":"post_position","type":"uint8"},{"name":"publish_time","type":"uint256"}],"name":"","type":"tuple[100]"}],"stateMutability":"view","type":"function"},{"inputs":[{"name":"_post_position","type":"uint8"}],"name":"get_post_object","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string[]"}],"stateMutability":"view","type":"function"}]'
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
