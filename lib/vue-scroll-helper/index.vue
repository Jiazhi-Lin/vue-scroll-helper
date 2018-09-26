<template>
  <div :style="wrapStyle" ref="wrap" :class="wrapClass" style="overflow-x:hidden;overflow-y:scroll;-webkit-overflow-scrolling:touch;">
    <div ref="content" class="content">
      <slot name="list"></slot>
    </div>
    <div v-show="loading && !isEnd && (!limit || page<limit)">
      <slot name="loading">
      </slot>
    </div>
    <div v-if="!loading && !isEnd && (!limit || page<limit) && mode==='manual'" @click="onClickLoadMore">
      <slot name="loadMore">
      </slot>
    </div>
    <div v-show="isEnd || (limit && page===limit)">
      <slot name="noMore">
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vueScrollHelper',
  props: {
    mode: {
      // 使用无限滚动模式还是点击加载更多的模式
      type: String,
      default: 'auto'
    },
    limit: {
      // 最多翻到多少页
      type: Number,
      default: 0
    },
    pageStart: {
      // 从第几页开始
      type: Number,
      default: 0
    },
    threshold: {
      // 到达哪个阈值触发
      type: Number,
      default: 250
    },
    isOver: {
      // 还有没有得翻页
      type: Boolean,
      default: false
    },
    isAutoLoad: {
      // 是否第一次起来的时候自动加载
      type: Boolean,
      default: false
    },
    isInWindow: {
      // 设置滚动层为window
      type: Boolean,
      default: false
    },
    onLoadNextFn: {
      // 到达翻页点的执行回调函数
      type: Function,
      default: () => {},
      required: true
    },
    wrapStyle: {
      // 包裹层的样式
      type: Object
    },
    wrapClass: {
      // 包裹层的class
      default: ''
    },
    isLoading: {
      // 组件接管loading控制权
      default: 'null'
    }
  },
  watch: {
    isLoading () {
      this.loading = this.isLoading
    }
  },
  data () {
    return {
      loading: true,
      isNextEnd: false,
      page: this.isAutoLoad ? 0 : this.pageStart,
      autoLoaded: false
    }
  },
  computed: {
    scrollEl () {
      return this.isInWindow ? window : this.$refs.wrap
    },
    isEnd () {
      return this.isOver || this.isNextEnd
    }
  },
  components: {
  },
  created () {
    this.onAutoLoad()
  },
  beforeUpdate () {
  },
  beforeDestroy () {
    this.detachScrollEvent()
  },
  mounted () {
    this.attachScrollEvent()
  },
  methods: {
    isInner () {
      return this.isLoading === 'null'
    },
    fnNext (isNextEnd) {
      isNextEnd && (this.isNextEnd = true)
      this.isInner() && (this.loading = false)
    },
    // 组件加载完成的时候触发一次回调
    onAutoLoad () {
      if (this.isAutoLoad && !this.autoLoaded) {
        this.autoLoaded = true
        this.loading = true
        this.onLoadNextFn(this.page, this.fnNext)
      }
    },
    // 点击加载更多
    onClickLoadMore () {
      this.onLoadNextFn(this.page += 1, this.fnNext)
      this.loading = true
    },
    // 计算高度的方法
    calcTop (element) {
      if (!element) {
        return 0
      }
      return element.offsetTop + this.calcTop(element.offsetParent)
    },
    // 滚动执行的无限滚动函数
    scrollHandler () {
      let offset
      let limitKey
      const el = (this.$refs.content)
      if (this.isInWindow) {
        let scrollTop = window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop
        offset = this.calcTop(el) + el.offsetHeight - scrollTop - window.innerHeight
      } else {
        offset = el.scrollHeight - el.parentNode.scrollTop - el.parentNode.clientHeight
      }
      if (offset < Number(this.threshold)) {
        if (this.mode === 'manual') {
          this.isInner() && (this.loading = false)
        } else {
          if (this.limit) {
            limitKey = (this.page + 1 < this.limit)
          } else {
            limitKey = true
          }
          !this.isEnd && !this.loading && (this.page += 1)
          limitKey && !this.isEnd && !this.loading && this.onLoadNextFn(this.page, this.fnNext)
          this.isInner() && (this.loading = true)
        }
      }
    },
    // 绑定滚动时间和resize时间
    attachScrollEvent () {
      const cb = this.scrollHandler
      this.scrollEl.addEventListener('scroll', cb, false)
      this.scrollEl.addEventListener('resize', cb, false)
    },
    // 解绑
    detachScrollEvent () {
      const cb = this.scrollHandler
      this.scrollEl.removeEventListener('scroll', cb, false)
      this.scrollEl.removeEventListener('resize', cb, false)
    },
    // reset
    reset () {
      this.page = 0
      this.isNextEnd = false
    }
  }
}
</script>
