<script setup lang="ts">
import { nav } from "../../index";
// @ts-ignore
import { computed } from "vue";
// 提前过滤掉不需要的项
const filteredNav = computed(() => {
  return nav.filter((value) => value.text !== "Think");
});
</script>

<template>
  <!-- 如果 value.text是思考就不显示-->
  <div v-for="value in filteredNav" class="container">
    <a v-for="item in value.items" class="button" :href="item.link">{{ item.text }}</a>
  </div>
</template>

<style scoped>
.container {
  padding-top: 2rem;
  .button {
    display: inline-block;
    height: 2.5rem;
    border-color: var(--vp-button-alt-border);
    color: var(--vp-button-alt-text);
    background-color: var(--vp-button-alt-bg);
    border-radius: 1.25rem;
    padding: 0 1.25rem;
    margin: 0.375rem;
    line-height: 2.5rem;
    font-size: 14px;
    font-weight: 600;
  }
  .button:hover {
    border-color: var(--vp-button-brand-border);
    color: var(--vp-button-brand-text);
    background-color: var(--vp-button-brand-bg);
    transition:
      color 0.2s,
      border-color 0.2s,
      background-color 0.2s;
    cursor: pointer;
  }
}
</style>
