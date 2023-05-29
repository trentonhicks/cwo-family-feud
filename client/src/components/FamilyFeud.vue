<script setup lang="ts">
import { gsap } from 'gsap';
import { onMounted, reactive, ref } from 'vue';
import questionsAndAnswersData from '../data/questionsAndAnswersData';
import teamsData from '../data/teamsData';
import Teams from './Teams.vue';
import SurveyBoard from './SurveyBoard.vue';
import Strikes from './Strikes.vue';
import revealAnswerSoundUrl from '../assets/sounds/AnswerReveal.mp3';
import applauseUrl from '../assets/sounds/Applause.mp3';
import strikeSoundUrl from '../assets/sounds/Strike.mp3';
import LightOval from './LightOval.vue';
import Logo from './Logo.vue';
import mainVideoUrl from '../assets/videos/1.mp4';
import teamVideoUrl from '../assets/videos/6.mp4';

const questionsAndAnswers = reactive(questionsAndAnswersData);
const teams = reactive(teamsData);
const teamStrikes = reactive([0, 0]);
const activeTeamIndex = ref(0);
const activeQuestionIndex = ref(0);
const showStrikes = ref(false);
const gameStarted = ref(false);
const applauseActive = ref(false);
const gameEnded = ref(false);
const gameWinner = ref<number | null>(null);

// function setTeam(teamIndex: number, teamName: string) {
//   teams[teamIndex].name = teamName;
// }

function startGame() {
  gameStarted.value = true;
}

function endGame() {
  gameWinner.value = teams[0].score === teams[1].score
    ? null
    : teams[0].score > teams[1].score
    ? 0 : 1;
  
    gameEnded.value = true;
}

function resetGame() {
  gameStarted.value = false;
  gameEnded.value = false;
  gameWinner.value = null;
  activeTeamIndex.value = 0;
  activeQuestionIndex.value = 0;

  teams.forEach((team, index) => {
    team.score = 0;
    teamStrikes[index] = 0;
  });

  questionsAndAnswers.forEach((questionAndAnswers) => {
    questionAndAnswers.answers.forEach(answer => {
      answer.revealed = false;
    });
  });
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
  if (teamStrikes[activeTeamIndex.value] < 3 && gameStarted.value && !gameEnded.value) {
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

      case 'KeyQ':
        endGame();
        break;
    }
  });
})
</script>

<template>
  <div class="h-screen overflow-hidden">
    <div v-if="!gameStarted" class="flex items-center justify-center h-screen relative z-10 text-white">
      <div class="w-full px-[20%]">
        <Logo class="mx-auto" />
        <form class="flex flex-col gap-7" @submit="(event) => {
          event.preventDefault();
          startGame();
        }">
          <button
            class="text-3xl px-10 py-3 max-w-fit mx-auto transition-colors bg-[#007ee8]/30 hover:bg-[#007ee8]/100 backdrop-blur-lg border-8 border-[#5e9fff] text-white font-bold rounded-lg disabled:bg-gray-500 font-feud uppercase"
            type="submit"
            :disabled="teams[0].name === '' || teams[1].name === ''"
          >
              <div class="">Start Game</div>
          </button>
        </form>
      </div>
    </div>

    <div v-else-if="gameEnded" class="flex flex-col items-center justify-center gap-y-10 h-screen relative z-10">
      <div class="text-6xl font-bold text-white font-feud">
        <h2 v-if="gameWinner === null">{{ teams[0].name }} and {{ teams[1].name }} tied!</h2>
        <h2 v-else>{{ teams[gameWinner].name }} won!</h2>
      </div>
      <button class="text-3xl px-10 py-3 bg-[#21409a] text-white font-bold rounded-lg uppercase font-feud" @click="resetGame">Play Again</button>
    </div>

    <div v-else>
      <LightOval>
        <Teams
          :teams="teams"
          :active-team-index="activeTeamIndex"
          @selected="selectTeam"
        />

        <SurveyBoard
          :answers="questionsAndAnswers[activeQuestionIndex].answers"
          @reveal="revealAnswer"
        />
      </LightOval>

      <transition @enter="animateStrikeIn" @leave="animateStrikeOut" appear>
        <Strikes :count="teamStrikes[activeTeamIndex]" v-if="showStrikes" />
      </transition>
    </div>

    <figure
      class="fixed inset-0 z-0 object-cover object-center bg-orange-300"
      v-show="!gameStarted || gameEnded"
    >
        <video
          :src="mainVideoUrl"
          loop="true"
          class="object-cover w-full h-full"
          autoplay
          muted
          style="mix-blend-mode: luminosity;"
        ></video>
    </figure>

    <figure
      class="fixed inset-0 z-0 object-cover object-center bg-orange-300"
      v-show="gameStarted && activeTeamIndex === 0 && !gameEnded"
    >
        <video
          :src="teamVideoUrl"
          loop="true"
          class="object-cover object-top w-full h-full rotate-180"
          autoplay
          muted
          style="mix-blend-mode: luminosity;"
        ></video>
    </figure>

    <figure
      class="fixed inset-0 z-0 object-cover object-center bg-orange-300"
      v-show="gameStarted && activeTeamIndex === 1 && !gameEnded"
    >
        <video
          :src="teamVideoUrl"
          loop="true"
          class="object-cover w-full h-full"
          autoplay
          muted
          style="mix-blend-mode: luminosity;"
        ></video>
    </figure>
  </div>
</template>
