<script setup lang="ts">
import { gsap } from 'gsap';
import { onMounted, reactive, ref, watch } from 'vue';
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
const roundIndex = ref(0);
const teams = reactive(teamsData);
const teamStrikes = reactive([0, 0]);
const activeTeamIndex = ref(0);
const activeQuestionIndex = ref(0);
const showStrikes = ref(false);
const gameStarted = ref(false);
const applauseActive = ref(false);
const gameEnded = ref(false);
const gameWinner = ref<number | null>(null);

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
  roundIndex.value = 0;
  teams[0].currentRoundScore = 0;
  teams[1].currentRoundScore = 0;

  teams.forEach((team, index) => {
    team.score = 0;
    teamStrikes[index] = 0;
  });

  questionsAndAnswers[roundIndex.value].forEach((questionAndAnswers) => {
    questionAndAnswers.answers.forEach(answer => {
      answer.revealed = false;
    });
  });
}

function selectTeam(teamIndex: number) {
  activeTeamIndex.value = teamIndex;
}

function revealAllAnswers() {
  questionsAndAnswers[roundIndex.value][activeQuestionIndex.value].answers.forEach(answer => answer.revealed = true);
}

function revealAnswer(answerIndex: number) {
  const otherTeamIndex = activeTeamIndex.value === 0 ? 1 : 0;
  const otherTeamStrikeCount = teamStrikes[otherTeamIndex];
  const pointsForAnswer = questionsAndAnswers[roundIndex.value][activeQuestionIndex.value].answers[answerIndex].points;

  if (teamStrikes[activeTeamIndex.value] === 3)
    return;

  if (questionsAndAnswers[roundIndex.value][activeQuestionIndex.value].answers[answerIndex] === undefined)
    return;

  if (questionsAndAnswers[roundIndex.value][activeQuestionIndex.value].answers[answerIndex].revealed)
    return;

  if (otherTeamStrikeCount === 3) {
    teams[activeTeamIndex.value].score += teams[otherTeamIndex].currentRoundScore + pointsForAnswer;
    teams[activeTeamIndex.value].currentRoundScore += teams[otherTeamIndex].currentRoundScore + pointsForAnswer;
    teams[otherTeamIndex].score -= teams[otherTeamIndex].currentRoundScore;
    teams[otherTeamIndex].currentRoundScore -= teams[otherTeamIndex].currentRoundScore;
  }

  else {
    teams[activeTeamIndex.value].score += pointsForAnswer;
    teams[activeTeamIndex.value].currentRoundScore += pointsForAnswer;
  }

  questionsAndAnswers[roundIndex.value][activeQuestionIndex.value].answers[answerIndex].revealed = true;

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

    if (teamStrikes[activeTeamIndex.value] === 3) {
      selectTeam(activeTeamIndex.value === 0 ? 1 : 0);
    }
  }
}

