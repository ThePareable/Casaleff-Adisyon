<template>
    <div class="page-wrapper">
        <div class="login-container">
            <form @submit.prevent="handleLogin" class="login-form" novalidate>
                <img src="../assets/logo.png" alt="Logo" class="login-logo" />
                <h2>PIN ile Giriş</h2>

                <!-- Görsel olmayan etiket (erişilebilirlik) -->
                <input id="pin-input" class="pin-input" type="password" v-model="pin" maxlength="4" inputmode="numeric"
                    pattern="[0-9]{4}" placeholder="4 haneli PIN" autocomplete="one-time-code" required
                    aria-describedby="pin-help" />
                <small id="pin-help" class="text-muted">4 haneli PIN giriniz.</small>

                <button type="submit" class="login-btn">Giriş Yap</button>
                <p v-if="error" class="error-msg" role="alert">{{ error }}</p>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LoginPage',
    data() {
        return { pin: '', error: '' };
    },
    methods: {
        handleLogin() {
            if (this.pin === '1234') {
                this.error = '';
                alert('Giriş başarılı!');
            } else {
                this.error = 'PIN yanlış, tekrar deneyin.';
            }
        }
    }
}
</script>

<style scoped>
/* Taşmaları öngörülebilir kıl */
*,
*::before,
*::after {
    box-sizing: border-box;
}

/* ===== Layout (scroll fix) ===== */
.page-wrapper {
    /* Dinamik viewport: adres çubuğu iniş-kalkışlarında doğru değer */
    min-height: 100dvh;
    display: grid;
    place-items: center;
    background: var(--background);
    /* Kenarlarda güvenli alan kadar min boşluk */
    padding-inline: max(16px, env(safe-area-inset-left), 4vw);
    padding-inline-end: max(16px, env(safe-area-inset-right), 4vw);
    /* Dikeyde fazladan padding yok -> scroll yaratmaz */
    padding-block: max(8px, env(safe-area-inset-top)) max(8px, env(safe-area-inset-bottom));
}

.login-container {
    width: 100%;
    display: grid;
}

.login-form {
    width: 100%;
    max-width: 520px;
    margin-inline: auto;
    /* çok uzun başlık vs olursa yine de taşmasın */
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

/* ===== Görsel hiyerarşi ===== */
.login-logo {
    display: block;
    margin: 0 auto clamp(14px, 3vw, 24px) auto;
    max-width: clamp(96px, 40%, 160px);
    height: auto;
}

.login-form h2 {
    margin: 0 0 clamp(8px, 1.8vw, 12px) 0;
    font-weight: 700;
    letter-spacing: .02em;
    color: var(--text-main);
    font-size: clamp(1.15rem, 2.6vw, 1.6rem);
    text-align: center;
}

/* ===== Form elemanları ===== */
.pin-input {
    width: 100%;
    height: clamp(46px, 6.5vh, 56px);
    padding: 0 .75rem;
    font-size: clamp(1rem, 2.8vw, 1.25rem);
    border: 1px solid var(--border);
    border-radius: 10px;
    outline: none;
    text-align: center;
    letter-spacing: clamp(0.18em, .6vw, .35em);
    background: #fff;
    color: var(--text-main);
    transition: border-color .15s, box-shadow .15s;
}

.pin-input:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(50, 85, 48, .15);
}

.text-muted {
    color: var(--text-muted);
    text-align: center;
    font-size: clamp(.82rem, 2.2vw, .95rem);
    margin-top: -2px;
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

.error-msg {
    color: var(--error);
    font-size: clamp(.9rem, 2.2vw, 1rem);
    text-align: center;
    line-height: 1.3;
}

/* Ekran okuyucuya görünür, görselde gizli */
.visually-hidden {
    position: absolute !important;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}

/* Tablet/desktop ufak rötuşlar */
@media (min-width:768px) {
    .login-form {
        border-radius: 16px;
        gap: 16px;
    }
}
</style>
