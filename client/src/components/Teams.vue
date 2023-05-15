<script setup lang="ts">
import Team from '../types/Team';

defineProps<{ teams: Team[], activeTeamIndex: number }>();
const emit = defineEmits<{ selected: [teamIndex: number] }>();
</script>

<template>
    <div class="grid grid-cols-2 gap-3">
      <button
        v-for="(team, teamIndex) in teams"
        :key="`team-${teamIndex}`"
        :class="[
          'flex items-center justify-between text-white px-5 py-3 rounded-md',
          activeTeamIndex === teamIndex ? 'bg-blue-500' : 'bg-gray-600'
        ]"
        @click="() => emit('selected', teamIndex)"
      >
        <h2 class="text-xl font-bold">{{ team.name }}</h2>
        <p class="text-lg font-semibold">{{ team.score }}</p>
      </button>
    </div>
</template>