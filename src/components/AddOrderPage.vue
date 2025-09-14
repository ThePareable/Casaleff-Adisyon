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

            <!-- Günlük ürünler -->
            <h3 class="subtitle">Günlük Ürünler</h3>
            <!-- Günlük ürünler içerik alanı (şimdilik boş) -->

            <!-- Menü bölümleri -->
            <h3 class="subtitle">Menü</h3>

            <div class="menu-section">
                <h4>CASA LEFF KAHVALTI - 2 KİŞİLİK</h4>
                <p class="desc">
                    Bahçeden Tabak, Peynir Tabağı, Zeytin Dalı, Bacuka, Mevsim Reçelleri, Taze Lor, Bal,
                    Tereyağ, Casa Patatesi, Kabak Rulo, Sahan Yumurta, Sıcak Tabağı, Pekmez &amp; Tahin
                </p>
                <div class="price">
                    <button class="add-btn" @click="addProduct('Casa Leff Kahvaltı', 880)"
                        aria-label="Casa Leff Kahvaltı ekle">+</button>
                    ₺880,00
                </div>
            </div>

            <div class="menu-section">
                <h4>İLAVELER ve GÜN İÇİNDE</h4>
                <ul class="menu-list">
                    <li><button class="add-btn" @click="addProduct('Kasap Sucuklu Yumurta', 225)">+</button> Kasap
                        Sucuklu Yumurta <span>₺225,00</span></li>
                    <li><button class="add-btn" @click="addProduct('Ev Yapımı Kavurmalı Yumurta', 250)">+</button> Ev
                        Yapımı Kavurmalı Yumurta <span>₺250,00</span></li>
                    <li><button class="add-btn" @click="addProduct('Haşlanmış Yumurta', 40)">+</button> Haşlanmış
                        Yumurta <span>₺40,00</span></li>
                    <li><button class="add-btn" @click="addProduct('Kasap Sucuk Tava', 200)">+</button> Kasap Sucuk Tava
                        <span>₺200,00</span>
                    </li>
                    <li><button class="add-btn" @click="addProduct('Menemen', 200)">+</button> Menemen
                        <span>₺200,00</span>
                    </li>
                    <li><button class="add-btn" @click="addProduct('Sütlü Biber', 180)">+</button> Sütlü Biber
                        <span>₺180,00</span>
                    </li>
                    <li><button class="add-btn" @click="addProduct('Omlet Veya Çırpılmış Yumurta', 175)">+</button>
                        Omlet Veya Çırpılmış Yumurta <span>₺175,00</span></li>
                    <li><button class="add-btn" @click="addProduct('Patates Kızartması', 160)">+</button> Patates
                        Kızartması <span>₺160,00</span></li>
                    <li><button class="add-btn" @click="addProduct('Sıcak Tabağı', 250)">+</button> Sıcak Tabağı
                        <span>₺250,00</span>
                    </li>
                    <li><button class="add-btn" @click="addProduct('Peynir Tabağı', 180)">+</button> Peynir Tabağı
                        <span>₺180,00</span>
                    </li>
                </ul>
            </div>

            <div class="menu-section">
                <h4>EV YEMEKLERİ</h4>
                <ul class="menu-list">
                    <li><button class="add-btn" @click="addProduct('Çorba', 85)">+</button> Çorba <span>₺85,00</span>
                    </li>
                    <li><button class="add-btn" @click="addProduct('Ana Yemek', 90)">+</button> Ana Yemek
                        <span>₺90,00</span>
                    </li>
                    <li><button class="add-btn" @click="addProduct('Tereyağlı Pirinç Pilavı', 90)">+</button> Tereyağlı
                        Pirinç Pilavı <span>₺90,00</span></li>
                    <li><button class="add-btn" @click="addProduct('Mantı', 380)">+</button> Mantı <span>₺380,00</span>
                    </li>
                    <li><button class="add-btn" @click="addProduct('Zeytinyağlılar', 140)">+</button> Zeytinyağlılar
                        <span>₺140,00</span>
                    </li>
                    <li><button class="add-btn" @click="addProduct('Kavurma', 550)">+</button> Kavurma
                        <span>₺550,00</span>
                    </li>
                    <li><button class="add-btn" @click="addProduct('Pilav Üstü Kavurma', 450)">+</button> Pilav Üstü
                        Kavurma <span>₺450,00</span></li>
                    <li><button class="add-btn" @click="addProduct('İçli Köfte', 140)">+</button> İçli Köfte
                        <span>₺140,00</span>
                    </li>
                    <li><button class="add-btn" @click="addProduct('Salata', 90)">+</button> Salata <span>₺90,00</span>
                    </li>
                    <li><button class="add-btn" @click="addProduct('Cacık', 80)">+</button> Cacık <span>₺80,00</span>
                    </li>
                    <li><button class="add-btn" @click="addProduct('Yoğurt', 35)">+</button> Yoğurt <span>₺35,00</span>
                    </li>
                </ul>
            </div>

            <div class="menu-section">
                <h4>SERİNLETİCİLER</h4>
                <ul class="menu-list">
                    <li><button class="add-btn" @click="addProduct('Su', 15)">+</button> Su <span>₺15,00</span></li>
                    <li><button class="add-btn" @click="addProduct('Cola - Fanta', 70)">+</button> Cola - Fanta
                        <span>₺70,00</span>
                    </li>
                    <li><button class="add-btn" @click="addProduct('Ice Tea', 70)">+</button> Ice Tea
                        <span>₺70,00</span>
                    </li>
                    <li><button class="add-btn" @click="addProduct('Meyve Suyu', 70)">+</button> Meyve Suyu
                        <span>₺70,00</span>
                    </li>
                    <li><button class="add-btn" @click="addProduct('Ayran', 40)">+</button> Ayran <span>₺40,00</span>
                    </li>
                    <li><button class="add-btn" @click="addProduct('Ev Yapımı Limonata', 100)">+</button> Ev Yapımı
                        Limonata <span>₺100,00</span></li>
                    <li><button class="add-btn" @click="addProduct('Portakal Suyu', 100)">+</button> Portakal Suyu
                        <span>₺100,00</span>
                    </li>
                    <li><button class="add-btn" @click="addProduct('Gazoz', 60)">+</button> Gazoz <span>₺60,00</span>
                    </li>
                    <li><button class="add-btn" @click="addProduct('Soda', 40)">+</button> Soda <span>₺40,00</span></li>
                </ul>
            </div>

            <div class="menu-section">
                <h4>ISITICI SOHBET</h4>
                <ul class="menu-list">
                    <li><button class="add-btn" @click="addProduct('Çay', 35)">+</button> Çay <span>₺35,00</span></li>
                    <li><button class="add-btn" @click="addProduct('Türk Kahvesi', 85)">+</button> Türk Kahvesi
                        <span>₺85,00</span>
                    </li>
                    <li><button class="add-btn" @click="addProduct('Americano', 100)">+</button> Americano
                        <span>₺100,00</span>
                    </li>
                    <li><button class="add-btn" @click="addProduct('Filtre Kahve', 100)">+</button> Filtre Kahve
                        <span>₺100,00</span>
                    </li>
                    <li><button class="add-btn" @click="addProduct('Espresso', 85)">+</button> Espresso
                        <span>₺85,00</span>
                    </li>
                    <li><button class="add-btn" @click="addProduct('Latte', 120)">+</button> Latte <span>₺120,00</span>
                    </li>
                    <li><button class="add-btn" @click="addProduct('Ice Americano', 120)">+</button> Ice Americano
                        <span>₺120,00</span>
                    </li>
                    <li><button class="add-btn" @click="addProduct('Ice Latte', 130)">+</button> Ice Latte
                        <span>₺130,00</span>
                    </li>
                    <li><button class="add-btn" @click="addProduct('Ev Baklavası', 120)">+</button> Ev Baklavası
                        <span>₺120,00</span>
                    </li>
                    <li><button class="add-btn" @click="addProduct('Fırın Sütlaç', 110)">+</button> Fırın Sütlaç
                        <span>₺110,00</span>
                    </li>
                </ul>
            </div>
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
        addProduct(name, price) {
            const tid = Number(this.tableId);
            if (Number.isNaN(tid)) return;

            const nextList = this.ordersByTable[tid] ? [...this.ordersByTable[tid]] : [];
            nextList.push({ name, price });

            // Immutable atama -> Vue 3 reaktivitesi
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
    },
};
</script>

