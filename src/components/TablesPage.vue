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

                <!-- Başlık -->
                <h2 class="page-title">Açık Masalar</h2>

                <!-- Liste -->
                <div class="tables-list">
                    <div v-for="table in openTables" :key="table.id" class="table-card">
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
    data() {
        return {
            tables: [
                { id: 1, hasOrder: true },
                { id: 2, hasOrder: true },
                { id: 3, hasOrder: false },
                { id: 4, hasOrder: true },
            ],
        };
    },
    computed: {
        openTables() {
            return this.tables.filter(t => t.hasOrder);
        },
    },
};
</script>

<style scoped>
/* === Ortada küçük kart iskeleti (Order/NewTable ile uyumlu) === */
*,
*::before,
*::after {
    box-sizing: border-box;
}

.page-wrapper {
    min-height: 100dvh;
    display: grid;
    place-items: center;
    /* yatay + dikey merkez */
    background: var(--background);
    padding: 24px;
    /* kenarlarda sabit nefes */
}

.login-container {
    width: 100%;
    max-width: 520px;
    /* kart üst sınırı */
    padding-inline: 8px;
    /* çok dar ekranda kenarlar çarpmasın */
}

.page-container {
    position: relative;
    /* back-btn için */
    background: var(--container-bg, var(--surface));
    border: 1px solid var(--border);
    border-radius: 24px;
    box-shadow: 0 2px 16px rgba(0, 0, 0, .08);
    padding: 32px 24px 24px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;

    /* sayfa değil kart scroll yapsın */
    max-height: min(640px, calc(100dvh - 96px));
    overflow: auto;
}

/* === LOGO === */
.login-logo {
    width: 80px;
    height: auto;
    margin-bottom: 16px;
    display: block;
}

/* === BAŞLIK === */
.page-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 24px;
    color: var(--primary);
    text-align: center;
}

/* === LİSTE === */
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

/* === GERİ BUTONU (Order/NewTable ile aynı ufak ikon) === */
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
</style>
