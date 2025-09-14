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
                <img src="../assets/logo.png" alt="Logo" class="logo" />

                <!-- Başlık -->
                <h2 class="title">Yeni Masa Aç</h2>

                <!-- Boş masalar -->
                <div class="list">
                    <div v-for="table in emptyTables" :key="table.id" class="item"
                        @click="$router.push({ name: 'add-order', params: { tableId: table.id } })"
                        style="cursor:pointer;">
                        <div class="item-info">
                            <span class="item-name">Masa {{ table.id }}</span>
                            <span class="item-status">Boş</span>
                        </div>
                    </div>
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
            tables: [
                { id: 1, hasOrder: true },
                { id: 2, hasOrder: true },
                { id: 3, hasOrder: false },
                { id: 4, hasOrder: true },
            ],
        };
    },
    computed: {
        emptyTables() {
            return this.tables.filter(t => !t.hasOrder);
        },
    },
};
</script>

<style scoped>
.order-container {
    position: relative;
    width: 100%;
    max-width: 640px;
    margin: 40px auto;
    background: var(--container-bg, var(--surface));
    border: 1px solid var(--border);
    border-radius: 24px;
    box-shadow: 0 2px 16px rgba(0, 0, 0, .08);
    padding: 48px 32px 32px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-height: min(640px, calc(100dvh - 96px));
    overflow: auto;
}

.order-container {
    position: relative;
    width: 100%;
    max-width: 640px;
    margin: 40px auto;
    background: var(--container-bg, var(--surface));
    border: 1px solid var(--border);
    border-radius: 24px;
    box-shadow: 0 2px 16px rgba(0, 0, 0, .08);
    padding: 48px 32px 32px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-height: min(640px, calc(100dvh - 96px));
    overflow: auto;
}

/* TablesPage ile aynı container genişliği ve padding */
.login-container {
    width: 100%;
    max-width: 640px;
    padding-inline: 8px;
    margin: auto;
}

/* === SAYFA: ortalama ve güvenli boşluk === */
*,
*::before,
*::after {
    box-sizing: border-box;
}

.page-wrapper {
    min-height: 100dvh;
    display: grid;
    place-items: center;
    /* yatay + dikey ortalama */
    background: var(--background);
    padding: 24px;
}

.page-container {
    position: relative;
    background: var(--container-bg, var(--surface));
    border: 1px solid var(--border);
    border-radius: 24px;
    box-shadow: 0 2px 16px rgba(0, 0, 0, .08);
    padding: 32px 24px 24px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 520px;
    max-height: min(640px, calc(100dvh - 96px));
    margin: auto;
    overflow: auto;
}

/* === LOGO & BAŞLIK === */
.logo {
    width: 80px;
    height: auto;
    margin-bottom: 16px;
    display: block;
}

.title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 24px;
    color: var(--primary);
    text-align: center;
}

/* === LİSTE === */
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

/* === GERİ BUTONU (OrderPage ile aynı, ufak boyutlu) === */

/* === MOBİL === */
@media (max-width: 480px) {
    .page-container {
        max-width: 420px;
        padding: 24px 12px 16px 12px;
    }
}
</style>
