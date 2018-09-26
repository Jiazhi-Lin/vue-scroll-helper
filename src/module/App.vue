<template>
  <div class="app">
    <VueScrollHelper
      :isOver="isOver"
      :isAutoLoad="true"
      wrapClass="myClass"
      :isLoading="true"
      :onLoadNextFn="onLoadNextFn">
      <template slot="list">
        <div v-for="(v, i) in client" :key="i" class="item">
          {{v}}
        </div>
      </template>
      <template slot="loading">
        <div style="width:100%;text-align:center">加载中</div>
      </template>
      <template slot="loadMore">
        <div style="width:100%;text-align:center">点击加载更多</div>
      </template>
      <template slot="noMore">
        <div style="width:100%;text-align:center">我是有底线的</div>
      </template>
    </VueScrollHelper>
  </div>
</template>

<script>
import VueScrollHelper from '../../lib/vue-scroll-helper'

export default {
  name: 'app',
  data () {
    return {
      // 初始数据
      client: [],
      count: 10,
      logMsgs: '',
      isOver: false
    }
  },
  components: {
    VueScrollHelper
  },
  created () {
  },
  watch: {
  },
  mounted () {
  },
  methods: {
    async onLoadNextFn (page, next) {
      console.log('加载下一页', page)
      var data = []
      for (var i = 0, j = 10; i < j; i++) {
        data.push(this.count++);
      }
      await new Promise(function (fulfill) {
        setTimeout(fulfill, 2000)
      })
      if (this.client.length >= 40) {
        this.isOver = false
        // 执行 next 回调结束整个滚动周期
        next(true)
      } else {
        this.client = this.client.concat(data)
        // 执行 next 回调关闭loading
        next()
      }
    }
  }
}
</script>

<style lang="scss">
html, body {
  width: 100%;
  height: 100%;
}
.app {
  width: 100%;
  height: 100%;
}
.myClass {
  width: 100%;
  height: 800px;
}
.item {
  height: 200px;
  width: 100%;
  background: pink;
  margin-bottom: 10px;
}
</style>