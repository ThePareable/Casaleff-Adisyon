<template>
    <div class="page-wrapper">
        <div class="order-container">
            <button class="back-btn" @click="$router.go(-1)" aria-label="Geri Dön">Geri</button>

            <h2 class="title">Masa {{ tableId }} Ödeme</h2>

            <div class="orders-section">
                <h3 class="subtitle">Siparişler</h3>

                <ul v-if="groupedOrders.length" class="order-list">
                    <li v-for="(order, i) in groupedOrders" :key="i" class="order-row"
                        :class="{ 'has-selection': (selectedQuantities[i] || 0) > 0 }">
                        <!-- Ürün adı + mevcut adet -->
                        <div class="cell cell--name">
                            <div class="name">{{ order.name }}</div>
                            <div class="meta">
                                <span class="badge">Stok: {{ order.count }} adet</span>
                            </div>
                        </div>

                        <!-- Birim fiyat -->
                        <div class="cell cell--price">
                            <span class="price">{{ order.price }}₺</span>
                        </div>

                        <!-- Adet seçici -->
                        <div class="cell cell--qty">
                            <div class="qty">
                                <button class="qty-btn" @click="decQty(i)" :disabled="(selectedQuantities[i] || 0) <= 0"
                                    aria-label="Adet azalt">−</button>
                                <input class="qty-input" type="number" :min="0" :max="order.count"
                                    :value="selectedQuantities[i] || 0"
                                    @input="onQtyInput(i, $event.target.value, order.count)"
                                    aria-label="Seçilen adet" />
                                <button class="qty-btn" @click="incQty(i, order.count)"
                                    :disabled="(selectedQuantities[i] || 0) >= order.count"
                                    aria-label="Adet artır">+</button>
                            </div>
                            <div class="row-total" v-if="(selectedQuantities[i] || 0) > 0">
                                = {{ (selectedQuantities[i] || 0) * order.price }}₺
                            </div>
                        </div>
                    </li>
                </ul>

                <div v-else class="no-orders">Sipariş yok</div>

                <div class="total-section">
                    <span>Seçilen Toplam:</span>
                    <span class="total-price">{{ selectedTotal }}₺</span>
                </div>

                <div class="split-section">
                    <label for="split">Kişi sayısı ile böl:</label>
                    <input id="split" type="number" min="1" v-model.number="splitCount" class="split-input" />
                    <span v-if="splitCount > 1" class="per-person">
                        Kişi başı: <b>{{ Math.ceil(selectedTotal / splitCount) }}₺</b>
                    </span>
                </div>

                <div class="actions">
                    <button class="pay-btn outline" :disabled="!groupedOrders.length" @click="selectAll">
                        Hepsini Seç
                    </button>
                    <button class="pay-btn" :disabled="selectedTotal === 0" @click="paySelected">
                        Seçiliyi Öde
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PaymentDetailPage',
    props: {
        tableId: { type: [Number, String], required: true },
    },
    data() {
        return {
            ordersByTable: {},
            // index -> seçilen adet (0..group.count)
            selectedQuantities: {},
            splitCount: 1,
        };
    },
    computed: {
        currentOrders() {
            const tid = Number(this.tableId);
            return this.ordersByTable[tid] || [];
        },
        // Aynı ürünü grupla (ad, fiyat, adet)
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
        // Seçilen toplam = Σ (seçilen adet * birim fiyat)
        selectedTotal() {
            return this.groupedOrders.reduce((sum, order, i) => {
                const qty = this.selectedQuantities[i] || 0;
                return sum + qty * order.price;
            }, 0);
        },
    },
    methods: {
        loadOrders() {
            const saved = localStorage.getItem('ordersByTable');
            if (saved) this.ordersByTable = JSON.parse(saved);
        },
        saveOrders() {
            localStorage.setItem('ordersByTable', JSON.stringify(this.ordersByTable));
        },

        // Adet seçici kontrolleri
        incQty(i, max) {
            const cur = this.selectedQuantities[i] || 0;
            const next = Math.min(cur + 1, max);
            this.selectedQuantities = { ...this.selectedQuantities, [i]: next };
        },
        decQty(i) {
            const cur = this.selectedQuantities[i] || 0;
            const next = Math.max(cur - 1, 0);
            this.selectedQuantities = { ...this.selectedQuantities, [i]: next };
        },
        onQtyInput(i, raw, max) {
            let val = parseInt(raw, 10);
            if (isNaN(val)) val = 0;
            val = Math.max(0, Math.min(val, max));
            this.selectedQuantities = { ...this.selectedQuantities, [i]: val };
        },

        // Hepsini seç: her grup için seçili adet = group.count
        selectAll() {
            const next = {};
            this.groupedOrders.forEach((g, i) => (next[i] = g.count));
            this.selectedQuantities = next;
        },

        // Seçili adedi düşerek ödeme yap
        paySelected() {
            const tid = Number(this.tableId);
            if (Number.isNaN(tid)) return;

            // İsim -> düşülecek adet
            const toPayMap = {};
            this.groupedOrders.forEach((g, i) => {
                const qty = this.selectedQuantities[i] || 0;
                if (qty > 0) toPayMap[g.name] = (toPayMap[g.name] || 0) + qty;
            });

            // Seçili yoksa çıkar
            const totalQty = Object.values(toPayMap).reduce((a, b) => a + b, 0);
            if (totalQty === 0) return;

            // Mevcut siparişlerden, her isim için belirtilen adet kadarını kaldır
            const list = [...this.currentOrders]; // mevcut liste kopyası
            const result = [];
            const consumed = {}; // ad -> kaç tane düşüldü

            for (const item of list) {
                const want = toPayMap[item.name] || 0;
                const used = consumed[item.name] || 0;
                if (want > 0 && used < want) {
                    consumed[item.name] = used + 1; // bu öğeyi düş
                    continue;
                }
                result.push(item); // listede kalmaya devam
            }

            // Immutable atama -> reaktivite
            this.ordersByTable = { ...this.ordersByTable, [tid]: result };
            this.saveOrders();

            // Seçimleri sıfırla
            this.selectedQuantities = {};
            // İstersen otomatik geri dön: yorum satırını kaldır
            // this.$router.go(-1);
        },
    },
    mounted() {
        this.loadOrders();
    },
};
</script>

