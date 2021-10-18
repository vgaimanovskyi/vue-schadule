<template>
  <div class="error">
    <svg
      class="error__icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path
        d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"
      ></path>
    </svg>
    <div class="error__text" v-html="getError"></div>
    <button class="error__btn" type="button" @click="closeError"></button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "my-error",
  computed: {
    ...mapGetters(["getError"]),
  },
  methods: {
    closeError() {
      this.$store.commit("CLEAR_ERROR");
    },
  },
};
</script>

<style lang="scss" scoped>
.error {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  min-height: 50px;
  background: #f19d9d;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 40px;

  &__icon {
    flex: 0 0 40px;
    display: block;
    width: 40px;
    height: 40px;
    fill: #bb0b0b;
  }
  &__text {
    flex-grow: 1;
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;
    color: #bb0b0b;
    padding: 0 20px;
  }
  &__btn {
    flex: 0 0 40px;
    display: block;
    width: 40px;
    height: 40px;
    background: transparent;
    border: none;
    outline: none;
    position: relative;
    cursor: pointer;

    @include cross($size: 70%, $color: #bb0b0b, $stroke: 2px);
  }
}
</style>