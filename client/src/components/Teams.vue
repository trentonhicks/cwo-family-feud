<script setup lang="ts">
import Team from '../types/Team';
import TeamScore from './TeamScore.vue';

defineProps<{ teams: Team[], activeTeamIndex: number }>();
const emit = defineEmits<{ selected: [teamIndex: number] }>();
</script>

<template>
    <div class="grid grid-cols-2">
      <TeamScore
        v-for="(team, teamIndex) in teams"
        :team="team"
        :active="activeTeamIndex === teamIndex"
        @click="emit('selected', teamIndex)"
      />
    </div>
</template>