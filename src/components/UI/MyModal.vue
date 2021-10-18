<template>
  <div class="overlay">
    <div class="modal">
      <div class="modal__text">
        <slot></slot>
      </div>
      <button
        class="modal__btn modal__btn--no"
        type="button"
        @click="$emit('no')"
      >
        No
      </button>
      <button
        class="modal__btn modal__btn--yes"
        type="button"
        @click="$emit('yes')"
      >
        Yes
      </button>
    </div>
  </div>
</template>

<script>
export default { name: "my-modal" };
</script>

<style lang="scss" scoped>
.overlay {
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  width: 300px;
  min-height: 150px;

  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  justify-content: space-between;
  padding: 7px;
  background: #dcdcdc;
  border: 3px solid #000;
  border-radius: 5px;

  &__text {
    flex: 1 0 100%;
    font-size: 20px;
    line-height: 24px;
    text-align: center;
  }
  &__btn {
    flex: 0 0 45%;
    height: 40px;
    border: 2px solid #000;
    border-radius: inherit;
    cursor: pointer;
    transition: 0.3s;

    font-size: 18px;
    line-height: 22px;

    &--no:hover {
      background: rgba(255, 0, 0, 0.3);
    }
    &--yes:hover {
      background: rgba(0, 128, 0, 0.3);
    }
  }
}
</style>