<template>
  <div @click="$router.push('/article/'+article.art_id)">
    <!-- 文章的信息 -->
    <van-cell>
      <!-- 标题区域的插槽 -->
      <template #title>
        <div class="title-box">
          <!-- 标题 -->
          <span>{{ article.title }}</span>
          <!-- 单张图片 -->
          <img
            v-if="article.cover.type === 1"
            v-lazy="article.cover.images[0]"
            alt=""
            class="thumb"
          />
        </div>
        <!-- 三张图片 -->
        <div class="thumb-box" v-if="article.cover.type === 3">
          <img
            v-for="(imgsrc, index) in article.cover.images"
            v-lazy="imgsrc"
            :key="index"
            alt=""
            class="thumb"
          />
        </div>
      </template>
      <!-- label 区域的插槽 -->
      <template #label>
        <div class="label-box">
          <span
            >作者 {{ article.aut_name }}&nbsp;&nbsp;
            {{ article.comm_count }}评论 &nbsp;&nbsp; 发布时间
            {{ article.pubdate | dateFormat }}</span
          >
          <!-- 关闭按钮 -->
          <!-- 通过 .stop 事件修饰符，阻止点击事件的冒泡 -->
          <van-icon name="cross" @click.stop="show = true"  v-if="closable" />
        </div>
      </template>
    </van-cell>
    <!-- 反馈的动作面板 -->
    <van-action-sheet
      v-model="show"
      cancel-text="取消"
      :closeable="false"
      get-container="body"
    >
      <!-- 第一级反馈面板 -->
      <div class="content" v-if="isFirst">
        <!-- 循环渲染可选项 -->
        <van-cell
          :value="item.name"
          clickable
          v-for="(item,index) in actions"
          :key="index"
          @click="onCellClick(item.name)"
        />
      </div>
      <!-- 第二级反馈面板 -->
      <div v-else>
        <van-cell
          :value="item.label"
          v-for="item in reports"
          :key="item.type"
          clickable
          @click="handlerReportsArticle(item.type)"
        />
        <van-cell
          title="'返回'"
          clickable
          @click="isFirst = true"
        />
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import reports from "../../api/reportsAPI";
import {dislikeArticleAPI,reportsArticle} from '../../api/homeAPI'
export default {
  name: "ArticleItem",
  props: {
    //文章的信息对象
    article: {
      type: Object, //数据类型
      required: true, //必填项
    },
    // 是否显示删除图标
    closable: {
      type: Boolean,
      default: true
    }
  },
  
  data() {
    return {
      //是否展示反馈面板
      show: false,
      //第一个面板的可选项列表
      actions: [
        { name: "不感兴趣" },
        { name: "反馈垃圾内容" },
        { name: "拉黑作者" },
      ],
      //是否展示第一个反馈面板
      isFirst: true,
      // 第二个面板的可选项列表，数组中每一项的格式 { type, label }
      reports,
    };
  },
  methods: {
    //一级选项的点击事件处理函数
    async onCellClick(name) {
      if (name === "不感兴趣") {
        const {data:res} =await dislikeArticleAPI(this.article.art_id)
        if (res.message==='OK'){
          //炸楼的操作，触发自定义的事件，将文章id发送给父组件
          this.$emit('removeArticle',this.article.art_id)
        }
        this.show=false
      } 
      if (name === "拉黑作者") {
        console.log("拉黑作者");
        this.show = false;
      } 
      if (name === "反馈垃圾内容") {
        //展示二级反馈面板
        this.isFirst = false;
        console.log(this.isFirst);
      }
    },
    // 举报文章（形参 type 是举报的类型值）
  async handlerReportsArticle(type) {
    // 1. 发起举报文章的请求
    const { data: res } = await reportsArticle(this.article.art_id, type)
    if (res.message === 'OK') {
      // 2. 炸楼操作，触发自定义事件，把文章 Id 发送给父组件
      this.$emit('removeArticle', this.article.art_id)
      // 3. 关闭动作面板
    this.show = false
    }
    
  }
  },
};
</script>

<style scoped>
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.thumb {
  /* 矩形黄金比例：0.618 */
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

 .van-cell__value--alone {
  text-align: center;
}
</style>