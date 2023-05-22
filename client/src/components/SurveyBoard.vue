<script setup lang="ts">
import { computed } from 'vue';
import Answer from '../types/Answer';
import SurveyBoardItem from './SurveyBoardItem.vue';
import BlankSurveyBoardItem from './BlankSurveyBoardItem.vue';
import SurveyBoardFrame from './SurveyBoardFrame.vue';

const props = defineProps<{ answers: Answer[] }>();
const emit = defineEmits<{ reveal: [index: number] }>();

const blankItems = computed(() => 8 - props.answers.length);
</script>

<template>
    <SurveyBoardFrame>
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
    </SurveyBoardFrame>
</template>