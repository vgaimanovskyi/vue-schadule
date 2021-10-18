<template>
  <button class="button" type="button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "my-button",
};
</script>

<style scoped lang="scss">
.button {
  min-width: 30px;
  min-height: 30px;

  font-size: 16px;
  line-height: 20px;
  padding: 4px 10px;
  background: #e6e6e6;
  border: 1px solid #000;
  border-radius: 5px;
  cursor: pointer;
}
</style>
