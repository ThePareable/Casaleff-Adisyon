<template>
    <div class="page-wrapper">
        <div class="order-container">
            <button class="back-btn" @click="$router.go(-1)">Geri</button>
            <h2 class="title">Masa {{ tableId }} Ödeme</h2>
            <div class="orders-section">
                <h3 class="subtitle">Siparişler</h3>
                <ul v-if="groupedOrders.length" class="order-list">
                    <li v-for="(order, i) in groupedOrders" :key="i" :class="{ selected: selectedIndexes.includes(i) }">
                        <input type="checkbox" :checked="selectedIndexes.includes(i)" @change="toggleSelect(i)" />
                        <span>{{ order.count > 1 ? order.count + 'x ' : '' }}{{ order.name }}</span>
                        <span>{{ order.price }}₺</span>
                    </li>
                </ul>
                <div v-else class="no-orders">Sipariş yok</div>
                <div class="total-section">
                    <span>Seçilen Toplam:</span>
                    <span class="total-price">{{ selectedTotal }}₺</span>
                </div>
                <div class="split-section">
                    <label>Kişi sayısı ile böl:</label>
                    <input type="number" min="1" v-model.number="splitCount" style="width:60px; margin-left:8px;" />
                    <span v-if="splitCount > 1">Kişi başı: <b>{{ Math.ceil(selectedTotal / splitCount) }}₺</b></span>
                </div>
                <div style="margin: 12px 0; display: flex; gap: 8px;">
                    <button class="pay-btn" :disabled="!selectedIndexes.length" @click="paySelected">Seçiliyi
                        Öde</button>
                    <button class="pay-btn" :disabled="!groupedOrders.length" @click="selectAll">Hepsini Seç</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PaymentDetailPage',
    props: {
        tableId: {
            type: [Number, String],
            required: true,
        },
    },
    data() {
        return {
            ordersByTable: {},
            selectedIndexes: [],
            splitCount: 1,
        };
    },
    computed: {
        currentOrders() {
            let tid = typeof this.tableId === 'string' ? Number(this.tableId) : this.tableId;
            return this.ordersByTable[tid] || [];
        },
        groupedOrders() {
            // Siparişleri gruplu gösteriyoruz
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
        selectedTotal() {
            // Seçili ürünlerin toplamı
            return this.selectedIndexes.reduce((sum, idx) => {
                const order = this.groupedOrders[idx];
                return sum + (order ? order.price * order.count : 0);
            }, 0);
        },
    },
    methods: {
        toggleSelect(idx) {
            if (this.selectedIndexes.includes(idx)) {
                this.selectedIndexes = this.selectedIndexes.filter(i => i !== idx);
            } else {
                this.selectedIndexes.push(idx);
            }
        },
        selectAll() {
            this.selectedIndexes = this.groupedOrders.map((_, i) => i);
        },
        paySelected() {
            let tid = typeof this.tableId === 'string' ? Number(this.tableId) : this.tableId;
            // Seçili ürünleri sil
            const grouped = this.groupedOrders;
            const toRemove = this.selectedIndexes.map(i => grouped[i].name);
            this.ordersByTable[tid] = this.currentOrders.filter(item => !toRemove.includes(item.name));
            this.saveOrders();
            this.selectedIndexes = [];
            this.$router.go(-1);
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

.order-list {
    list-style: none;
    padding: 0;
    margin: 0 0 8px 0;
    width: 100%;
}

.order-list li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1rem;
    padding: 8px 0;
    border-bottom: 1px solid #ececec;
    color: var(--primary);
}

.order-list li span {
    font-weight: 500;
    color: var(--accent);
}

.no-orders {
    font-size: 1rem;
    color: #aaa;
    padding: 8px 0 8px 0;
}

.total-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.15rem;
    font-weight: 600;
    margin: 18px 0 12px 0;
    color: var(--primary);
}

.total-price {
    color: var(--accent);
}

.pay-btn {
    width: 100%;
    padding: 14px;
    border-radius: 10px;
    background: var(--primary);
    color: #fff;
    font-size: 1.1rem;
    border: none;
    cursor: pointer;
    transition: background .2s;
}

.pay-btn:disabled {
    background: #ccc;
    color: #888;
    cursor: not-allowed;
}

.pay-btn:hover:not(:disabled) {
    background: var(--primary-dark);
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
