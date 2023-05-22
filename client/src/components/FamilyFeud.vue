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

const questionsAndAnswers = reactive(questionsAndAnswersData);
const teams = reactive(teamsData);
const teamStrikes = reactive([0, 0]);
const activeTeamIndex = ref(0);
const activeQuestionIndex = ref(0);
const showStrikes = ref(false);
const gameStarted = ref(true);
const applauseActive = ref(false);
const gameEnded = ref(false);
const gameWinner = ref<number | null>(null);

function setTeam(teamIndex: number, teamName: string) {
  teams[teamIndex].name = teamName;
}

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

      case 'KeyQ':
        endGame();
        break;
    }
  });
})
</script>

<template>
  <div class="h-screen overflow-hidden">
    <div v-if="!gameStarted" class="flex items-center justify-center h-screen">
      <div>
        <h1 class="text-7xl font-bold mb-10 font-feud uppercase">Cornerstone Feud</h1>
        <form class="flex flex-col gap-7" @submit="(event) => {
          event.preventDefault();
          startGame();
        }">
          <div class="flex flex-col gap-y-3">
            <label for="team1" class="text-3xl font-bold font-feud uppercase">Team 1</label>
            <input
              id="team1"
              type="text"
              class="text-2xl border-2 border-gray-300 px-3 py-3 rounded-md"
              @input="(event: any) => setTeam(0, event.currentTarget.value)"
              :value="teams[0].name"
            />
          </div>
          <div class="flex flex-col gap-y-3">
            <label for="team2" class="text-3xl font-bold font-feud uppercase">Team 2</label>
            <input
              id="team2"
              type="text"
              class="text-2xl border-2 border-gray-300 px-3 py-3 rounded-md"
              @input="(event: any) => setTeam(1, event.currentTarget.value)"
              :value="teams[1].name"
            />
          </div>
          <button
            class="text-4xl px-10 py-5 bg-blue-500 text-white font-bold rounded-lg disabled:bg-gray-500 font-feud uppercase"
            type="submit"
            :disabled="teams[0].name === '' || teams[1].name === ''"
          >
              Start Game
          </button>
        </form>
      </div>
    </div>
    <div v-else-if="gameEnded" class="flex flex-col items-center justify-center gap-y-10 h-screen">
      <div class="text-6xl font-bold">
        <h2 v-if="gameWinner === null">{{ teams[0].name }} and {{ teams[1].name }} tied!</h2>
        <h2 v-else>{{ teams[gameWinner].name }} won!</h2>
      </div>
      <button class="text-4xl px-10 py-5 bg-blue-500 text-white font-bold rounded-lg" @click="resetGame">Play Again</button>
    </div>
    <div v-else>
      <LightOval>
        <div class="grid gap-y-[3%] my-auto pt-[5%] w-[77.5%] mx-auto">
        <Teams
          :teams="teams"
          :active-team-index="activeTeamIndex"
          @selected="selectTeam"
        />

        <SurveyBoard
          :answers="questionsAndAnswers[activeQuestionIndex].answers"
          @reveal="revealAnswer"
        />
        </div>
      </LightOval>

      <transition @enter="animateStrikeIn" @leave="animateStrikeOut" appear>
        <Strikes :count="teamStrikes[activeTeamIndex]" v-if="showStrikes" />
      </transition>
    </div>
  </div>
</template>
