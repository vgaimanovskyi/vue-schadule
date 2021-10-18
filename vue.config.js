module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/vue-schadule/" : "/",
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/style/.variables.scss";
          @import "@/style/.mixins.scss";`,
      },
    },
  },
};
