<!-- AddOrderPage.vue -->
<template>
    <div class="page-wrapper">
        <div class="order-container">
            <!-- Geri -->
            <button class="back-btn" @click="$router.go(-1)" aria-label="Geri Dön">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.5 7L9.5 14L15.5 21" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </button>

            <!-- Logo -->
            <img src="../assets/logo.png" alt="Logo" class="logo" />

            <!-- Başlık -->
            <h2 class="title">Sipariş Ekle</h2>

            <!-- Mevcut siparişler -->
            <div class="orders-section">
                <h3 class="subtitle">Mevcut Siparişler</h3>
                <ul class="order-list">
                    <li v-for="(order, i) in groupedOrders" :key="i">
                        <button class="remove-btn" @click="removeProduct(order.name)"
                            aria-label="Bu ürünü eksilt">-</button>
                        <span class="order-name">
                            {{ order.count > 1 ? order.count + 'x ' : '' }}{{ order.name }}
                        </span>
                        <span class="order-price">{{ order.price }}₺</span>
                    </li>
                </ul>
                <div v-if="!groupedOrders.length" class="no-orders">Sipariş yok</div>
            </div>

            <!-- Menü -->
            <h3 class="subtitle">MENÜ</h3>
            <div v-if="mainMenu && mainMenu.subMenus && mainMenu.subMenus.length" class="menu-section">
                <div v-for="cat in mainMenu.subMenus" :key="cat.id" class="menu-category-block">
                    <div class="menu-cat-head">
                        <h4 class="menu-cat-title">{{ cat.name }}</h4>
                    </div>
                    <ul class="menu-list">
                        <li v-for="(item, i) in cat.items" :key="item.name + i">
                            <button class="add-btn" @click="addProduct(item.name, item.price)" aria-label="Ürünü ekle"
                                title="Ekle">
                                +
                            </button>

                            <div class="menu-item-info">
                                <span class="menu-item-name">{{ item.name }}</span>
                                <span class="menu-item-desc" v-if="item.description">({{ item.description }})</span>
                            </div>

                            <span class="menu-item-price">{{ item.price }}₺</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div v-else>Menüde ürün yok.</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AddOrderPage',
    props: {
        tableId: { type: [Number, String], required: true },
    },
    data() {
        return {
            ordersByTable: {},
            mainMenu: null,
        };
    },
    computed: {
        currentOrders() {
            const tid = Number(this.tableId);
            return this.ordersByTable[tid] || [];
        },
        groupedOrders() {
            const map = {};
            for (const item of this.currentOrders) {
                if (!map[item.name]) {
                    map[item.name] = { name: item.name, price: item.price, count: 1 };
                } else {
                    map[item.name].count++;
                }
            }
            return Object.values(map);
        },
    },
    methods: {
        async fetchMenu() {
            try {
                const sessionId = localStorage.getItem('sessionId') || '';
                const response = await fetch('http://localhost:8080/menu/getMainMenu', {
                    method: 'GET',
                    headers: { 'X-Session-Id': sessionId },
                });
                if (!response.ok) throw new Error('Menü alınamadı');
                const data = await response.json();
                this.mainMenu = data;
            } catch (err) {
                this.mainMenu = null;
            }
        },
        addProduct(name, price) {
            const tid = Number(this.tableId);
            if (Number.isNaN(tid)) return;

            const nextList = this.ordersByTable[tid] ? [...this.ordersByTable[tid]] : [];
            nextList.push({ name, price });

            this.ordersByTable = { ...this.ordersByTable, [tid]: nextList };
            this.saveOrders();
        },
        removeProduct(name) {
            const tid = Number(this.tableId);
            const list = this.ordersByTable[tid] || [];
            if (!list.length) return;

            const idx = list.findIndex(i => i.name === name);
            if (idx === -1) return;

            const nextList = [...list];
            nextList.splice(idx, 1);

            this.ordersByTable = { ...this.ordersByTable, [tid]: nextList };
            this.saveOrders();
        },
        saveOrders() {
            localStorage.setItem('ordersByTable', JSON.stringify(this.ordersByTable));
        },
        loadOrders() {
            const saved = localStorage.getItem('ordersByTable');
            if (saved) {
                this.ordersByTable = JSON.parse(saved);
            }
        },
    },
    mounted() {
        this.loadOrders();
        this.fetchMenu();
    },
};
</script>

<style scoped>
/* --- GENEL --- */
*,
*::before,
*::after {
    box-sizing: border-box;
}

/* WelcomePage ile aynı dış iskelet */
.page-wrapper {
    min-height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--background);
}

/* === CONTAINER: WelcomePage .page-container ile birebir === */
.order-container {
    position: relative;
    width: 100%;
    max-width: 640px;
    /* genişlik aynı */
    margin-inline: auto;
    max-height: calc(100dvh - 32px);
    /* yükseklik aynı */
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

/* --- Logo & başlık --- */
.logo {
    display: block;
    width: 100px;
    margin-bottom: 16px;
    display: block;
    margin-left: auto;
    margin-right: auto;
}

.title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0;
    color: var(--primary);
    text-align: center;
}

.subtitle {
    font-size: 1.08rem;
    font-weight: 600;
    color: var(--primary);
    margin: 8px 0;
}

/* --- Sipariş listesi --- */
.order-list {
    list-style: none;
    padding: 0;
    margin: 0 0 8px 0;
}

.order-list li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 6px 0;
    border-bottom: 1px solid #ececec;
}

.order-name {
    font-weight: 500;
    color: var(--primary);
}

.order-price {
    font-weight: 600;
    color: var(--accent);
}

.no-orders {
    font-size: 1rem;
    color: #aaa;
    padding: 8px 0;
}

/* --- Ekle/Çıkar butonları --- */
.add-btn,
.remove-btn {
    margin-right: 8px;
    border: none;
    border-radius: 8px;
    width: 28px;
    height: 28px;
    font-size: 1.2rem;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: background .2s;
}

.add-btn {
    background: var(--primary);
    color: #fff;
}

.add-btn:hover {
    background: var(--primary-dark);
}

.remove-btn {
    background: #d32f2f;
    color: #fff;
}

.remove-btn:hover {
    background: #a31515;
}

/* --- Menü --- */
.menu-section {
    width: 100%;
    margin-bottom: 4px;
}

.menu-cat-head {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 2px 0 0;
}

.menu-cat-title {
    margin: 0;
    font-size: 1.06rem;
    color: var(--primary);
}

.menu-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.menu-list li {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 0;
    border-bottom: 1px solid #ececec;
}

.menu-item-info {
    display: flex;
    align-items: center;
    gap: 14px;
    min-width: 0;
}

.menu-item-name {
    font-weight: 600;
    color: var(--primary);
}

.menu-item-desc {
    color: #555;
    font-size: .98em;
    white-space: pre-line;
}

.menu-item-price {
    margin-left: auto;
    font-weight: 500;
}

/* --- Geri butonu --- */
.back-btn {
    position: absolute;
    left: 18px;
    top: 18px;
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
