<script setup lang="ts">
import SurveyButtonFront from './SurveyButtonFront.vue';
import SurveyButtonTop from './SurveyButtonTop.vue';
import SurveyButtonBack from './SurveyButtonBack.vue';
import SurveyButtonParentSizer from './SurveyButtonParentSizer.vue';
import Answer from '../types/Answer';
import { ref, onMounted, watch } from 'vue';
import { gsap } from 'gsap';

const emit = defineEmits<{ reveal: [answerIndex: number] }>();
const props = defineProps<{ answer: Answer, index: number }>();
const button = ref<HTMLElement>();
const buttonHeight = ref(0);

function handleClick() {
    if (props.answer.revealed)
        return

    emit('reveal', props.index);
}

function resizeButton() {
    buttonHeight.value = button.value!.offsetHeight / 2;

    const buttonBack : HTMLDivElement = button.value!.querySelector('.back')!;

    buttonBack.style.transform = `rotateX(-180deg) translateZ(${buttonHeight.value}px)`;
}

onMounted(() => {
    resizeButton();

    window.addEventListener('resize', () => {
        resizeButton();
    });
});

watch(() => props.answer.revealed, (revealed) => {
    const buttonElement = button.value!;
    const buttonAnswerElement = buttonElement.querySelector('svg text')!;

    if (revealed) {
        gsap.to(buttonElement, { transformOrigin: '50% 50%', rotateX: '-180deg', ease: 'power1.out', duration: 0.5 });
        gsap.fromTo(buttonAnswerElement, { opacity: 0, y: 20, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, ease: 'power1.out', duration: 0.5, delay: 0.1 });
    }
    else {
        gsap.to(buttonElement, { transformOrigin: '50% 50%', rotateX: '0deg', ease: 'power1.out', duration: 0.5 });
        gsap.to(buttonAnswerElement, { opacity: 0, rotateX: '0deg', ease: 'power1.out', duration: 0 });
    }
});
</script>

<template>
    <button
        @click="handleClick"
        class="relative"
        style="transform-style: preserve-3d;"
        ref="button">
        <SurveyButtonTop class="layer top" />
        <SurveyButtonBack class="layer back">{{ answer.text }}</SurveyButtonBack>
        <SurveyButtonFront class="layer front">{{ index + 1 }}</SurveyButtonFront>
        <SurveyButtonParentSizer />
    </button>
</template>

<style scoped>
    .layer {
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: inherit;
    }

    .top {
        transform: rotateX(90deg) translateY(-50%);
        transform-origin: top;
    }
</style>