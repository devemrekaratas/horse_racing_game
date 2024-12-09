<script setup lang="ts">
import { useStore } from 'vuex';

const store = useStore()

const handleGenerate = async () => {
  await store.dispatch("horseRace/resetAll")
  await store.dispatch("controls/generateRandomHorses")
  await store.dispatch("program/generateRacePrograms")
}
</script>

<template>
  <button @click="handleGenerate">generate program</button>
</template>

<style lang="scss" scoped>
@use "@/features/controls/style/control.scss";
</style>