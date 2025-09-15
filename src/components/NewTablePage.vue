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
/* ==== iskelet ==== */
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
    padding: 24px;
}

.login-container {
    width: 100%;
    display: grid;
    place-items: center;
    padding-inline: 8px;
}

/* === TAM OLARAK Order/Tables ile aynı genişlik === */
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

/* === logo & başlık === */
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

/* === liste === */
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

/* === geri butonu (ufak) === */
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

/* mobil küçük dokunuş */
@media (max-width:480px) {
    .page-container {
        padding: 24px 12px 16px;
    }
}
</style>
