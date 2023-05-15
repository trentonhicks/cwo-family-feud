<script setup lang="ts">
import { gsap } from 'gsap';
import { onMounted, reactive, ref } from 'vue';
import questionsAndAnswersData from '../data/questionsAndAnswersData';
import teamsData from '../data/teamsData';

import Teams from './Teams.vue';
import SurveyBoard from './SurveyBoard.vue';
import Strikes from './Strikes.vue';

const questionsAndAnswers = reactive(questionsAndAnswersData);
const teams = reactive(teamsData);
const teamStrikes = reactive([0, 0]);
const activeTeamIndex = ref(0);
const activeQuestionIndex = ref(0);
const showStrikes = ref(false);

function selectTeam(teamIndex: number) {
  activeTeamIndex.value = teamIndex;
}

function addPoint(answerIndex: number) {
  if (teamStrikes[activeTeamIndex.value] === 3)
    return;

  teams[activeTeamIndex.value].score++;
  questionsAndAnswers[activeQuestionIndex.value].answers[answerIndex].revealed = true;
}

function resetStrikes() {
  for (let index = 0; index < teamStrikes.length; index++)
    teamStrikes[index] = 0;
}

function addStrike() {
  if (teamStrikes[activeTeamIndex.value] < 3)
    teamStrikes[activeTeamIndex.value]++;

    showStrikes.value = true;
}

function nextQuestion() {
  if (activeQuestionIndex.value < questionsAndAnswers.length - 1) {
    activeQuestionIndex.value++;
    resetStrikes();
  }
}

function animateX(element : Element, done: any) {
    gsap.fromTo(element.querySelectorAll('.strike'),
    {
        scale: 0,
    },
    {
        scale: 1,
        ease: 'bounce.out',
        stagger: 0.1,
        duration: 0.5,
        onComplete: done,
    });
}

function animateXOut(element: Element, done: any) {
    gsap.to(element.querySelectorAll('.strike'),
    {
        opacity: 0,
        scale: 0.5,
        ease: 'power1.out',
        duration: 0.3,
        onComplete: done,
    });
}

onMounted(() => {
  document.addEventListener('keyup', (event) => {
    switch(event.code) {
      case 'ArrowRight':
        nextQuestion();
        break;

      case 'KeyX':
        addStrike();
        break;
    }
  })
})
</script>

<template>
  <div class="p-5 grid gap-y-3">
    <Teams
      :teams="teams"
      :active-team-index="activeTeamIndex"
      @selected="selectTeam"
    />

    <SurveyBoard
      :answers="questionsAndAnswers[activeQuestionIndex].answers"
      @reveal="addPoint"
    />

    <transition @enter="animateX" @leave="animateXOut" appear>
      <Strikes :count="teamStrikes[activeTeamIndex]" v-if="showStrikes" />
    </transition>
  </div>
</template>
