<script setup lang="ts">
import { gsap } from 'gsap';
import { onMounted, reactive, ref } from 'vue';
import questionsAndAnswersData from '../data/questionsAndAnswersData';
import teamsData from '../data/teamsData';
import Teams from './Teams.vue';
import SurveyBoard from './SurveyBoard.vue';
import Strikes from './Strikes.vue';
import themeSongUrl from '../assets/sounds/ThemeSong.mp3';
import revealAnswerSoundUrl from '../assets/sounds/AnswerReveal.mp3';
import applauseUrl from '../assets/sounds/Applause.mp3';
import strikeSoundUrl from '../assets/sounds/Strike.mp3';

const questionsAndAnswers = reactive(questionsAndAnswersData);
const teams = reactive(teamsData);
const teamStrikes = reactive([0, 0]);
const activeTeamIndex = ref(0);
const activeQuestionIndex = ref(0);
const showStrikes = ref(false);
const gameStarted = ref(false);
const applauseActive = ref(false);

function startGame() {
  gameStarted.value = true;
  const themeSong = new Audio(themeSongUrl);
  themeSong.volume = 0.2;
  themeSong.loop = true;
  themeSong.play();
}

function selectTeam(teamIndex: number) {
  activeTeamIndex.value = teamIndex;
}

function revealAnswer(answerIndex: number) {
  if (teamStrikes[activeTeamIndex.value] === 3)
    return;

  teams[activeTeamIndex.value].score++;
  questionsAndAnswers[activeQuestionIndex.value].answers[answerIndex].revealed = true;

  const revealAnswerSound = new Audio(revealAnswerSoundUrl);
  revealAnswerSound.play();

  if (!applauseActive.value) {
    const applauseSound = new Audio(applauseUrl);
    applauseSound.volume = 0.3;
    applauseSound.addEventListener('ended', () => applauseActive.value = false);
    applauseSound.play();
    applauseActive.value = true;
  }
}

function resetStrikes() {
  for (let index = 0; index < teamStrikes.length; index++)
    teamStrikes[index] = 0;
}

function addStrike() {
  if (teamStrikes[activeTeamIndex.value] < 3) {
    teamStrikes[activeTeamIndex.value]++;
    showStrikes.value = true;
    
    const strikeSound = new Audio(strikeSoundUrl);
    strikeSound.play();
  }
}

function nextQuestion() {
  if (activeQuestionIndex.value < questionsAndAnswers.length - 1) {
    activeQuestionIndex.value++;
    resetStrikes();
  }
}

function animateStrikeIn(element : Element, done: any) {
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

    setTimeout(() => showStrikes.value = false, 2000);
}

function animateStrikeOut(element: Element, done: any) {
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
  });
})
</script>

<template>
  <div class="p-5">
    <div v-if="!gameStarted" class="flex items-center justify-center gap-10 h-screen">
      <div class="text-center flex flex-col items-center gap-16">
        <h1 class="text-9xl font-bold">Cornerstone Feud</h1>
        <button class="text-7xl px-12 py-5 bg-blue-500 text-white font-bold rounded-lg" @click="startGame">Start Game</button>
      </div>
    </div>
    <div class="grid gap-y-3" v-else>
      <Teams
        :teams="teams"
        :active-team-index="activeTeamIndex"
        @selected="selectTeam"
      />

      <SurveyBoard
        :answers="questionsAndAnswers[activeQuestionIndex].answers"
        @reveal="revealAnswer"
      />

      <transition @enter="animateStrikeIn" @leave="animateStrikeOut" appear>
        <Strikes :count="teamStrikes[activeTeamIndex]" v-if="showStrikes" />
      </transition>
    </div>
  </div>
</template>
