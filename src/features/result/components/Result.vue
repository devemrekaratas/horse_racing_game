<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore()

const resultList = computed(() => store.getters['resultList/getAllRounds'])
</script>

<template>
  <div class="result">
    <HRTable v-for="(result, idx) in resultList" :key="idx" :tableTitle="`Round ${result.round} / ${result.distance}`"
      :data-testid="`result-container-${result.round}`"
      :headers="[
        { name: 'position', title: 'Position',width: '10%' },
        { name: 'name', title: 'Name',width: '90%' }
      ]" :items="result.horses">
      <template #position="{ item, index }">
        <div>{{ index + 1 }}</div>
      </template>
      <template #name="{ item }">
        <div data-testid="result-name">{{ item.name }}</div>
      </template>
    </HRTable>
  </div>
</template>

<style lang="scss" scoped>
@use '@/features/result/style/result.scss';
</style>