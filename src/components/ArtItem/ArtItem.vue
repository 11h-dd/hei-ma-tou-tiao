<template>
  <div>
    <van-cell>
      <!-- 标题区域的插槽 -->
      <template #title>
        <div class="title-box">
          <!-- 标题 -->
          <span>{{ article.title }}</span>
          <!-- 单张图片 -->
          <img
            alt=""
            class="thumb"
            v-if="article.cover.type === 1"
            v-lazy="article.cover.images[0]"
          />
        </div>
        <!-- 三张图片 -->
        <div class="thumb-box" v-if="article.cover.type === 3">
          <img
            alt=""
            class="thumb"
            v-for="(item, index) in article.cover.images"
            :key="index"
            v-lazy="item"
          />
        </div>
      </template>
      <!-- label 区域的插槽 -->
      <template #label>
        <div class="label-box">
          <span
            >{{ article.aut_name }} &nbsp;&nbsp; {{ article.comm_count }}评论
            &nbsp;&nbsp; 发布于{{ article.pubdate | dateFormat }}</span
          >
          <!-- 关闭按钮 -->
          <van-icon name="cross" @click="show = true" />
          <!-- <vant-cell></vant-cell> -->
          <van-action-sheet
            get-container="body"
            v-model="show"
            @select="onSelect"
            cancel-text="取消"
            :closeable="false"
            @closed="isFirst = true"
          >
            <!--一级反馈 -->
            <div v-if="isFirst">
              <van-cell
                :title="item.name"
                clickable
                class="center-title"
                v-for="item in actions"
                :key="item.name"
                @click="onCellClick(item.name)"
              >
              </van-cell>
            </div>
            <!-- 二级反馈 -->
            <div v-else>
              <van-cell
                v-for="item in reports"
                :title="item.label"
                :key="item.type"
                clickable
                @click="reportArticle(item.type)"
              />
              <van-cell title="返回" clickable @click="isFirst = true" />
            </div>
          </van-action-sheet>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import reports from "@/api/reports.js";
import { dislikeArticleAPI, reportArticleAPI } from "@/api/hoemAPI.js";
export default {
  name: "ArtItem",
  props: {
    article: {
      type: Object, // 数据类型
      required: true, // 必填项
    },
  },
  data() {
    return {
      show: false,
      actions: [
        { name: "不感兴趣" },
        { name: "反馈垃圾内容" },
        { name: "拉黑作者" },
      ],
      isFirst: true,
      reports,
    };
  },
  methods: {
    onSelect() {
      this.show = false;
    },
    async onCellClick(name) {
      console.log(name);
      if (name == "不感兴趣") {
        const { data: res } = await dislikeArticleAPI(this.article.art_id);
        console.log(res);

        if (res.message === "OK") {
          // TODO：炸楼的操作，触发自定义的事件，将文章 id 发送给父组件
          this.$emit("remove-article", this.article.art_id);
        }
        this.show = false;
      }
      if (name == "反馈垃圾内容") {
        this.isFirst = false;
      }

      if (name == "拉黑作者") {
        this.show = false;
      }
    },
    async reportArticle(type) {
      // 1. 发起举报文章的请求
      const { data: res } = await reportArticleAPI(this.article.art_id, type);
      console.log(res);
      if (res.message === "OK") {
        // 2. 炸楼操作，触发自定义事件，把文章 Id 发送给父组件
        this.$emit("remove-article", this.article.art_id);
      }
      // 3. 关闭动作面板
      this.show = false;
    },
  },
};
</script>

<style lang="less" scoped>
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.thumb {
  // 矩形黄金比例：0.618
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}

.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.thumb-box {
  display: flex;
  justify-content: space-between;
}
/deep/ .van-cell__title {
  text-align: center;
}
</style>
