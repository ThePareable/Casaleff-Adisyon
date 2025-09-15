<!-- App.vue -->
<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()

// Geçiş adı (hep sağdan sola kaydırma)
const transitionName = 'slide-forward'
</script>

<template>
  <!-- Bannerlar sabit (animasyondan bağımsız) -->
  <div class="banner-strip top-strip" aria-hidden="true"></div>

  <!-- İçerik sahnesi: tüm route içerikleri burada kaydırılır -->
  <!-- mode KULLANMIYORUZ -> enter ve leave aynı anda çalışır -->
  <transition :name="transitionName">
    <div class="content-stage" :key="route.fullPath">
      <router-view />
    </div>
  </transition>

  <div class="banner-strip bottom-strip" aria-hidden="true"></div>
</template>

<style scoped>
/* --- Global küçük ayarlar (scroll kapat) --- */
:global(html, body, #app) {
  height: 100%;
}

:global(body) {
  margin: 0;
  overflow: hidden;
  /* sayfa düzeyinde scroll yok */
  background: var(--background, #fff);
}

/* --- Bannerlar (sabit) --- */
.banner-strip {
  position: fixed;
  left: 0;
  width: 100vw;
  height: 40px;
  background-image: url('./assets/banner.png');
  background-repeat: repeat-x;
  background-size: auto 40px;
  background-position: 0 50%;
  z-index: 1000;
  pointer-events: none;
  /* tıklamayı engellemesin */
}

.top-strip {
  top: 0;
}

.bottom-strip {
  bottom: 0;
}

/* --- İçerik sahnesi: bannerların arasında kalan, ortalanmış alan --- */
.content-stage {
  position: fixed;
  left: 0;
  top: 40px;
  /* üst banner yüksekliği */
  width: 100vw;
  height: calc(100dvh - 80px);
  /* iki banner arası alan */
  display: grid;
  place-items: center;
  /* ortada tut */
  overflow: hidden;
  /* taşmalar görünmesin */
  will-change: transform;
  /* daha akıcı animasyon */
}

/* --- Kayan sayfa geçişi (fade yok, sadece transform) --- */
.slide-forward-enter-active,
.slide-forward-leave-active {
  transition: transform 0.45s cubic-bezier(.55, 0, .1, 1);
}

.slide-forward-enter-from {
  transform: translateX(100vw);
}

/* yeni içerik sağdan gelir */
.slide-forward-enter-to {
  transform: translateX(0);
}

.slide-forward-leave-from {
  transform: translateX(0);
}

/* eski içerik sola gider */
.slide-forward-leave-to {
  transform: translateX(-100vw);
}

/* İstersen geri yön için ikinci set (kullanmak için :name'i 'slide-back' yap) */
.slide-back-enter-active,
.slide-back-leave-active {
  transition: transform 0.45s cubic-bezier(.55, 0, .1, 1);
}

.slide-back-enter-from {
  transform: translateX(-100vw);
}

.slide-back-enter-to {
  transform: translateX(0);
}

.slide-back-leave-from {
  transform: translateX(0);
}

.slide-back-leave-to {
  transform: translateX(100vw);
}
</style>
