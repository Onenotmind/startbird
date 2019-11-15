<template>
  <div
    class="time-picker">
    <!-- 左侧输入时间的区域 -->
    <div class="left-side">
      <div
        :class="['timer-picker-input', isActive ? 'active': '']"
        @pointerenter="handleMouseEnter"
        @pointerleave="handleMouseLeave">
        <div
          :class="['left-input']">
          <div
            v-if="showPlaceHolder || isActive || confirmSelect"
            class="input-area">
            <input
              v-model="minuteVal"
              type="text"
              class="min-select"
              @blur="changeVal($event, 'minute')"
            > <span class="min-label">分</span>
            <input
              v-model="secondVal"
              type="text"
              class="second-select"
              @blur="changeVal($event, 'second')"
            ><span class="second-label">秒</span>
            <div
              v-show="showPlaceHolder && !showDeleteBtn"
              class="update-triggle">
              <div
                class="increase-triangle"
                @click="increaseTime" />
              <div
                class="decrease-triangle"
                @click="decreaseTime" />
            </div>
          </div>
          <div
            v-else
            class="placeholder">
            <span>{{ createPlaceHolder }}</span>
          </div>
        </div>
        <!-- 右侧调整时间 -->
        <div
          class="right-side"
          @pointerenter="handleDelBtnShow"
          @pointerleave="handleDelBtnHide">
          <!-- 展开选择菜单 -->
          <div
            ref="showMenu"
            class="show-menu"
            @click="handleMenuBtn">
            <!-- 展开下拉菜单按钮 -->
            <div
              v-if="!showDeleteBtn"
              class="decrease-triangle" />
          </div>
          <!-- 清空按钮 -->
          <img
            v-if="showDeleteBtn"
            class="clear-btn"
            src="./clear-time.png"
            @click.stop="delTimeVal" >
        </div>
      </div>
      <!-- 菜单 -->
      <div
        v-clickoutside="closeMenu"
        v-show="showOption"
        class="time-picker-combobox">
        <!-- 选择分钟 -->
        <pick-option
          :origin-options="minuteOption"
          unit="minute"
          @change="handleChangeTime" />
        <pick-option
          :origin-options="secondOption"
          unit="second"
          @change="handleChangeTime" />
        <footer v-show="showOption">
          <div
            class="confirm"
            @click="handleConfirm">确定</div>
          <div
            class="cancel"
            @click="handleCancel">取消</div>
        </footer>
      </div>
    </div>
    <!-- 右侧提示 -->
    <!-- 提示 -->
    <label
      v-show="showLabel"
      class="notice-label">
      {{ noticeUnit }}
    </label>
  </div>
