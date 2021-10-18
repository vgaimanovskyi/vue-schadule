<template>
  <div class="page">
    <transition name="top">
      <my-error v-if="getError"></my-error>
    </transition>

    <router-view />
  </div>
</template>

<script>
import "@/style/main.scss";
import { mapGetters } from "vuex";

export default {
  name: "Create",
  computed: {
    ...mapGetters(["getError"]),
  },
  created() {
    this.$store.dispatch("initEvents");
  },
};
</script>

<style lang="scss" scoped>
.page {
  padding: 80px 20px 20px 20px;
  max-width: 800px;
  margin: 0 auto;
  // background: rgba(204, 204, 204, 0.2);
}
</style>
