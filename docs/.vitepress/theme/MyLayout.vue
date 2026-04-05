<!-- 这是自定义布局组件,可以在这里添加自定义的首页布局内容
 https://vitepress.dev/zh/guide/extending-default-theme#layout-slots -->
<script setup>
import DefaultTheme from "vitepress/theme";
import HomeButton from "../components/homeButton.vue";

const { Layout } = DefaultTheme;
</script>

<template>
  <Layout>
    <template #home-hero-info-after>
      <HomeButton></HomeButton>
    </template>
  </Layout>
</template>
