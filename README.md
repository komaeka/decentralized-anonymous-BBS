# 基于以太坊智能合约的去中心化匿名论坛系统
# A decentralized anonymous BBS system based on Ethereum smart contract
本开源项目为论文《基于以太坊智能合约的去中心化匿名论坛系统的设计与实现》的源代码，论文链接如下：https://kns.cnki.net/kcms2/article/abstract?v=3uoqIhG8C44YLTlOAiTRKu87-SJxoEJu6LL9TJzd50nau9yXZ3-eqTs28o7q0k80z_dSWTzU_nTWQnAp3ka23T1usFoFQeVS&uniplatform=NZKPT&src=copy
## 项目介绍
* 本项目是一个基于以太坊平台，使用Vyper语言作为智能合约实现的匿名论坛系统
* smart-contract目录中的DABBS.vy为智能合约代码文件
* src目录为前端代码目录
* main分支和sepolia分支的不同之处仅为针对的测试平台不同，main分支中的前端部分会调用Ganache中的智能合约，main分支中的前端部分会调用sepolia测试链中的智能合约
## 启动项目
1. 克隆项目到本地（根据需要选择main分支或者sepolia分支）
2. 运行`npm install`安装有关的依赖包
3. 将DABBS.vy部署到Ganache本地测试链或者sepolia测试链
4. 修改src/router/index.js文件中**contractAddress**字段，改为自己部署的智能合约地址
5. 修改src/views/PublishView.vue文件中**upLoadPicture**函数中的*key*和*secret*字段,改为[Pinata](https://www.pinata.cloud/)中自己的key和secret
6. 运行`npm run dev`启动项目
