<script setup>
import { ref } from 'vue'
import LoginPage from './components/LoginPage.vue'
import WelcomePage from './components/WelcomePage.vue'

const loggedIn = ref(false)

function handleLoginSuccess() {
  loggedIn.value = true
}
function handleWelcomeAction(action) {
  // Burada ödeme/sipariş için yönlendirme yapılabilir
  alert(action === 'odeme' ? 'Ödeme ekranı!' : 'Sipariş ekranı!')
}
</script>

<template>
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
</style>
