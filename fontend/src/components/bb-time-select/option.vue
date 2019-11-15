<template>
  <!-- 分秒下拉选择 -->
  <div
    :class="['select-option', active ? 'select-option-active': '']"
    @pointerenter="handleMouseEnter"
    @pointerleave="handleMouseLeave">
    <ul
      v-show="options && options.length > 0"
      ref="list"
      :type="unit"
      :class="unit"
    >
      <li
        v-for="(item, index) in options"
        :key="`${item.value}${index}`"
        :class="[selectedIndex === index ? 'select-option-selected': '',item.disabled ? 'select-option-disabled' : '']"
        @click="handleSelect(item.value, index)"
      >
        {{ item.value }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'PickerOption',
  props: {
    unit: {
      type: String,
      default: 'minute'
    },
    originOptions: {
      type: Array,
      default: () => ([])
    },
    disableOption: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      selectedIndex: 0,
      active: false // 是否处于激活状态
    }
  },
  computed: {
    options () {
      let arr = []
      for (let i = 0; i < this.originOptions.length; i++) {
        let option = this.originOptions[i]
        let item = this.formateOption(option, this.disableOption)
        arr.push(item)
      }
      return arr
    }
  },
  watch: {
    selectedIndex: function (val) {
      this.$nextTick(() => {
        this.scrollToSelected(120)
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.scrollToSelected(0)
    })
  },
  methods: {
    handleMouseEnter () {
      this.active = true
    },
    handleMouseLeave () {
      this.active = false
    },
    scrollToSelected (duration) {
      const select = this.$el
      const list = this.$refs.list
      if (!list) return
      let index = this.selectedIndex
      const topOption = list.children[index]
      const to = topOption.offsetTop
      this.scrollTo(select, to, duration)
    },
    // 选中后移动到第一个位置
    // 选中
    scrollTo (element, to, duration) {
      if (duration < 0) {
        element.scrollTop = to
        return
      }
      const difference = to - element.offsetTop
      const perTick = (difference / duration) * 10
      window.requestAnimationFrame(() => {
        element.scrollTop = element.scrollTop + perTick
        if (element.scrollTop === to) return
        this.scrollTo(element, to, duration - 10)
      })
    },
    handleSelect (value, index) {
      this.selectedIndex = index
      this.$emit('change', value, this.unit)
    },
    formateOption (option, disabledOptions) {
      let value = `${option}`
      if (value < 10) {
        value = `0${option}`
      }
      let disabled = false
      if (disabledOptions && disabledOptions.indexOf(option) >= 0) {
        disabled = true
      }
      return { value, disabled }
    }
  }
}
</script>
<style lang="scss" scoped>
$largeSize: 1.4;
.select-option {
  position: relative;
  float: left;
  width: .58rem * $largeSize;
  overflow: hidden;
  max-height: 1.26rem * $largeSize;
  font-size: .12rem * $largeSize;
  z-index: 1000;
  background: #FFFFFF;
  &.select-option-active {
    overflow-y: auto;
  }
}
.select-option:not(:last-of-type) {
  border-right: 1px solid #e3e3e3;
}
.select-option::-webkit-scrollbar {
  width: 4px;
  border-radius: 4px;
  background-color: #ccc;
}
// .select-option-active {
//   overflow-y: auto;
// }
.select-option:hover {
  overflow-y: auto;
}
ul {
  width: .58rem * $largeSize;
  margin: 0;
  padding: 0 0 1.5rem;
  list-style: none;
}
ul:not(:last-child) {
  border-right: 1px solid #efefef;
}
li {
  font-size: .12rem * $largeSize;
  width: 100%;
  height: .21rem * $largeSize;
  line-height: .21rem * $largeSize;
  text-align: center;
  list-style: none;
  background: #fff;
  cursor: pointer;
}
li:hover {
  background: #D3F1E0;
}
.select-option-selected {
  font-weight: 600;
  background: #f3f3f3;
  color: #333;
}
</style>
