<template>
  <div class="bb-list">
    <!-- 特殊选项列表 -->
    <div
      v-if="type === 1"
      class="list-type__one">
      <div
        v-for="(content, index) in contentArr"
        :class="{'one_item__active': content.value === value && index!== specialIndex, 'one_item__special': index === specialIndex}"
        :key= "index + content.name"
        class="type__one_item hand"
        @click="itemClickHandle(content.value, index)">
        <div
          v-show="index === specialIndex"
          class="icon-wrap hand">
          <img src="../../assets/close.svg">
        </div>
        <span class="one-content">{{ content.name }}</span>
      </div>
    </div>

    <!-- 普通列表 -->
    <div
      v-if="type === 2"
      class="list-type__two">
      <div
        v-for="(content, index) in contentArr"
        :class="{'two_item__active': (index === activeIndexSon)&&content.disabled === false, 'two_item__disabled': content.disabled === true,'hand': content.disabled === false}"
        :key= "index"
        class="type__two_item"
        @click="itemClickHandle(content.value, index)">
        <span>{{ content.name }}</span>
      </div>
    </div>

    <!-- 分类列表 -->
    <div
      v-if="type === 3"
      class="list-type__three">
      <div class="three_content_wrap">
        <div
          v-for="(contents, index) in contentArr"
          :key="index">
          <div class="three_title">{{ contents.title }}</div>
          <div class="three-content-wrap">
            <div
              v-for="(content, index) in contents.contents"
              :class="{'three_item__active': content.value === value}"
              :key= "index"
              class="type__three_item hand"
              @click="itemClickHandle(content.value, index)">
              <span class="content-name">{{ content.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 和输入框组合 -->

    <div
      v-if="type === 4"
      class="list-type__four">
      <div
        v-if="inputLists"
        class="input-lists-wrap">
        <div
          v-for="(content, index) in contentArr"
          :class="{'four_item__active': (content.value === value)&&!operate}"
          :key= "index"
          class="type__four_wrap hand"
          @click="itemClickHandle(content.value, index)">
          <span class="four_content_wrap">{{ content.title }}</span>
        </div>
      </div>
      <bb-time-select
        v-if="inputTime"
        :init-time="initTimeSon"
        :start="start"
        :end="end"
        :start-unit="startUnit"
        :show-label="showLabel"
        style="display: inline-block"
        @change-time="inputTimeChange"
        @delete-all="deleteAllChange"/>
      <bb-input-number
        v-if="inputNumber"
        :max="max"
        :min="min"
        :origin-val="originValSon"
        style="display: inline-block"
        @change="inputNumberChange"/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BbList',
  props: {
    type: {
      type: Number,
      default: 0
    },
    value: {
      type: [Number, String, Boolean],
      default: ''
    },
    contentArr: {
      type: Array,
      default: () => {
        return []
      }
    },
    activeIndex: {
      type: Number,
      default: 1000000
    },
    specialIndex: {
      type: Number,
      default: 100000
    },
    defaultActived: {
      type: [String, Number],
      default: ''
    },
    inputLists: {
      type: Boolean,
      default: false
    },
    inputTime: {
      type: Boolean,
      default: false
    },
    inputNumber: {
      type: Boolean,
      default: false
    },
    initTime: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    originVal: {
      type: Number,
      default: 0
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
    showLabel: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      activeIndexSon: '',
      // defaultActivedList: '',
      operate: false,
      initTimeSon: 0,
      originValSon: 0,
      clearInitTime: false
    }
  },
  watch: {
    // contentArr: {
    //   handler: function (newV, oldV) {
    //     // console.error('contentArr', newV)
    //   },
    //   deep: true
    // },
    value: {
      handler: function (newV, oldV) {
        if (newV === '' && this.inputNumber) {
          this.originValSon = 0 // 清空 nunber 值
          return
        }
        if (this.type === 4) {
          if (this.inputLists && this.operate === false) {
            for (let i = 0; i < this.contentArr.length; i++) { // 无需再判断 3个小组件 组合的情况
              if (newV === this.contentArr[i].value) {
                return
              } else if (i === this.contentArr.length - 1) {
                if (this.inputTime) {
                  this.initTimeSon = newV
                  if (newV !== '') this.operate = true
                }
                if (this.inputNumber) {
                  this.originValSon = newV
                  if (newV !== '') this.operate = true
                }
              }
            }
          } else {
            if (this.inputTime) {
              this.initTimeSon = newV
              if (newV !== '') this.operate = true
            }
            if (this.inputNumber) {
              this.originValSon = newV
              if (newV !== '') this.operate = true
            }
          }
        }
      },
      immediate: true
    },
    activeIndex: {
      handler: function (newV) {
        this.activeIndexSon = newV
      },
      immediate: true
    }
    // initTime: {
    //   handler: function (newV) {
    //     this.initTimeSon = newV
    //   },
    //   immediate: true
    // },
    // originVal: {
    //   handler: function (newV) {
    //     this.originValSon = newV
    //   },
    //   immediate: true
    // }
    // defaultActived: {
    //   handler: function (newV) {
    //     this.defaultActivedList = newV
    //   },
    //   immediate: true
    // }
  },
  methods: {
    itemClickHandle (value, index) {
      if (this.type === 1) {
        this.$emit('input', value)
      } else if (this.type === 2) {
        if (this.contentArr[index].disabled === true) {
          return
        }
      } else if (this.type === 3) {
        // this.defaultActivedList = value
        this.$emit('input', value)
      } else if (this.type === 4) {
        // list 选中后再点击 是取消
        // if (value === this.value && !this.operate) {
        //   this.$emit('input', '')
        //   return
        // }
        //  清空 select 的值
        this.operate = false
        this.originValSon = 0 // 数字框  恢复默认值
        this.initTimeSon = '' // 时间框  恢复默认值
        this.$emit('input', value)
      }
      this.activeIndexSon = index
      this.$emit('click', value)
    },
    inputNumberChange (value) {
      this.originValSon = value // 直接赋值 防止两次值一样的时候   初始化 0 监听 不到
      this.operate = true
      this.$emit('input', value)
    },
    inputTimeChange (value) {
      this.operate = true
      // if (!this.clearInitTime) { // 执行清空操作就不再往外 冒值了
      //   this.$emit('input', value)
      // } else {
      //   this.initTimeSon = 0 // 清空时 传 0 是展示 default
      // }
      this.$emit('input', value)

      this.clearInitTime = false
    },
    deleteAllChange () {
      console.error('deleteAllChange')
      this.initTimeSon = 0
      this.clearInitTime = true
      this.$emit('input', '')
    }

  }
}
</script>
<style lang="scss" scoped>
    $largeSize: 1.4;
    .bb-list{
      // display: inline-block; // 宽度继承父元素
    }
    .hand:hover{
      cursor:pointer;
    }
    .list-type__one{
        .type__one_item{
            padding-left: 0.35rem*$largeSize;
            line-height: 0.4rem*$largeSize;
            font-size: 0.12rem*$largeSize;
            color: #333333;
            background: #FFFFFF;
            border: 0.01rem solid #F0F1F2;
            &:hover{
              background: #DEF4E8;
            }
            .one-content{
              font-size: 0.12rem*$largeSize;
              font-weight: bold;
            }
            .icon-wrap{
              position: relative;
              margin-left: -0.22rem;
              margin-right: 0.11rem;
              img{
                // vertical-align: unset;
              }
            }
        }
        .type__one_item:first-child {
          border-radius: 0.05rem 0 0 0;
        }
        .type__one_item:last-child {
          border-radius: 0 0 0 0.05rem;
        }
        .one_item__active{
            color: #ffffff;
            background: #24B764!important;
        }
        .one_item__special{
            display: flex;
            color:#24B764;
            font-weight: bold;
            background: #FFFFFF!important;
        }
    }

    .list-type__two{
        .type__two_item{
            line-height: 0.4rem*$largeSize;
            text-align: center;
            font-size: 0.12rem*$largeSize;
            color: #333333;
            &:hover{
                background: #DEF4E8;
            }
        }
        .two_item__disabled{
          color: #aaa;
        }
        .two_item__disabled{
          &:hover{
            background: none;
          }
        }

        .two_item__active{
            color: #ffffff;
            background: #24B764!important;
        }
    }

    .list-type__three{
        width: 1.7rem*$largeSize;
        text-align: left;
        overflow: hidden;
        .three_content_wrap{
            width: 1.9rem*$largeSize;
        }
    }
    .three_title{
        font-size: 0.14rem*$largeSize;
        color: #333333;
    }
    .three-content-wrap{
      margin: 0.08rem*$largeSize 0rem;
    }
    .type__three_item{
        display: inline-block;
        width: 0.8rem*$largeSize;
        height: 0.32rem*$largeSize;
        line-height: 0.32rem*$largeSize;
        margin-right: 0.1rem*$largeSize;
        margin-bottom: 0.08rem*$largeSize;
        font-size: 0.12rem*$largeSize;
        background: #FFFFFF;
        border: 0.01rem solid #E9EBE9;
        border-radius: 0.02rem*$largeSize;
        text-align: center;
        &:hover{
          border: 0.01rem solid #24B764;
        }
        .content-name{
            font-size: 0.12rem*$largeSize;
        }
    }
    .three_item__active{
        background: rgba(36,183,100,0.15);
        border: 0.01rem solid #24B764;
        border-radius: 0.02rem*$largeSize;
        color: #24B764;
    }
    .list-type__four{
      .input-lists-wrap{
        display: inline-block;
      }
        // text-align: left
    }
    .type__four_wrap {
        display: inline-block;
        background: #FFFFFF;
        border: 0.01rem solid #E9EBE9;
        border-radius: 0.02rem;
        min-width: 0.32rem*$largeSize;
        height: 0.32rem*$largeSize;
        line-height: 0.32rem*$largeSize;
        margin-right: 0.12rem*$largeSize;
        text-align: center;
        &:hover{
          border: 0.01rem solid #24B764;
        }
        .four_content_wrap{
          font-size: 0.12rem*$largeSize;
        }
    }
    .four_item__active{
        background: rgba(36,183,100,0.15);
        border: 0.01rem solid #24B764;
        border-radius: 0.02rem*$largeSize;
    }
    .list-type__four {
      display: flex;
    }
</style>
