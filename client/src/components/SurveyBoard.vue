<script setup lang="ts">
import { computed } from 'vue';
import Answer from '../types/Answer';
import SurveyBoardItem from './SurveyBoardItem.vue';
import BlankSurveyBoardItem from './BlankSurveyBoardItem.vue';

const props = defineProps<{ answers: Answer[] }>();
const emit = defineEmits<{ reveal: [index: number] }>();

const blankItems = computed(() => 8 - props.answers.length);
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
        <BlankSurveyBoardItem
            v-for="item in blankItems"
            :key="`blank-${item}`"
        />
    </div>
</template>