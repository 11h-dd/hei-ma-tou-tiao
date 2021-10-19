<template>
  <div>

        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="false">
      <!-- 循环渲染文章的列表 -->
    <ArtItem
      v-for="item in articleList"
      :key="item.art_id"
      :article="item"
      @remove-article="removeArticle"
    ></ArtItem>
    </van-list>
  </div>
</template>

<script>
import { getArticleListAPI } from "../../api/hoemAPI";
import ArtItem from "../ArtItem/ArtItem.vue";
export default {
  // 大驼峰命名法：每个单词的首字母大写
  name: "ArticleList",
  props: {
    channelid: {
      type: Number,
      require: true,
    },
    chanenlname: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      //文章数据
      articleList: [],
      //时间戳
      pre_timestamp: Date.now(),
      // loading 表示是否正在进行上拉加载的请求
      //   每当触发 List 组件的上拉加载更多时，List 组件会自动把 loading 设为 true
      //   每当下一页的数据请求回来以后，需要程序员手动的把 loading 设为 false，
      //   否则：再次触发上拉加载更多时，不会发起请求！！
      loading: false,
      // finished 表示所有数据是否加载完毕
      //    false 表示还有下一页的数据
      //    true  表示所有数据都已加载完毕
      finished: false,
    };
  },
  components: {
    ArtItem,
  },
  methods: {
    onLoad(){
      console.log('上拉完成')
      this.initcleList()
    },
    async initcleList() {
      const { data: res } = await getArticleListAPI(
        this.channelid,
        this.pre_timestamp
      );
      console.log(res);
      if (res.message === "OK") {
        console.log(this.channelid)
        this.articleList = [...this.articleList, ...res.data.results];
        this.pre_timestamp = res.data.pre_timestamp;
        this.loading = false
        console.log(this.articleList)
        if(res.data.pre_timestamp == null) {
          this.finished = true
        }
      }
    },
    removeArticle(id){
      this.articleList = this.articleList.filter(item => item.art_id != id)
    }
  },
  created() {
    this.initcleList();
  },
};
</script>

<style lang="less" scoped></style>
