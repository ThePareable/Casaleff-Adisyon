<template>
    <div class="page-wrapper">
        <div class="order-container">
            <button class="back-btn" @click="$router.go(-1)">Geri</button>
            <h2 class="title">Ödeme Al</h2>
            <div class="orders-section">
                <h3 class="subtitle">Siparişli Masalar</h3>
                <ul class="table-list">
                    <li v-for="table in tablesWithOrders" :key="table.id">
                        <button class="table-btn" @click="goToPayment(table.id)">
                            Masa {{ table.id }}
                        </button>
                    </li>
                </ul>
                <div v-if="tablesWithOrders.length === 0" class="no-orders">Siparişli masa yok</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PaymentPage',
    data() {
        return {
            ordersByTable: {},
        };
    },
    computed: {
        tablesWithOrders() {
            // Sadece siparişi olan masalar
            return Object.keys(this.ordersByTable)
                .filter(key => this.ordersByTable[key] && this.ordersByTable[key].length > 0)
                .map(id => ({ id }));
        },
    },
    methods: {
        goToPayment(tableId) {
            this.$router.push({ name: 'PaymentDetail', params: { tableId } });
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
    },
};
</script>

<style scoped>
.page-wrapper {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--background);
}

.order-container {
    position: relative;
    width: 100%;
    max-width: 520px;
    margin: auto;
    background: var(--container-bg);
    border-radius: 24px;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
    padding: 32px 24px 24px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 18px;
    color: var(--primary);
    text-align: center;
}

.subtitle {
    font-size: 1.15rem;
    font-weight: 500;
    margin-bottom: 10px;
    color: var(--primary);
    text-align: left;
    width: 100%;
}

.table-list {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
}

.table-btn {
    width: 100%;
    padding: 12px;
    margin-bottom: 8px;
    border-radius: 10px;
    background: var(--primary);
    color: #fff;
    font-size: 1.1rem;
    border: none;
    cursor: pointer;
    transition: background .2s;
}

.table-btn:hover {
    background: var(--primary-dark);
}

.no-orders {
    font-size: 1rem;
    color: #aaa;
    padding: 8px 0 8px 0;
}

.back-btn {
    position: absolute;
    left: 24px;
    top: 24px;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--primary);
    z-index: 2;
}
</style>