</template>
<script>
import PickOption from './option.vue'
// import _ from 'lodash'
export default {
  name: 'BbTimeSelect',
  directives: {
    clickoutside: {
      bind: function (el, binding, vnode) {
        const documentHandler = function (e) {
          if (!vnode.context || el.contains(e.target)) return
          binding.value(e)
        }
        setTimeout(() => {
          document.addEventListener('click', documentHandler)
          // document.addEventListener('mousedown', documentHandler)
          document.addEventListener('touchstart', documentHandler)
        }, 0)
      }
    }
  },
  components: {
    PickOption
  },
  props: {
    unit: {
      type: String,
      default: 'second'
    },
    start: {
      type: Number,
      default: 1
    },
    end: {
      type: Number,
      default: 20
    },
    startUnit: { // 开始时长选择的单位
      type: String,
      default: 'minute'
    },
    step: {
      type: Number,
      default: 1
    },
    initTime: { // 初始时间
      type: [Number, String],
      default: 0
    },
    disable: {
      type: Boolean,
      default: false
    },
    showLabel: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      minuteVal: '00',
      secondVal: '00',
      timeVal: 0,
      showOption: false,
      showDeleteBtn: false, // 是否显示清空按钮
      isFocus: false,
      endMinute: 59, // 分钟的最大值
      confirmSelect: false,
      notAllChange: false,
      optionReset: false // 选择其他值的时候重置秒针列表
    }
  },
  computed: {
    isActive () {
      return this.showOption || this.isFocus
    },
    createPlaceHolder () {
      let startUnit = this.startUnit === 'minute' ? '' : '秒'
      return `${this.start}${startUnit}-${this.end}分钟`
    },
    minuteOption () {
      return this.startUnit === 'minute' ? this.generateOptions(this.start, this.end) : this.generateOptions(0, this.end)
    },
    secondOption () {
      return this.startUnit === 'second' && !this.optionReset ? this.generateOptions(this.start, this.endMinute) : this.generateOptions(0, this.endMinute)
    },
    noticeUnit () {
      return this.unit === 'minute' ? '(精确到分)' : '(精确到秒)'
    },
    showPlaceHolder () {
      return this.timeVal !== 0 || this.minuteVal !== '00' || this.secondVal !== '00'
    }
  },
  watch: {
    initTime: {
      handler: function (val) {
        if (val === '') {
          this.notAllChange = true
          this.timeVal = 0
          this.confirmSelect = false
        } else {
          this.notAllChange = false
          this.timeVal = val
        }
        const { minute, second } = this.fulltimeFormatter(val)
        // console.error('this.minuteVal', this.minuteVal)
        this.minuteVal = minute
        this.secondVal = second
      },
      immediate: true
    },
    timeVal: function (val) {
      // 调整时间
      const { minute, second } = this.fulltimeFormatter(val)
      this.minuteVal = minute
      this.secondVal = second
      if (!this.notAllChange) {
        this.$emit('change-time', val)
      }
    },
    minuteVal: function (val) {
      if (parseInt(val) === this.end) {
        this.endMinute = 0
        this.secondVal = '00'
      } else {
        this.endMinute = 59
      }
    },
    showLabel: function (val) {
      // console.error('val', val)
    }
  },
  methods: {
    closeMenu (ev) {
      // 如果点到了
      if (this.$refs.showMenu && this.$refs.showMenu.contains(ev.target)) {
        return
      }
      let origin = this.timeVal
      const { minute, second } = this.fulltimeFormatter(origin)
      this.minuteVal = minute
      this.secondVal = second
      this.showOption = false
    },
    handleMouseEnter () {
      this.notAllChange = false
      this.isFocus = true
      // _.debounce(() => {
      //   this.isFocus = true
      // }, 50)()
    },
    handleMouseLeave () {
      this.isFocus = false
    },
    changeVal (ev, unit) {
      let origin = ev.target.value
      this.confirmSelect = false
      if (unit === 'minute') {
        if (isNaN(parseInt(origin))) {
          this.timeVal = parseInt(this.secondVal)
          return
        }
        this.timeVal = parseInt(origin) * 60 + parseInt(this.secondVal)
        if (this.timeVal >= this.end * 60) {
          this.timeVal = this.end * 60
        }
      } else if (unit === 'second') {
        // let delta = parseInt(origin) - parseInt(this.secondVal)
        if (isNaN(parseInt(origin))) {
          this.timeVal = parseInt(this.minuteVal) * 60
          return
        }
        let num = parseInt(origin)
        if (this.startUnit === 'second' && this.minuteVal === '00') {
          num = num <= this.start ? this.start : num
        }
        this.timeVal = parseInt(this.minuteVal) * 60 + parseInt(num)
      }
      // 边界值处理
      if (this.timeVal >= this.end * 60) {
        this.timeVal = this.end * 60
      } else if (this.startUnit === 'minute' && this.timeVal <= this.start * 60) {
        this.timeVal = this.start * 60
      }
    },
    handleMenuBtn () {
      if (!this.showDeleteBtn) {
        this.showOption = !this.showOption
      }
    },
    fulltimeFormatter (time) {
      let hourFormatter = (time) => {
        let hour = Math.floor(time / 60 / 60 % 100)
        return hour < 10 ? '0' + hour : hour
      }
      let minuteFormatter = (time) => {
        let minute = Math.floor(time / 60 % 60)
        return minute < 10 ? '0' + minute : minute
      }
      let secondFormatter = (time) => {
        let second = Math.floor(time % 60)
        return second < 10 ? '0' + second : second
      }
      return { hour: hourFormatter(time), minute: minuteFormatter(time), second: secondFormatter(time) }
    },
    // 生成选项
    generateOptions (start, end, disabledOptions = []) {
      let arr = []
      for (let value = start; value <= end; value++) {
        if ((disabledOptions.length > 0 && disabledOptions.indexOf(value) < 0) || disabledOptions.length === 0) {
          arr.push(value)
        }
      }
      return arr
    },
    // 选中之后
    handleChangeTime (val, unit) {
      if (unit === 'minute') {
        this.optionReset = (val !== '00')
        this.minuteVal = val
      } else if (unit === 'second') {
        this.secondVal = val
      }
    },
    // 确定选中
    handleConfirm () {
      this.confirmSelect = false
      let minute = parseInt(this.minuteVal)
      let second = parseInt(this.secondVal)
      if (minute === 0 && second === 0) {
        this.confirmSelect = true
      } else {
        this.timeVal = minute * 60 + second
      }
      // 防止当点0的时候不触发watch事件
      if (this.timeVal === 0) {
        this.$emit('change-time', 0)
      }

      this.showOption = false
    },
    //  取消选中
    handleCancel () {
      let origin = this.timeVal
      const { minute, second } = this.fulltimeFormatter(origin)
      this.minuteVal = minute
      this.secondVal = second
      this.showOption = false
    },
    // 手动增加最小的时间单位
    increaseTime () {
      this.confirmSelect = false
      let max = this.end * 60
      if (this.timeVal <= max - this.step) {
        this.timeVal += this.step
      }
    },
    decreaseTime () {
      this.confirmSelect = false
      let min = this.startUnit === 'second' ? this.start : this.start * 60
      if (this.timeVal >= min + this.step) {
        this.timeVal -= this.step
      }
      if (this.timeVal === 0) {
        this.confirmSelect = true
        this.$emit('change-time', 0)
      }
    },
    handleDelBtnShow () {
      if (this.timeVal === 0) return
      this.showDeleteBtn = true
    },
    handleDelBtnHide () {
      this.showDeleteBtn = false
    },
    delTimeVal () {
      this.$emit('delete-all')
      this.confirmSelect = false
      this.timeVal = 0
      this.minuteVal = '00'
      this.secondVal = '00'
    }
  }
}
</script>
<style lang="scss" scoped>
$largeSize: 1.4;
.time-picker {
  position: relative;
  display: flex !important;
}
.notice-label {
  display: inline-block;
  font-size: .168rem;
  color: #999;
  line-height: .34rem * $largeSize;
  margin-left: .2rem;
  cursor: default;
}
.timer-picker-input {
  display: flex;
  width: 1.16rem * $largeSize;
  height: .34rem * $largeSize;
  background: #fff;
  border: 1px solid #E9EBE9;
  border-radius: 2px;
  color: #333;
  padding: .08rem;
  box-sizing: border-box;
  padding-right: 0;
  // padding-top: 0;
  position: relative;
  &.active {
    border: 1px solid #24B764;
  }
  .placeholder {
    min-width: 1.15rem;
    color: #999;
    span {
      vertical-align: middle;
      height: 0.3rem;
      line-height: 0.3rem;
    }
  }
  .input-area {
    font-size: 0;
    height: .18rem;
    padding-top: .05rem;
  }
  input {
    display: inline-block;
    height: .16rem * $largeSize;
    // max-width: .22rem;
    width: .22rem;
    outline-style: none ;
    outline-width: 0px ;
    border: none ;
    border-style: none ;
    text-shadow: none ;
    -webkit-appearance: none ;
    -webkit-user-select: text ;
    outline-color: transparent ;
    box-shadow: none;
    font-family: PingFangSC-Regular;
    font-size: .12rem * $largeSize;
    color: #333;
    word-spacing: -1px;
    vertical-align: top;
    padding: unset;
    margin: 0;
  }
  span {
    font-family: PingFangSC-Regular;
    font-size: .12rem * $largeSize;
    vertical-align: top;
    height: .16rem * $largeSize;
    line-height: .16rem * $largeSize;
  }
}
.left-input {
  display: flex;
  height: .34rem * $largeSize;
  // width: .73rem * $largeSize;
}
// 上下调整的三角形
.update-triggle {
  display: inline-block;
  width: .08rem;
  height: .16rem;
  margin-left: .3rem;
  cursor: pointer;
  // padding-top: .07rem;
  .increase-triangle {
    width: 0;
    height: 0;
    border: .06rem solid transparent;
    border-bottom: .06rem solid #b3b8b3;
    margin-bottom: .08rem;
    margin-top: -.05rem;
  }
  .increase-triangle:hover {
    border-bottom-color: #24B764;
  }
  .decrease-triangle {
    width: 0;
    height: 0;
    border: .06rem solid transparent;
    border-top: .06rem solid #b3b8b3;
  }
  .decrease-triangle:hover {
    border-top-color: #24b764;
  }
}
.right-side {
  cursor: pointer;
  width: .2rem;
  height: .14rem;
  // padding-left: .05rem;
  box-sizing: border-box;
  border-left: 1px solid #eee;
  margin-left: .1rem;
  position: absolute;
  right: .05rem;
  top: .15rem;
  .show-menu {
    margin-top: .06rem;
    padding-left: .05rem;
  }
  .decrease-triangle {
    width: 0;
    height: 0;
    border: .06rem solid transparent;
    border-top: .06rem solid #b3b8b3;
  }
  .clear-btn {
    width: .16rem;
    height: .16rem;
    position: absolute;
    right: .0rem;
    top: .0rem;
  }
}
.time-picker-combobox {
  z-index: 1000;
  height: 1.26rem * $largeSize;
  width: 1.16rem * $largeSize;
  box-shadow: 0 2px 10px 0 rgba(58,66,73,0.21);
  position: absolute;
  left: 0;
  top: .34rem * $largeSize;
  // border-radius: 4px;
}
footer {
  display: flex;
  background: #fff;
  width: 1.16rem * $largeSize;
  height: .21rem * $largeSize;
  box-shadow: 0 2px 10px 0 rgba(58,66,73,0.21);
  border-top: 1px solid #e3e3e3;
  div {
    width: .58rem * $largeSize;
    height: .21rem * $largeSize;
    line-height: .21rem * $largeSize;
    font-size: .12rem * $largeSize;
  }
  .confirm {
    color: #24B764;
    letter-spacing: 0;
    padding-left: .3rem;
    box-sizing: border-box;
  }
  .cancel {
    padding-left: .1rem;
    box-sizing: border-box;
  }
}
</style>