function nextQuestion() {
  if (activeQuestionIndex.value < questionsAndAnswers[roundIndex.value].length - 1) {
    activeQuestionIndex.value++;
    resetStrikes();
    teams[0].currentRoundScore = 0;
    teams[1].currentRoundScore = 0;
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

function animateScreenIn(element: HTMLElement, done: any) {
  switch (element.dataset.screen) {
    case 'startGame':
      gsap.fromTo(element, { opacity: 0, }, { opacity: 1, duration: 0.5, ease: 'power1.out', onComplete: done });
      break;

    case 'startedGame':
      gsap.fromTo(element, { y: '100%', }, { y: 0, duration: 1, ease: 'power3.out', onComplete: done });
      break;

    case 'endedGame':
      gsap.fromTo(element, { scale: 0 }, { scale: 1, duration: 1, ease: 'bounce', onComplete: done });
      break;
  }
}

function animateScreenOut(element: HTMLElement, done: any) {
  switch (element.dataset.screen) {
    case 'startGame':
      gsap.to(element, { opacity: 0, duration: 0.2, ease: 'power1.out', onComplete: done });
      break;

    case 'startedGame':
      gsap.to(element, { y: '100%', opacity: 0, duration: 0.5, ease: 'power3.out', onComplete: done });
      break;

    case 'endedGame':
      gsap.to(element, { opacity: 0, duration: 0.2, ease: 'power1.out', onComplete: done });
      break;
  }
}

watch(roundIndex, () => {
  switch (roundIndex.value) {
    case 0:
      teams[0].name = "Bruns'";
      teams[1].name = "Jessens";
      break;
    case 1:
      teams[0].name = 'Roseners';
      teams[1].name = 'Messerschmidts';
      break;
    case 2:
      teams[0].name = "Gordons";
      teams[1].name = "Loomis’";
      break;
  }
}, { immediate: true, });

onMounted(() => {
  document.addEventListener('keyup', (event) => {
    if (!gameStarted.value || gameEnded.value)
      return;

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

      case "KeyA":
        revealAllAnswers();
        break;

      case 'Digit9':
        selectTeam(0);
        break;

      case 'Digit0':
        selectTeam(1);
        break;

      case 'Digit1':
        revealAnswer(0);
        break;

      case 'Digit2':
        revealAnswer(1);
        break;

      case 'Digit3':
        revealAnswer(2);
        break;

      case 'Digit4':
        revealAnswer(3);
        break;

      case 'Digit5':
        revealAnswer(4);
        break;

      case 'Digit6':
        revealAnswer(5);
        break;

      case 'Digit7':
        revealAnswer(6);
        break;

      case 'Digit8':
        revealAnswer(7);
        break;
    }
  });
})
</script>

<template>
  <div class="h-screen overflow-hidden">
    <transition
      @enter="(element, done) => animateScreenIn(element as HTMLElement, done)"
      @leave="(element, done) => animateScreenOut(element as HTMLElement, done)"
    >
      <!-- Start Game -->
      <div
        v-if="!gameStarted"
        class="flex items-center justify-center h-screen relative z-10 text-white scale-125"
        data-screen="startGame"
      >
        <div class="w-full px-[27%] font-feud">
          <Logo class="mx-auto" />
          <form class="flex flex-col gap-8" @submit="(event) => {
            event.preventDefault();
            startGame();
          }">
            <div>
              <label for="team-1" class="sr-only max-w-fit font-medium leading-6 text-white text-3xl bg-black/30 backdrop-blur-lg py-3 px-5 rounded-md"
              >
                Round
              </label>
              <div class="mt-2">
                <select
                  type="text"
                  name="round"
                  id="round"
                  class="block w-full text-4xl rounded-md border-0 px-5 py-3 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                  v-model="roundIndex"
                >
                  <option :value="0">Round 1</option>
                  <option :value="1">Round 2</option>
                  <option :value="2">Round 3</option>
                </select>
              </div>
            </div>
            <button
              class="scale-150 origin-top text-3xl px-10 py-3 max-w-fit mx-auto transition-colors bg-[#007ee8]/30 hover:bg-[#007ee8]/100 backdrop-blur-lg border-8 border-[#5e9fff] text-white font-bold rounded-lg disabled:bg-gray-500 font-feud uppercase"
              type="submit"
              :disabled="teams[0].name === '' || teams[1].name === ''"
            >
                <div>Start Game</div>
            </button>
          </form>
        </div>
      </div>

      <!-- Started Game -->
      <div 
        v-else-if="!gameEnded"
        class="relative z-10"
        data-screen="startedGame"
      >
        <LightOval>
          <Teams
            :teams="teams"
            :active-team-index="activeTeamIndex"
            @selected="selectTeam"
          />

          <SurveyBoard
            :answers="questionsAndAnswers[roundIndex][activeQuestionIndex].answers"
            @reveal="revealAnswer"
          />
        </LightOval>

        <transition @enter="animateStrikeIn" @leave="animateStrikeOut" appear>
          <Strikes :count="teamStrikes[activeTeamIndex]" v-if="showStrikes" />
        </transition>
      </div>

      <!-- Ended Game -->
      <div
        v-else
        class="flex flex-col items-center justify-center gap-y-10 h-screen relative z-10"
        data-screen="endedGame"
      >
        <div class="scale-150 flex flex-col gap-y-10">
          <div class="text-6xl font-bold text-white font-feud bg-black/30 backdrop-blur-lg px-20 py-10 border-2 shadow-inner border-[#FFE978] rounded-lg">
           <h2 v-if="gameWinner === null">{{ teams[0].name }} and {{ teams[1].name }} tied!</h2>
            <h2 v-else>{{ teams[gameWinner].name }} won!</h2>
          </div>
          <button class="scale-125 text-3xl px-10 py-3 max-w-fit mx-auto transition-colors bg-[#007ee8]/30 hover:bg-[#007ee8]/100 backdrop-blur-lg border-8 border-[#5e9fff] text-white font-bold rounded-lg disabled:bg-gray-500 font-feud uppercase" @click="resetGame">Play Again</button>
        </div>
      </div>
    </transition>

    <!-- Video Backgrounds -->
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
