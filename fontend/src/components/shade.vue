
<template>
  <div class="bb-dialog">
    <div class="bb-modal"/>
    <slot/>
  </div>
</template>
<script>
export default {
  name: 'Shade'
}
</script>
<style scoped>
.bb-dialog{
    position: fixed;
    top: 0;
    z-index: 1000;
    color: black;
    width: 100%;
    height: 100%;
    overflow: auto;

}
.bb-dialog>.bb-modal{
        position: fixed;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0,0.5);
    }
</style>
