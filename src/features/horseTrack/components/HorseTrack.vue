<script setup lang="ts">
import { computed, watch } from "vue";
import { useStore } from "vuex";

const store = useStore()

const isRunning = computed(() => store.state.horseRace.isRunning)
const racePrograms = computed(() => store.getters["program/getRacePrograms"])
const currentRound = computed(() => store.state.horseRace.currentRound)

const currentRace = computed(() => {
    return racePrograms.value[currentRound.value] || { distance: 0, horses: [] }
})

const trackProgress = computed(() => {
    return currentRace.value.horses.map((horse: { name: any; progress: any; color:any }) => ({
        name: horse.name,
        color:horse.color,
        progress: horse.progress || 0,
    }))
})

watch(isRunning, (newVal) => {
    if (newVal) {
        store.dispatch("horseRace/startRace")
    }
})
</script>

<template>
    <div class="horse-track">
        <div class="track-header">
            <div class="round">{{ currentRound + 1 }}</div>
            <div class="length">{{ currentRace.distance }} M</div>
        </div>
        <div class="track-race-wrapper">
            <div class="lane-wrapper">
                <HorseItem :items="trackProgress" />
            </div>
            <div class="flag"></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '@/features/horseTrack/style/horseTrack.scss';
</style>
