<script setup>
import { ref } from 'vue';
import PhaserCanvas from './components/PhaserCanvas.vue';

const nom = ref('Anna');
const mostrarJoc = ref(true);
const color = ref('#10b981');      // Ampliació 1
const estat = ref('Disponible');   // Ampliació 2
const pausat = ref(false);         // Ampliació 3
const canvasRef = ref(null);

function alternarPausa() {
  if (pausat.value) {
    canvasRef.value?.reprendre();
  } else {
    canvasRef.value?.pausar();
  }
  pausat.value = !pausat.value;
}
</script>

<template>
  <main class="contenidor-app">
    <div class="controls">
      <input v-model="nom" placeholder="Escriu el teu nom d'usuari..." />

      <input type="color" v-model="color" />

      <select v-model="estat">
        <option>Disponible</option>
        <option>Ocupat</option>
        <option>Absent</option>
      </select>

      <button @click="mostrarJoc = !mostrarJoc; pausat = false">
        {{ mostrarJoc ? 'Amaga el llenç' : 'Mostra el llenç' }}
      </button>

      <button @click="alternarPausa" :disabled="!mostrarJoc">
        {{ pausat ? 'Reprèn' : 'Pausa' }}
      </button>
    </div>

    <PhaserCanvas
      v-if="mostrarJoc"
      ref="canvasRef"
      :nomUsuari="nom"
      :colorAvatar="color"
      :estat="estat"
    />
  </main>
</template>

<style>
.controls { display: flex; gap: 8px; margin-bottom: 12px; justify-content: center; }
</style>