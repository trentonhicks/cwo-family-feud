<script setup lang="ts">
import Strike from './Strike.vue';

defineProps<{ count: number }>();

</script>

<template>
    <div class="fixed z-50 inset-0 w-full h-full flex items-center justify-center gap-5 pointer-events-none">
        <Strike v-for="_ in count" width="calc(100vw / 4)" height="auto" class="strike" />
    </div>
</template>