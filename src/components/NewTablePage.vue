<!-- NewTablePage.vue -->
<!-- NewTablePage.vue -->
<template>
    <div class="page-wrapper">
        <div class="login-container">
            <div class="page-container" :class="{ 'page-container--scroll': shouldScroll }" <!-- Geri -->
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
                        <div class="item-actions">
                            <button class="delete-btn" @click="deleteTable(table.id)" aria-label="Masa sil">Sil</button>
                        </div>
                    </div>
                    <div v-if="!emptyTables.length" class="state muted">Şu an boş masa yok.</div>
                    <div v-if="!emptyTables.length" class="state muted">Şu an boş masa yok.</div>
                </div>
            </div> <!-- .page-container -->

            <!-- Masa Ekle container hemen altı -->
            <div class="add-table-row">
                <button class="add-table-btn" @click="addNewTable">Masa Ekle</button>
            </div>
        </div> <!-- .login-container -->
    </div> <!-- .page-wrapper -->
</template>

<script>
export default {
    name: 'NewTablePage',
    data() {
        return {
            loading: false,
            error: '',
            emptyTables: [],
            loading: false,
            error: '',
            emptyTables: [],
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
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    gap: 16px;
    overflow-y: auto;
    min-height: 0;
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

.item-actions {
    width: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.delete-btn {
    background: transparent;
    border: 1px solid rgba(200, 40, 40, 0.12);
    color: #c62828;
    padding: 6px 10px;
    border-radius: 8px;
    cursor: pointer;
}

.add-table-row {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 12px;
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