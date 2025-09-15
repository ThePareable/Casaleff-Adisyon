<!-- App.vue -->
<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()

// Yön sabit: sağdan sola kaydır
const transitionName = 'slide-forward'
</script>

<template>
  <!-- BÜTÜN SAHNE (banner + içerik) TEK PARÇA HALİNDE ANİMASYONA GİRER -->
  <!-- mode kullanmıyoruz; enter/leave aynı anda akıyor -->
  <transition :name="transitionName">
    <div class="scene" :key="route.fullPath">
      <!-- Üst banner -->
      <div class="banner-strip banner-top" aria-hidden="true"></div>

      <!-- İçerik (bannerlar arasında, ortada) -->
      <div class="stage">
        <router-view />
      </div>

      <!-- Alt banner -->
      <div class="banner-strip banner-bottom" aria-hidden="true"></div>
    </div>
  </transition>
</template>

<style scoped>
/* ==== Global kaplama & scroll kapalı ==== */
:global(html, body, #app) {
  height: 100%;
}

:global(body) {
  margin: 0;
  overflow: hidden;
  /* sayfa düzeyinde scroll yok */
  background: var(--background, #fff);
}

/* ==== SAHNE: tüm içerik + bannerlar ==== */
.scene {
  position: fixed;
  /* viewport’a sabit */
  inset: 0;
  /* top/right/bottom/left: 0 */
  width: 100vw;
  height: 100dvh;
  overflow: hidden;
  /* taşmalar görünmesin */
  will-change: transform;
  /* akıcı animasyon */
}

/* ==== İçerik alanı (bannerların arasında) ==== */
.stage {
  position: absolute;
  left: 0;
  top: 40px;
  /* üst banner yüksekliği */
  width: 100%;
  height: calc(100dvh - 80px);
  /* iki banner arası alan */
  display: grid;
  place-items: center;
  /* sayfa kartlarını ortala */
  overflow: hidden;
  /* iç komponentlerin taşması görünmesin */
  padding: 0 16px;
  /* kenarda nefes */
}

/* ==== Banner şeritleri ==== */
.banner-strip {
  position: absolute;
  left: 0;
  width: 100%;
  height: 40px;
  background-image: url('./assets/banner.png');
  background-repeat: repeat-x;
  background-size: auto 40px;
  background-position: 0 50%;
  pointer-events: none;
  /* tıklamayı engellemesin */
  z-index: 2;
}

.banner-top {
  top: 0;
}

.banner-bottom {
  bottom: 0;
}

/* ==== Yana kaydırma geçişleri (FADE YOK) ==== */
.slide-forward-enter-active,
.slide-forward-leave-active {
  transition: transform 0.45s cubic-bezier(.55, 0, .1, 1);
}

.slide-forward-enter-from {
  transform: translateX(100vw);
}

/* yeni sahne sağdan gelir */
.slide-forward-enter-to {
  transform: translateX(0);
}

.slide-forward-leave-from {
  transform: translateX(0);
}

.slide-forward-leave-to {
  transform: translateX(-100vw);
}

/* eski sahne sola gider */

/* İstersen geri yön için ikinci set (transitionName='slide-back') */
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

/* Hareket azaltma */
@media (prefers-reduced-motion: reduce) {

  .slide-forward-enter-active,
  .slide-forward-leave-active,
  .slide-back-enter-active,
  .slide-back-leave-active {
    transition: none;
  }
}
</style>
