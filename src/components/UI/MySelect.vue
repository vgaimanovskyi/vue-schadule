<template>
  <div class="select" :class="{ 'select--open': open }">
    <div class="select__overlay" v-if="open" @click="open = !open"></div>
    <div class="select__block">
      <div
        class="select__result"
        v-html="innerResult.length ? innerResult : placeholder"
      ></div>
      <button class="select__btn" type="button" @click="open = !open">
        <svg
          class="select__btn-svg"
          :class="{ 'select__btn-svg--open': open }"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
        >
          <path
            d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
          ></path>
        </svg>
      </button>
      <div class="select__list" v-show="open">
        <div v-if="all" class="select__item" @click="selectAll">
          All members
        </div>
        <div
          class="select__item"
          :class="{ 'select__item--active': isItemInResult(item) }"
          v-for="(item, idx) in list"
          :key="`item-${idx + 1}`"
          v-html="item"
          @click="toggleItem(item)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "my-select",
  props: {
    list: {
      type: Array,
      require: true,
      default: () => [],
    },
    modelValue: {
      type: Array,
      require: true,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: "",
    },
    multy: {
      type: Boolean,
      default: false,
    },
    all: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      open: false,
      // result: [],
    };
  },
  computed: {
    innerResult() {
      if (this.all && this.modelValue.length === this.list.length) {
        return "All members";
      }
      return this.modelValue.join(", ");
    },
  },
  methods: {
    isItemInResult(item) {
      return this.modelValue.includes(item);
    },
    removeItem(item) {
      const idx = this.modelValue.indexOf(item);
      this.modelValue.splice(idx, 1);
    },
    toggleItem(item) {
      this.multy ? this.multyToggle(item) : this.singleToggle(item);
      this.$emit("update:modelValue", this.modelValue);
    },
    singleToggle(item) {
      this.removeItem(item);
      this.modelValue.push(item);
      this.open = false;
    },
    multyToggle(item) {
      if (this.isItemInResult(item)) {
        this.removeItem(item);
      } else {
        this.modelValue.push(item);
      }
    },
    selectAll() {
      const { length } = this.modelValue;
      while (this.modelValue.length > 0) this.modelValue.pop();
      if (length !== this.list.length) this.modelValue.push(...this.list);
    },
  },
  created() {
    if (this.all) this.modelValue.push(...this.list);
  },
};
</script>

<style scoped lang="scss">
.select {
  display: inline-block;
  border: 1px solid #000;
  border-radius: 5px;

  &--open {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    // background: rgba(255, 0, 0, 0.2);
  }
  &__block {
    position: relative;
    display: flex;
    width: 200px;
    height: 30px;
    background: #fff;

    font-size: 16px;
    line-height: 20px;
    border-radius: inherit;
  }
  &__result {
    flex-grow: 1;
    padding: 4px 1px 4px 10px;
    white-space: nowrap;
    overflow: hidden;
    outline: none;
  }
  &__btn {
    margin-left: 4px;
    flex: 0 0 30px;
    background: #e6e6e6;
    border: none;
    border-left: 1px solid #000;
    border-top-right-radius: inherit;
    border-bottom-right-radius: inherit;

    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  &__btn-svg {
    display: block;
    width: 15px;

    &--open {
      transform: scaleY(-1);
    }
  }
  &__list {
    z-index: 100;
    position: absolute;
    top: 100%;
    left: -1px;
    right: -2px;

    background: #fff;
    border: 1px solid #000;
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
  }
  &__item {
    padding: 4px;
    border-top: 1px solid #9f9f9f;
    cursor: default;

    &:first-child {
      border-top-color: transparent;
    }
    &:hover {
      background: rgba(235, 83, 202, 0.2);
    }
    &--active {
      background: rgba(235, 83, 202, 0.4);
    }
  }
}
</style>