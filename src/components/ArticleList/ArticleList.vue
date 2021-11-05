<template>
  <div id="article-list">
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="isloading" @refresh="onRefresh" :disabled="finished">
      <!-- 上拉加载更多 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多数据了"
        :immediate-check="false"
        @load="onLoad"
      >
        <!-- 循环渲染文章的列表 -->
        <ArticleItem
          v-for="item in articleList"
          :key="item.art_id"
          :article="item"
          @removeArticle="removeArticle"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// 按需导入 API 接口
import { getArticleListAPI } from "../../api/homeAPI";
import ArticleItem from "../ArticleItem/ArticleItem.vue";
export default {
  name: "ArticleList",
  props: {
    channelid: {
      type: Number, //数值类型
      required: true, //必填项
    },
  },
  components: {
    ArticleItem,
  },
  data() {
    return {
      // 文章列表的数组
      articleList: [],
      // 时间戳。初始的默认值为当前的时间戳
      preTimestamp: Date.now(),

      // 代表数据加载完毕了(vant自动的行为)
      loading: false,
      // finished 表示所有数据是否加载完毕
      //    false 表示还有下一页的数据
      //    true  表示所有数据都已加载完毕
      finished: false,
      //是否正在进行下拉刷新的请求
      isloading: false,
    };
  },
  methods: {
    // 初始化文章的列表数据
    
    async initArticleList() {
      const { data: res } = await getArticleListAPI(
        this.channelid,
        this.preTimestamp
      );

      if (res.message === 'OK') {
        this.preTimestamp = res.data.pre_timestamp
        this.articleList = [...this.articleList, ...res.data.results]
        this.loading = false
        if (res.data.pre_timestamp === null) {
          this.finished = true
        }
      }
    },
    onLoad() {
      console.log("上拉加载数据触发");
      this.initArticleList();
    },
    //下拉刷新
    onRefresh() {
      console.log("触发了下拉刷新");
      this.initArticleList(true);
    },
    removeArticle(id){
      console.log('你要删除的文章ID:', id);
      this.articleList=this.articleList.filter(item=>item.art_id !==id)

      
    }
  },
  created() {
    this.initArticleList();
  },
};
</script>

<style lang="less" scoped>
</style>