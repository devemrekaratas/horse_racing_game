<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore()

const isRunning = computed(() => store.state.horseRace.isRunning)

const handleStartPause = async () => {
    await store.dispatch("controls/toggleRace")
}
</script>

<template>
    <button @click="handleStartPause">{{ isRunning ? 'pause' : 'start'  }}</button>
</template>

<style lang="scss" scoped>
@use "@/features/controls/style/control.scss";
</style>