<template>
    <div class="page-wrapper">
        <div class="login-container">
            <div class="login-form welcome-form">
                <img src="../assets/logo.png" alt="Logo" class="login-logo" />

                <div class="welcome-actions">
                    <button class="login-btn" @click="$emit('action', 'siparis')">Sipariş Gir</button>
                    <button class="login-btn" @click="$emit('action', 'odeme')">Ödeme Al</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'WelcomePage',
}
</script>

<style scoped>
/* LoginPage ile birebir aynı layout kuralları */
*,
*::before,
*::after {
    box-sizing: border-box;
}

.page-wrapper {
    min-height: 100dvh;
    display: grid;
    place-items: center;
    background: var(--background);
    padding-inline: max(16px, env(safe-area-inset-left), 4vw);
    padding-inline-end: max(16px, env(safe-area-inset-right), 4vw);
    padding-block: max(8px, env(safe-area-inset-top)) max(8px, env(safe-area-inset-bottom));
}

.login-container {
    min-height: 50vh;
    width: 100%;
    display: grid;
}

/* Kart ölçüleri/padding/kenarlıklar: LoginPage .login-form ile aynı */
.login-form {
    width: 100%;
    max-width: 520px;
    margin-inline: auto;
    max-height: calc(100dvh - 32px);
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

/* Logo boyutu ve boşlukları birebir */
.login-logo {
    display: block;
    margin: 0 auto clamp(14px, 3vw, 24px) auto;
    max-width: clamp(96px, 40%, 160px);
    height: auto;
}

/* Başlık stili birebir */
.login-form h2 {
    margin: 0 0 clamp(8px, 1.8vw, 12px) 0;
    font-weight: 700;
    letter-spacing: .02em;
    color: var(--text-main);
    font-size: clamp(1.15rem, 2.6vw, 1.6rem);
    text-align: center;
}

/* Butonlar üst üste ve tam genişlik: LoginPage .login-btn ile aynı ölçüler */
.welcome-actions {
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

/* Tablet/desktop ufak rötuşlar: LoginPage ile aynı */
@media (min-width:768px) {
    .login-form {
        border-radius: 16px;
        gap: 16px;
    }
}
</style>
