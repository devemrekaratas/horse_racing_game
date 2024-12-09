<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore()

const horseList = computed(() => store.state.horseList.horses)

onMounted(() => {
    store.dispatch('controls/generateRandomHorses')
})
</script>

<template>
    <div class="horse-list">
        <HRTable :tableTitle="'Horses List'" :headers="[
            { name: 'name', title: 'Name', width: '50%' },
            { name: 'condition', title: 'Condition', width: '25%' },
            { name: 'color', title: 'Color', width: '25%' }
        ]" :items="horseList">
            <template #name="{ item, index }">
                {{ item.name }}
            </template>
            <template #condition="{ item }">
                {{ item.condition }}
            </template>
            <template #color="{ item }">
                <div class="color-box" :style="`background-color:${item.color}`"></div>
            </template>
        </HRTable>
    </div>
</template>

<style lang="scss" scoped>
@use '@/features/horseList/style/horseList.scss';
</style>
