<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import Phaser from 'phaser';
import { MainScene } from '../game/MainScene';

const props = defineProps(['nomUsuari', 'colorAvatar', 'estat']);
const contenidor = ref(null);
let game = null;

onMounted(() => {
  game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 640,
    height: 400,
    backgroundColor: '#1e293b',
    parent: contenidor.value,
    scene: [MainScene]
  });

  // Sincronitza els valors actuals quan l'escena ja està llesta
  game.events.once('ready', () => {
    const escena = game?.scene.getScene('MainScene');
    escena?.actualitzarNom(props.nomUsuari);
    escena?.canviarColor(parseInt(props.colorAvatar.replace('#', ''), 16));
    escena?.actualitzarEstat(props.estat);
  });
});

onUnmounted(() => game?.destroy(true));

// Els watch() van al mateix nivell que onMounted, MAI dins
watch(() => props.nomUsuari, (nouNom) => {
  game?.scene.getScene('MainScene')?.actualitzarNom(nouNom);
});

// Ampliació 1: segon watch per al color
watch(() => props.colorAvatar, (hex) => {
  const color = parseInt(hex.replace('#', ''), 16);
  game?.scene.getScene('MainScene')?.canviarColor(color);
});

// Ampliació 2: watch per a l'estat
watch(() => props.estat, (nouEstat) => {
  game?.scene.getScene('MainScene')?.actualitzarEstat(nouEstat);
});

// Ampliació 3: pausa/represa del game loop, exposada al pare
function pausar() {
  game?.scene.getScene('MainScene')?.scene.pause();
}
function reprendre() {
  game?.scene.getScene('MainScene')?.scene.resume();
}
defineExpose({ pausar, reprendre });
</script>

<template><div ref="contenidor"></div></template>