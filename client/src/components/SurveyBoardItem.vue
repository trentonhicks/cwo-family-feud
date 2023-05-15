<script setup lang="ts">
import Answer from '../types/Answer';
import SurveyButton from './SurveyButton.vue';

const props = defineProps<{ answer: Answer, index: number }>();
const emit = defineEmits<{reveal: [index: number]}>();
</script>

<template>
    <SurveyButton
        v-bind="props"
        @reveal="(answerIndex: number) => emit('reveal', answerIndex)"
    />
</template>