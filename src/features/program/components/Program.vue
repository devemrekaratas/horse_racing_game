<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore()

const racePrograms = computed(() => store.state.program.racePrograms)

onMounted(() => {
  store.dispatch('program/generateRacePrograms')
})
</script>

<template>
  <div class="program">
    <HRTable v-for="(program, index) in racePrograms" :key="index"
      :tableTitle="`Round ${index + 1} / ${program.distance}`" :headers="[
        { name: 'position', title: 'Position',width: '10%' },
        { name: 'name', title: 'Name',width: '90%' }
      ]" :items="program.horses">
      <template #position="{ item, index }">
        <div>{{ index + 1 }}</div>
      </template>
      <template #name="{ item }">
        <div>{{ item.name }}</div>
      </template>
    </HRTable>
  </div>
</template>

<style lang="scss" scoped>
@use '@/features/program/style/program.scss';
</style>