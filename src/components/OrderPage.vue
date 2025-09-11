<template>
    <div class="page-wrapper">
        <div class="login-container">
            <div class="login-form">
                <button class="back-btn" @click="$router.push('/welcome')" aria-label="Geri Dön">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.5 7L9.5 14L15.5 21" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <img src="../assets/logo.png" alt="Logo" class="login-logo" />

                <div class="order-actions">
                    <button class="login-btn" @click="$emit('order-action', 'acik-masalar')">
                        Açık Masalar
                    </button>
                    <button class="login-btn" @click="$emit('order-action', 'yeni-masa')">
                        Yeni Masa Aç
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'OrderPage',
}
</script>

<style scoped>
/* === LoginPage ile birebir aynı ortak kapsayıcılar === */
*,
*::before,
*::after {
    box-sizing: border-box;
}

.page-wrapper {
    min-height: 100dvh;
    /* LoginPage ile aynı */
    display: grid;
    place-items: center;
    background: var(--background);
    padding-inline: max(16px, env(safe-area-inset-left), 4vw);
    padding-inline-end: max(16px, env(safe-area-inset-right), 4vw);
    padding-block: max(8px, env(safe-area-inset-top)) max(8px, env(safe-area-inset-bottom));
}

.login-container {
    min-height: 50vh;
    /* LoginPage’de var, birebir kopya */
    width: 100%;
    display: grid;
}

.login-form {
    position: relative;
    width: 100%;
    max-width: 520px;
    /* Genişlik sınırı aynı */
    margin-inline: auto;
    max-height: calc(100dvh - 32px);
    /* Yükseklik davranışı aynı */
    overflow: auto;

    background: var(--surface);
    padding: clamp(16px, 4.8vw, 28px);
    border-radius: 14px;
    box-shadow: var(--shadow);
    border: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    gap: clamp(12px, 2.6vw, 16px);
}

/* Logo: LoginPage ile aynı */
.login-logo {
    display: block;
    margin: 0 auto clamp(14px, 3vw, 24px) auto;
    max-width: clamp(96px, 40%, 160px);
    height: auto;
}

/* Buton grubu üst üste, tam genişlik (LoginPage'in .login-btn ölçüleriyle) */
.order-actions {
    display: flex;
    flex-direction: column;
    gap: clamp(12px, 2.6vw, 16px);
    width: 100%;
}

.login-btn {
    width: 100%;
    height: clamp(46px, 6.5vh, 56px);
    border-radius: 12px;
    font-size: clamp(.95rem, 2.4vw, 1.05rem);
    background: var(--primary);
    color: var(--primary-contrast);
    border: 1px solid var(--primary);
    transition: background .2s, border-color .25s, box-shadow .2s;
}

.login-btn:hover {
    background: var(--primary-dark);
    border-color: var(--primary-dark);
}

/* Geri butonu stili */
.back-btn {
    position: absolute;
    top: 18px;
    left: 18px;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    color: var(--primary);
    z-index: 2;
    transition: color 0.2s;
}

.back-btn:hover {
    color: var(--primary-dark);
}

/* Tablet/desktop rötuş: LoginPage ile aynı */
@media (min-width:768px) {
    .login-form {
        border-radius: 16px;
        gap: 16px;
    }
}
</style>
