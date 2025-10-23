<template>
    <div class="page-wrapper">
        <div class="login-container">
            <form @submit.prevent="handleLogin" class="login-form" novalidate>
                <img src="../assets/logo.png" alt="Logo" class="login-logo" />

                <!-- Görsel olmayan etiket (erişilebilirlik) -->
                <label class="visually-hidden" for="pin-input">4 haneli PIN</label>

<<<<<<< HEAD
                <input id="pin-input" class="pin-input" type="password" v-model="pin" maxlength="10" inputmode="text"
                    pattern="[A-Za-z0-9]{1,10}" placeholder="Şifre" autocomplete="one-time-code" required
=======
                <input id="pin-input" class="pin-input" type="password" v-model="pin" maxlength="4"
                    inputmode="alphanumeric" pattern="[0-9]{4}" placeholder="PIN" autocomplete="one-time-code" required
>>>>>>> bugramuhci
                    aria-describedby="pin-help" />
                <button type="submit" class="login-btn">Giriş Yap</button>
                <div v-if="error" class="error-actions">
                    <p class="error-msg" role="alert">{{ error }}</p>
                    <button v-if="error === 'Sunucuya bağlanılamadı.'" type="button" class="login-btn retry-btn"
                        @click="handleLogin">Tekrar dene</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<script>
export default {
    name: 'LoginPage',
    data() {
        return { pin: '', error: '', loading: false };
    },
    methods: {
        async handleLogin() {
            this.error = '';
            this.loading = true;
            try {
                const response = await fetch('http://localhost:8080/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: this.pin
                });
                const result = await response.json();
                if (response.ok) {
<<<<<<< HEAD
                    localStorage.setItem('sessionId', result);
=======
                    // Remove quotes and trim
                    let sessionId = typeof result === 'string' ? result : String(result);
                    sessionId = sessionId.replace(/^"|"$/g, '').trim();
                    localStorage.setItem('sessionId', sessionId);
>>>>>>> bugramuhci
                    this.$router.push('/welcome');
                } else {
                    this.error = result.message || 'PIN yanlış, tekrar deneyin.';
                }
            } catch (err) {
                this.error = 'Sunucuya bağlanılamadı.';
            } finally {
                this.loading = false;
            }
        }
    }
}
</script>

<style scoped>
.error-actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    margin-top: 8px;
}

.retry-btn {
    width: auto;
    min-width: 120px;
    padding: 8px 18px;
    font-size: 1rem;
    margin: 0 auto;
}

/* Taşmaları öngörülebilir kıl */
*,
*::before,
*::after {
    box-sizing: border-box;
}

/* ===== Layout (scroll fix) ===== */
.page-wrapper {
    min-height: 90dvh;
    display: flex;
    align-items: center;
    justify-content: center;
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
