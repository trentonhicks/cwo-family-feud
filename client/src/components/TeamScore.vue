<script setup lang="ts">
import Team from '../types/Team';
defineProps<{ active: boolean, team: Team }>();
</script>

<template>
    <button class="grid gap-[5%] w-[45%] mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 709.36 158.93">
            <defs>
                <radialGradient id="radial-gradient-team-active" cx="354.68" cy="79.05" fx="354.68" fy="79.05" r="538.76" gradientUnits="userSpaceOnUse">
                <stop offset="0" stop-color="#ffe100"/>
                <stop offset="1" stop-color="#ff8000"/>
                </radialGradient>
                <radialGradient id="radial-gradient-team-active-2" cx="-2513.55" cy="2534.94" fx="-2513.55" fy="2534.94" r="476.31" gradientTransform="translate(1666.93 -1188.15) scale(.52 .5)" gradientUnits="userSpaceOnUse">
                <stop offset="0" stop-color="#fff700" stop-opacity="0"/>
                <stop offset="1" stop-color="#ff8000"/>
                </radialGradient>
            </defs>
            <g class="cls-7">
                <g id="Layer_2" data-name="Layer 2">
                <g id="Layer_1-2" data-name="Layer 1">
                    <rect class="cls-2" x="5" y="5" width="699.36" height="148.1"/>
                    <rect class="cls-1" x="5" y="5" width="699.36" height="148.1"/>
                    <rect class="cls-3" x="10.12" y="9.55" width="688.29" height="139.55"/>
                    <rect :class="[
                        'team-inactive-class-1 transition-opacity duration-300',
                        active ? 'opacity-0' : 'opacity-1'
                      ]"
                      x="5"
                      y="5"
                      width="699.01"
                      height="148.1"
                    />
                    <g>
                    <g>
                        <text
                          :class="{ 'cls-4 font-bebas text-uppercase transition-colors duration-300': true, 'fill-white': !active }"
                          x="50%"
                          y="50%"
                          alignment-baseline="middle"
                          text-anchor="middle">{{ team.name }}</text>
                    </g>
                    </g>
                </g>
                </g>
            </g>
        </svg>
        <svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 481.38 209.93" class="w-9/12 mx-auto">
          <g id="Layer_1-2" data-name="Layer 1">
            <rect class="score-box-class-2" x="5" y="5" width="471.38" height="199.93"/>
            <text class="score-box-class-5" alignment-baseline="middle" text-anchor="middle" x="50%" y="50%">{{ team.score }}</text>
          </g>
        </svg>
    </button>
</template>

<style scoped>
      .cls-1 {
        fill: url(#radial-gradient-team-active);
      }

      .cls-1, .cls-2, .cls-3 {
        stroke: #000;
        stroke-miterlimit: 10;
        stroke-width: 10px;
      }

      .cls-4 {
        @apply font-bebas;
        font-size: 100px;
      }

      .cls-2 {
        fill: #21409a;
      }

      .cls-5 {
        letter-spacing: .02em;
      }

      .cls-3 {
        fill: url(#radial-gradient-team-active-2);
        mix-blend-mode: overlay;
      }

      .cls-6 {
        letter-spacing: .02em;
      }

      .cls-7 {
        isolation: isolate;
      }

      .team-inactive-class-1 {
        fill: #21409a;
        stroke: #000;
        stroke-miterlimit: 10;
        stroke-width: 10px;
      }

      .team-inactive-class-2 {
        letter-spacing: .02em;
      }

      .team-inactive-class-3 {
        fill: #fff;
        font-family: Bebas, Bebas;
        font-size: 100px;
      }

      .team-inactive-class-4 {
        letter-spacing: .02em;
      }

      .team-inactive-class-5 {
        isolation: isolate;
      }

      .team-inactive-class-6 {
        mix-blend-mode: multiply;
        opacity: .75;
      }

      .score-box-class-1 {
        letter-spacing: 0em;
      }

      .score-box-class-2 {
        fill: #21409a;
        stroke: #000;
        stroke-miterlimit: 10;
        stroke-width: 10px;
      }

      .score-box-class-3 {
        letter-spacing: .02em;
      }

      .score-box-class-4 {
        letter-spacing: .02em;
      }

      .score-box-class-5 {
        fill: #fff;
        font-family: Bebas, Bebas;
        font-size: 150px;
      }
    </style>