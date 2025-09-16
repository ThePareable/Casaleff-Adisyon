<!-- NewTablePage.vue -->
<template>
    <div class="page-wrapper">
        <div class="login-container">
            <div class="page-container" :class="{ 'page-container--scroll': shouldScroll }">
                <!-- Geri -->
                <button class="back-btn" @click="$router.push('/order')" aria-label="Geri Dön">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.5 7L9.5 14L15.5 21" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </button>

                <!-- Logo -->
                <img src="../assets/logo.png" alt="Logo" class="logo" />

                <!-- Durumlar -->
                <div v-if="loading" class="state muted">Yükleniyor…</div>
                <div v-else-if="error" class="state error">
                    {{ error }}
                    <button class="retry-btn" @click="fetchEmptyTables">Tekrar dene</button>
                </div>

                <!-- Liste -->
                <div v-else class="list">
                    <div v-for="table in emptyTables" :key="table.id" class="item"
                        @click="$router.push({ name: 'add-order', params: { tableId: table.id } })"
                        style="cursor:pointer;">
                        <div class="item-info">
                            <span class="item-name">Masa {{ table.id }}</span>
                            <span class="item-status">Boş</span>
                        </div>
                    </div>
                    <div v-if="!emptyTables.length" class="state muted">Şu an boş masa yok.</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NewTablePage',
    data() {
        return {
            loading: false,
            error: '',
            emptyTables: [],
        };
    },
    computed: {
        shouldScroll() {
            return this.emptyTables.length > 10;
        },
    },
    methods: {
        // localStorage -> header için güvenli hale getir
        getCleanSessionId() {
            const raw = localStorage.getItem('sessionId') || '';
            return raw.replace(/(^"|"$)/g, '').trim();
        },

        async fetchEmptyTables() {
            this.loading = true;
            this.error = '';

            const sessionId = this.getCleanSessionId();
            if (!sessionId) {
                this.loading = false;
                // E001 yani oturum yoksa login’e dön
                this.$router.replace('/');
                return;
            }

            try {
                const resp = await fetch('http://localhost:8080/table/getEmpty', {
                    method: 'GET',
                    headers: {
                        'X-Session-Id': sessionId,     // backend’in beklediği header
                    },
                });

                // Hata gövdesi genelde {status, exception:{message: "..."}}
                if (!resp.ok) {
                    let msg = 'Boş masalar alınamadı.';
                    try {
                        const err = await resp.json();
                        msg = err?.exception?.message || err?.message || msg;
                    } catch (_) { }
                    // Oturum yok/bozuksa login’e gönder
                    if (msg.toLowerCase().includes('session') && msg.toLowerCase().includes('empty')) {
                        this.$router.replace('/');
                        return;
                    }
                    this.error = msg;
                    return;
                }

                const data = await resp.json();
                // [1,2,3] veya [{id:1},...] normalize
                this.emptyTables = Array.isArray(data)
                    ? (typeof data[0] === 'number'
                        ? data.map(id => ({ id }))
                        : (data[0] && typeof data[0] === 'object' && 'id' in data[0])
                            ? data.map(t => ({ id: t.id }))
                            : [])
                    : [];
            } catch (e) {
                this.error = 'Sunucuya bağlanılamadı.';
            } finally {
                this.loading = false;
            }
        },
    },
    mounted() {
        this.fetchEmptyTables();
    },
};
</script>

<style scoped>
*,
*::before,
*::after {
    box-sizing: border-box;
}

.page-wrapper {
    min-height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--background);
    padding: 24px;
}

.login-container {
    width: 100%;
    display: grid;
    place-items: center;
    padding-inline: 8px;
}

.page-container {
    position: relative;
    min-width: 330px;
    max-width: 640px;
    min-height: 250px;
    margin: 0 auto;
    background: var(--surface, #fff);
    border: 1px solid var(--border, #e6e6e6);
    border-radius: 24px;
    box-shadow: 0 2px 16px rgba(0, 0, 0, .08);
    padding: 32px 24px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
}

.page-container--scroll {
    max-height: min(650px, calc(100dvh - 32px));
    overflow: auto;
}

.logo {
    width: 80px;
    height: auto;
    margin-bottom: 16px;
    display: block;
}

.state {
    margin: 8px 0 12px;
    font-size: .98rem;
}

.state.muted {
    color: var(--text-muted, #6b6b6b);
}

.state.error {
    color: var(--error, #c62828);
}

.retry-btn {
    margin-left: 10px;
    border: 1px solid var(--primary);
    background: var(--primary);
    color: #fff;
    border-radius: 10px;
    padding: 6px 10px;
    cursor: pointer;
}

.retry-btn:hover {
    background: var(--primary-dark);
    border-color: var(--primary-dark);
}

.list {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.item {
    background: var(--card-bg, #fff);
    border-radius: 16px;
    box-shadow: 0 1px 8px rgba(0, 0, 0, .05);
    padding: 18px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.item-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.item-name {
    font-size: 1.1rem;
    font-weight: 500;
    color: var(--primary);
}

.item-status {
    font-size: .95rem;
    color: var(--accent, #5d6b63);
}

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
    transition: color .2s;
}

.back-btn:hover {
    color: var(--primary-dark);
}

@media (max-width:480px) {
    .page-container {
        padding: 24px 12px 16px;
    }
}
</style>
