<template>
    <div class="page-wrapper">
        <div class="login-container">
            <div class="page-container">
                <!-- Geri -->
                <button class="back-btn" @click="$router.push('/order')" aria-label="Geri Dön">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.5 7L9.5 14L15.5 21" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </button>

                <!-- Logo -->
                <img src="../assets/logo.png" alt="Logo" class="login-logo" />

                <!-- Liste -->
                <div v-if="loading" style="text-align:center; margin: 32px 0; color: #888;">Yükleniyor...</div>
                <div v-else-if="error" style="text-align:center; margin: 32px 0; color: #d32f2f;">{{ error }}</div>
                <div v-else class="tables-list">
                    <div v-if="!openTables.length" style="text-align:center; color:#888; padding:32px 0;">Açık masa yok.
                    </div>
                    <div v-for="table in openTables" :key="table.id" class="table-card"
                        @click="$router.push({ name: 'add-order', params: { tableId: table.id } })"
                        style="cursor:pointer;">
                        <div class="table-info">
                            <span class="table-name">Masa {{ table.id }}</span>
                            <span class="order-status">Sipariş Açık</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TablesPage',
    props: {
        tables: {
            type: Array,
<<<<<<< HEAD
            required: true
        }
=======
            required: false,
            default: null
        }
    },
    data() {
        return {
            localTables: [],
            loading: false,
            error: ''
        };
>>>>>>> bugramuhci
    },
    computed: {
        openTables() {
            const source = this.tables && this.tables.length ? this.tables : this.localTables;
            // Sadece orders dizisi dolu olan masalar
            return source.filter(t => Array.isArray(t.orders) && t.orders.length > 0);
        },
    },
    async mounted() {
        if (!this.tables || !this.tables.length) {
            this.loading = true;
            try {
                const sessionId = localStorage.getItem('sessionId') || '';
                const response = await fetch('http://localhost:8080/table/getFull', {
                    method: 'GET',
                    headers: { 'X-Session-Id': sessionId }
                });
                if (!response.ok) throw new Error('Masa listesi alınamadı');
                const data = await response.json();
                // Sadece boş olmayan masaları al
                this.localTables = Array.isArray(data)
                    ? data.filter(t => Array.isArray(t.orders) && t.orders.length > 0)
                    : [];
            } catch (err) {
                this.error = err.message || 'Sunucu hatası';
            } finally {
                this.loading = false;
            }
        }
    }
};
</script>

<style scoped>
/* ==== OrderPage ile birebir aynı dış iskelet ==== */
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
    padding-inline: max(16px, env(safe-area-inset-left), 4vw);
    padding-inline-end: max(16px, env(safe-area-inset-right), 4vw);
    padding-block: max(8px, env(safe-area-inset-top)) max(8px, env(safe-area-inset-bottom));
}

.login-container {
    width: 100%;
    display: grid;
}

/* ==== Container: OrderPage ile aynı genişlik (640px) ==== */
.page-container {
    position: relative;
    width: 100%;
    max-width: 640px;
    /* <<< aynı genişlik */
    margin-inline: auto;
    max-height: min(650px, calc(100dvh - 32px));
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

/* Logo ve başlık */
.login-logo {
    display: block;
    margin: 0 auto clamp(14px, 3vw, 24px) auto;
    max-width: clamp(96px, 40%, 160px);
    height: auto;
}

/* Liste */
.tables-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.table-card {
    background: var(--card-bg, #fff);
    border-radius: 16px;
    box-shadow: 0 1px 8px rgba(0, 0, 0, .05);
    padding: 18px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.table-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.table-name {
    font-size: 1.1rem;
    font-weight: 500;
    color: var(--primary);
}

.order-status {
    font-size: .95rem;
    color: var(--accent, #5d6b63);
}

/* Geri butonu (Order ile aynı) */
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
</style>
