<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
// Animasyon yönü sabit: her zaman sağdan gelsin
const transitionName = 'slide-forward'
</script>

<template>
  <!--
  <transition name="slide-forward" mode="out-in">
    <router-view />
  </transition>
  -->
  <router-view />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.slide-forward-enter-active,
.slide-forward-leave-active {
  transition: transform 0.45s cubic-bezier(.55, 0, .1, 1), opacity 0.35s;
}

.slide-forward-enter-from {
  transform: translateX(100vw);
  opacity: 0.2;
}

.slide-forward-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.slide-forward-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.slide-forward-leave-to {
  transform: translateX(-100vw);
  opacity: 0.2;
}

.slide-back-enter-active,
.slide-back-leave-active {
  transition: transform 0.45s cubic-bezier(.55, 0, .1, 1), opacity 0.35s;
}

.slide-back-enter-from {
  transform: translateX(-100vw);
  opacity: 0.2;
}

.slide-back-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.slide-back-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.slide-back-leave-to {
  transform: translateX(100vw);
  opacity: 0.2;
}
</style>