<style scoped>
/* Sayfa ve kart iskeleti */
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
    max-width: 640px;
    margin: auto;
    background: var(--container-bg, var(--surface));
    border: 1px solid var(--border);
    border-radius: 24px;
    box-shadow: 0 2px 16px rgba(0, 0, 0, .08);
    padding: 28px 20px 20px 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;

    /* içerik uzarsa kart içinde kaydır */
    max-height: min(680px, calc(100dvh - 96px));
    overflow: auto;
}

/* Geri butonu */
.back-btn {
    position: absolute;
    left: 18px;
    top: 18px;
    background: none;
    border: none;
    padding: 6px 8px;
    color: var(--primary);
    font-size: .95rem;
    font-weight: 600;
    border-radius: 8px;
    transition: background .15s, color .15s;
}

.back-btn:hover {
    background: rgba(0, 0, 0, .04);
    color: var(--primary-dark);
}

/* Başlıklar */
.title {
    font-size: 1.35rem;
    font-weight: 700;
    color: var(--primary);
    text-align: center;
    margin-top: 10px;
    margin-bottom: 6px;
}

.subtitle {
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--primary);
    margin: 8px 0 6px 0;
}

/* Liste */
.order-list {
    width: 100%;
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.order-row {
    display: grid;
    grid-template-columns: 1fr auto auto;
    /* ad | fiyat | adet seçici */
    gap: 12px;
    align-items: center;
    background: var(--card-bg, #fff);
    border: 1px solid #ececec;
    border-radius: 12px;
    padding: 10px 12px;
    transition: box-shadow .15s, border-color .15s, background .15s;
}

.order-row.has-selection {
    border-color: rgba(50, 85, 48, .3);
    box-shadow: 0 0 0 3px rgba(50, 85, 48, .08) inset;
    background: #fff;
}

.cell {
    display: flex;
    flex-direction: column;
}

.cell--name {
    min-width: 0;
}

.name {
    font-weight: 600;
    color: var(--text-main);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.meta {
    margin-top: 2px;
}

.badge {
    display: inline-block;
    font-size: .78rem;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 999px;
    color: var(--primary);
    background: rgba(50, 85, 48, .08);
}

.cell--price {
    align-items: flex-end;
}

.price {
    font-weight: 700;
    color: var(--accent, #5d6b63);
    white-space: nowrap;
}

.cell--qty {
    align-items: flex-end;
}

.qty {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 4px 6px;
}

.qty-btn {
    width: 28px;
    height: 28px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: var(--primary);
    color: #fff;
    border-radius: 8px;
    cursor: pointer;
    transition: background .15s, opacity .15s;
}

.qty-btn:disabled {
    opacity: .45;
    cursor: not-allowed;
}

.qty-btn:hover:not(:disabled) {
    background: var(--primary-dark);
}

.qty-input {
    width: 48px;
    height: 28px;
    text-align: center;
    border: 1px solid var(--border);
    border-radius: 6px;
    font-weight: 600;
    outline: none;
}

.row-total {
    margin-top: 4px;
    font-size: .9rem;
    font-weight: 700;
    color: var(--primary);
}

/* Toplam / bölüştürme */
.total-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.05rem;
    font-weight: 700;
    margin: 10px 0 6px 0;
    color: var(--primary);
}

.total-price {
    color: var(--accent, #5d6b63);
}

.split-section {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    font-size: .95rem;
}

.split-input {
    width: 70px;
    height: 34px;
    text-align: center;
    border: 1px solid var(--border);
    border-radius: 8px;
    font-weight: 600;
    outline: none;
}

.per-person {
    margin-left: 4px;
}

/* Butonlar */
.actions {
    margin-top: 8px;
    display: flex;
    gap: 10px;
    width: 100%;
}

.pay-btn {
    flex: 1 0 0;
    padding: 12px;
    border-radius: 12px;
    border: 1px solid var(--primary);
    background: var(--primary);
    color: #fff;
    font-weight: 700;
    cursor: pointer;
    transition: background .15s, border-color .15s, box-shadow .15s;
}

.pay-btn:hover {
    background: var(--primary-dark);
    border-color: var(--primary-dark);
}

.pay-btn:disabled {
    background: #ccc;
    border-color: #ccc;
    color: #777;
    cursor: not-allowed;
}

.pay-btn.outline {
    background: #fff;
    color: var(--primary);
    border-color: var(--primary);
}

.pay-btn.outline:hover {
    background: #f7f9f7;
}

/* Boş durum */
.no-orders {
    font-size: .95rem;
    color: #999;
    padding: 6px 0;
}

/* Responsive küçük ayar */
@media (max-width: 420px) {
    .order-row {
        grid-template-columns: 1fr auto;
    }

    .cell--qty {
        grid-column: 1 / -1;
        align-items: flex-start;
    }
}
</style>
