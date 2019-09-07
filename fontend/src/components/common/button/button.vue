<template>
<a :class="['button', `is-${size}`, `is-${type}`, { 'is-disabled': disabled }]"
  v-bind="$attrs" @click="event => !disabled && $emit('click', event)"
>
  <slot></slot>
</a>
</template>

<script>
export default {
  props: {
    type: { type: String, default: 'normal' },
    size: { type: String, default: 'medium' },
    disabled: { type: Boolean, default: false }
  }
};
</script>

<style lang="scss" scoped>
.button {
  position: relative;
  display: inline-block;
  align-items: center;
  cursor: pointer;
  user-select: none;
  background-color: #fff;
  outline: none;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  color: rgba(0,0,0,0.65);
  text-align: center;
  &:hover {
    background-color: #e7e7e7;
  }
  &:active {
    
  }
  &.is-disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:active {
      
    }
  }
  &.is-mini {
    padding: $s-offset $s-offset;
    font-size: 0.8em;
  }
  &.is-small {
    padding: $s-offset $m-offset;
    font-size: 0.9em;
  }
  &.is-medium {
    width: 200px;
    height: 25px;
    line-height: 25px;
    font-size: 1em;
  }
  &.is-large {
    padding: $s-offset $xl-offset;
    font-size: 1.2em;
  }
  &.is-primary {
    color: #f7f7f7;
    border: 1px solid #92cc41;
    background-color: #92cc41;
    border: none;
    &:hover {
      background-color: #76c442;
    }
    &:active {
      
    }
    &.is-disabled {
      &:hover {
        background-color: #76c442;
      }
      &:active {
        
      }
    }
  }
  &.is-success {
    color: #f7f7f7;
    border: 1px solid #209cee;
    background-color: #209cee;
    border: none;
    &:hover {
      background-color: #108de0;
    }
    &:active {
      
    }
    &.is-disabled {
      &:hover {
        background-color: #209cee;
      }
      &:active {
        
      }
    }
  }
  &.is-warning {
    color: #f7f7f7;
    border: 1px solid #f7d51d;
    background-color: #f7d51d;
    
    border: none;
    &:hover {
      background-color: #f2c409;
    }
    &:active {
     
    }
    &.is-disabled {
      &:hover {
        background-color: #f7d51d;
      }
      &:active {
        
      }
    }
  }
  &.is-error {
    color: #f7f7f7;
    border: 1px solid #e76e55;
    background-color: #e76e55;
    
    border: none;
    &:hover {
      background-color: #ce372b;
    }
    &:active {
      box-shadow: inset 2px 2px 0 0 #8c2022;
    }
    &.is-disabled {
      &:hover {
        background-color: #e76e55;
      }
      &:active {
        
      }
    }
  }
  &.is-text {
    padding: 0 0;
    color: #606266;
    background-color: transparent;
    box-shadow: none;
    border: none;
    &:active {
      color: #1f2f3d;
    }
    &.is-disabled {
      &:hover {
        background-color: transparent;
      }
      &:active {
        background-color: transparent;
        box-shadow: none;
        color: #606266;
      }
    }
  }
}
</style>