<style scoped>
/* Artı / Eksi */
.add-btn {
    margin-right: 8px;
    background: var(--primary);
    color: #fff;
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

.add-btn:hover {
    background: var(--primary-dark);
}

/* Eksi tuşu her zaman kırmızı, hoverda koyu kırmızı */
.remove-btn {
    margin-right: 8px;
    background: #d32f2f;
    color: #fff;
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

.remove-btn:hover {
    background: #a31515;
}

/* Sipariş listesi */
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

/* Sayfa & kart iskeleti (diğer sayfalarla aynı) */
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
    margin: 40px auto;
    padding: 48px 32px 32px 32px;
    margin: auto;
    background: var(--container-bg, var(--surface));
    border: 1px solid var(--border);
    border-radius: 24px;
    box-shadow: 0 2px 16px rgba(0, 0, 0, .08);
    padding: 32px 24px 24px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;

    /* içerik uzarsa kart içinde scroll */
    max-height: min(640px, calc(100dvh - 96px));
    overflow: auto;
}

/* Logo & başlık */
.logo {
    width: 80px;
    margin-bottom: 16px;
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

/* Menü */
.menu-section {
    width: 100%;
    margin-bottom: 18px;
}

.menu-section h4 {
    font-size: 1.08rem;
    font-weight: 600;
    color: var(--primary);
    margin-bottom: 6px;
}

.menu-section .desc {
    font-size: .98rem;
    color: var(--text-main);
    margin-bottom: 4px;
}

.menu-section .price {
    font-size: 1.08rem;
    font-weight: 600;
    color: var(--accent);
    margin-bottom: 8px;
}

.menu-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.menu-list li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1rem;
    padding: 8px 0;
    border-bottom: 1px solid #ececec;

    /* Sipariş satırı: eksi tuşu her zaman sol başta ve sabit */
    .order-list li {
        display: flex;
        align-items: center;
        font-size: 1rem;
        padding: 8px 0;
        border-bottom: 1px solid #ececec;
        color: var(--primary);
    }

    .order-list li .remove-btn {
        margin-right: 8px;
        background: var(--accent);
        color: #fff;
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

    .order-list li .remove-btn:hover {
        background: #d32f2f;
    }

    .order-list li span {
        font-weight: 500;
        color: var(--accent);
        margin-right: 12px;
    }

    .menu-list li span {
        font-weight: 500;
        color: var(--accent);
    }

    /* Geri tuşu (ufak, sol üst) */
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

    .back-btn svg {
        width: 22px;
        height: 22px;
    }
}
</style>
