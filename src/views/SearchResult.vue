<template>
  <div class="search-result-container">
    <!-- 点击实现后退效果 -->
    <van-nav-bar
      title="搜索结果"
      left-arrow
      @click-left="$router.back()"
      fixed
    />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多数据了"
      :immediate-check="false"
      @load="onLoad"
    >
      <ArticleItem
        v-for="item in searchList"
        :key="item.art_id.toString()"
        :article="item"
        :closable="false"
      ></ArticleItem>
    </van-list>
  </div>
</template>

<script>
import { getSearchResultAPI } from "../api/searchAPI";
import ArticleItem from "../components/ArticleItem/ArticleItem.vue";

export default {
  name: "SearchResult",
  props: ["kw"],
  components: {
    ArticleItem,
  },
  data() {
    return {
      page: 1,
      // 搜索的结果
      searchList: [],
      // 是否正在进行上拉加载的数据请求
      loading: false,
      // 所有数据是否已经加载完毕
      finished: false,
    };
  },
  methods: {
    async initSearchResult() {
      const { data: res } = await getSearchResultAPI(this.kw, this.page);
      // console.log(data);
      if (res.message === "OK") {
        // console.log('搜索结果:', res)
        this.searchList = [...res.data.results, ...this.searchList];
        // console.log('这是请求的结果', this.searchList)

        this.loading = false;

        if (res.data.results.length === 0) {
          this.finished = true;
        }

        this.page++;
      }
    },
    onLoad() {
      this.initSearchResult();
    },
  },
  created() {
    this.initSearchResult();
  },
};
</script>

<style lang="less" scoped>
.search-result-container {
  padding-top: 46px;
}
</style>
