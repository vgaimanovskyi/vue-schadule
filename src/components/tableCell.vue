<template>
  <div class="cell">
    <div class="cell__title" v-html="event.title"></div>
    <button class="cell__btn" type="button" @click="modal = true"></button>
  </div>
  <transition name="fade">
    <my-modal v-if="modal" @no="modal = false" @yes="removeEvent">
      {{ `Are you sure you want to delete "${event.title}" event?` }}
    </my-modal>
  </transition>
</template>

<script>
export default {
  name: "table-cell",
  props: ["event"],
  data() {
    return {
      modal: false,
    };
  },
  methods: {
    removeEvent() {
      this.$store.dispatch("removeEvent", this.event.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.cell {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px 10px;

  &__title {
    flex-grow: 1;
    white-space: nowrap;
    overflow: hidden;
    font-weight: bold;
  }
  &__btn {
    flex: 0 0 20px;
    display: block;
    width: 20px;
    height: 20px;
    background: transparent;
    border: none;
    outline: none;
    position: relative;
    cursor: pointer;

    @include cross($size: 60%, $color: #000, $stroke: 1px);
  }
}
</style>