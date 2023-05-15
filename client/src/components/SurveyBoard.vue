<script setup lang="ts">
import Answer from '../types/Answer';
import SurveyBoardItem from './SurveyBoardItem.vue';

defineProps<{ answers: Answer[] }>();
const emit = defineEmits<{ reveal: [index: number] }>();
</script>

<template>
    <div class="grid grid-cols-2 grid-rows-4 grid-flow-col gap-3">
        <SurveyBoardItem
            v-for="(answer, answerIndex) in answers"
            :key="`answer-${answerIndex}`"
            :answer="answer"
            :index="answerIndex"
            @reveal="(index: number) => emit('reveal', index)"
        />
    </div>
</template>