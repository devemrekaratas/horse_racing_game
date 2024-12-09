<script setup lang="ts">
interface IProps {
    headers: { name: string; title: string; width?: string }[]
    tableTitle: string
    items: any[]
    style?: string
}

const props = defineProps<IProps>()
</script>

<template>
    <table>
        <thead>
            <tr class="first-box">
                <th colspan="3">{{ props.tableTitle }}</th>
            </tr>
            <tr class="second-box">
                <th v-for="(header, index) in props.headers" :key="index" :style="{ width: header.width || 'auto' }">
                    {{ header.title }}
                </th>
            </tr>
        </thead>
        <tbody>
            <template v-if="props.items && props.items.length > 0">
                <tr v-for="(item, index) in props.items" :key="index">
                    <td v-for="header in props.headers" :key="header.name">
                        <slot :name="header.name" :item="item" :index="index" />
                    </td>
                </tr>
            </template>
        </tbody>
    </table>
</template>

<style lang="scss" scoped>
@use '@/assets/style/components/hrTable.scss';
</style>
