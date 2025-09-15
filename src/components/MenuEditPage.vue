<template>
    <div class="page-wrapper">
        <div class="order-container">
            <button class="back-btn" @click="$router.go(-1)">Geri</button>
            <h2 class="title">Menü Düzenle</h2>
            <div class="menu-section">
                <button class="reset-btn" @click="resetMenu">Menüyü Varsayılana Sıfırla</button>
                <div class="add-section" style="margin-bottom: 18px;">
                    <input v-model="newName" placeholder="Ürün adı" class="menu-input" />
                    <input v-model.number="newPrice" type="number" placeholder="Fiyat" class="menu-input price" />
                    <select v-model="newCategory" class="menu-input category">
                        <option disabled value="">Kategori seç</option>
                        <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
                    </select>
                    <button class="add-btn" @click="addItem">Ekle</button>
                </div>
                <h3 class="subtitle">Mevcut Ürünler</h3>
                <ul class="menu-list">
                    <li v-for="(item, i) in menu" :key="i">
                        <input v-model="item.name" class="menu-input" />
                        <input v-model.number="item.price" type="number" class="menu-input price" />
                        <select v-model="item.category" class="menu-input category">
                            <option disabled value="">Kategori seç</option>
                            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
                        </select>
                        <button class="delete-btn" @click="deleteItem(i)">Sil</button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MenuEditPage',
    data() {
        return {
            menu: [],
            newName: '',
            newPrice: '',
            newCategory: '',
            categories: [
                'KAHVALTI',
                'GÜNÜN ÜRÜNLERİ',
                'İLAVELER ve GÜN İÇİNDE',
                'EV YEMEKLERİ',
                'SERİNLETİCİLER',
                'ISITICI SOHBET'
            ]
        };
    },
    methods: {
        resetMenu() {
            localStorage.removeItem('menuItems');
            this.loadMenu();
        },
        addItem() {
            if (!this.newName || !this.newPrice || !this.newCategory) return;
            this.menu.push({ name: this.newName, price: this.newPrice, category: this.newCategory });
            this.newName = '';
            this.newPrice = '';
            this.newCategory = '';
            this.saveMenu();
        },
        deleteItem(idx) {
            this.menu.splice(idx, 1);
            this.saveMenu();
        },
        saveMenu() {
            localStorage.setItem('menuItems', JSON.stringify(this.menu));
        },
        loadMenu() {
            const saved = localStorage.getItem('menuItems');
            if (saved) {
                this.menu = JSON.parse(saved);
            } else {
                // Varsayılan menü (görseldeki menüye göre)
                this.menu = [
                    // KAHVALTI
                    { name: 'Casa Leff Kahvaltı - 2 Kişilik', price: 880, category: 'KAHVALTI' },
                    // GÜNÜN ÜRÜNLERİ
                    // İLAVELER ve GÜN İÇİNDE
                    { name: 'Kasap Sucuklu Yumurta', price: 225, category: 'İLAVELER ve GÜN İÇİNDE' },
                    { name: 'Ev Yapımı Kavurmalı Yumurta', price: 250, category: 'İLAVELER ve GÜN İÇİNDE' },
                    { name: 'Haşlanmış Yumurta', price: 40, category: 'İLAVELER ve GÜN İÇİNDE' },
                    { name: 'Kasap Sucuk Tava', price: 200, category: 'İLAVELER ve GÜN İÇİNDE' },
                    { name: 'Menemen', price: 200, category: 'İLAVELER ve GÜN İÇİNDE' },
                    { name: 'Sütlü Biber', price: 180, category: 'İLAVELER ve GÜN İÇİNDE' },
                    { name: 'Omlet Veya Çırpılmış Yumurta', price: 175, category: 'İLAVELER ve GÜN İÇİNDE' },
                    { name: 'Patates Kızartması', price: 160, category: 'İLAVELER ve GÜN İÇİNDE' },
                    { name: 'Sıcak Tabağı', price: 250, category: 'İLAVELER ve GÜN İÇİNDE' },
                    { name: 'Peynir Tabağı', price: 180, category: 'İLAVELER ve GÜN İÇİNDE' },
                    // EV YEMEKLERİ
                    { name: 'Çorba', price: 85, category: 'EV YEMEKLERİ' },
                    { name: 'Ana Yemek', price: 90, category: 'EV YEMEKLERİ' },
                    { name: 'Tereyağlı Pirinç Pilavı', price: 90, category: 'EV YEMEKLERİ' },
                    { name: 'Mantı', price: 380, category: 'EV YEMEKLERİ' },
                    { name: 'Zeytinyağlılar', price: 140, category: 'EV YEMEKLERİ' },
                    { name: 'Kavurma', price: 550, category: 'EV YEMEKLERİ' },
                    { name: 'Pilav Üstü Kavurma', price: 450, category: 'EV YEMEKLERİ' },
                    { name: 'İçli Köfte', price: 140, category: 'EV YEMEKLERİ' },
                    { name: 'Salata', price: 90, category: 'EV YEMEKLERİ' },
                    { name: 'Cacık', price: 80, category: 'EV YEMEKLERİ' },
                    { name: 'Yoğurt', price: 35, category: 'EV YEMEKLERİ' },
                    // SERİNLETİCİLER
                    { name: 'Su', price: 15, category: 'SERİNLETİCİLER' },
                    { name: 'Cola - Fanta', price: 70, category: 'SERİNLETİCİLER' },
                    { name: 'Ice Tea', price: 70, category: 'SERİNLETİCİLER' },
                    { name: 'Meyve Suyu', price: 70, category: 'SERİNLETİCİLER' },
                    { name: 'Ayran', price: 40, category: 'SERİNLETİCİLER' },
                    { name: 'Ev Yapımı Limonata', price: 100, category: 'SERİNLETİCİLER' },
                    { name: 'Portakal Suyu', price: 100, category: 'SERİNLETİCİLER' },
                    { name: 'Gazoz', price: 60, category: 'SERİNLETİCİLER' },
                    { name: 'Soda', price: 40, category: 'SERİNLETİCİLER' },
                    // ISITICI SOHBET
                    { name: 'Çay', price: 35, category: 'ISITICI SOHBET' },
                    { name: 'Türk Kahvesi', price: 85, category: 'ISITICI SOHBET' },
                    { name: 'Americano', price: 100, category: 'ISITICI SOHBET' },
                    { name: 'Filtre Kahve', price: 100, category: 'ISITICI SOHBET' },
                    { name: 'Espresso', price: 85, category: 'ISITICI SOHBET' },
                    { name: 'Latte', price: 120, category: 'ISITICI SOHBET' },
                    { name: 'Ice Americano', price: 120, category: 'ISITICI SOHBET' },
                    { name: 'Ice Latte', price: 130, category: 'ISITICI SOHBET' },
                    { name: 'Ev Baklavası', price: 120, category: 'ISITICI SOHBET' },
                    { name: 'Fırın Sütlaç', price: 110, category: 'ISITICI SOHBET' }
                ];
            }
        }
    },
    watch: {
        menu: {
            handler() {
                this.saveMenu();
            },
            deep: true
        }
    },
    mounted() {
        this.loadMenu();
    }
};
</script>

<style scoped>
/* Menü sıfırlama butonu */
.reset-btn {
    background: #fff;
    color: var(--primary);
    border: 1px solid var(--primary);
    border-radius: 8px;
    padding: 8px 18px;
    font-size: 1rem;
    cursor: pointer;
    margin-bottom: 16px;
    transition: background .2s, color .2s;
}

.reset-btn:hover {
    background: var(--primary);
    color: #fff;
}

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


.menu-list li {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px 0;
    border-bottom: 1px solid #ececec;
    flex-wrap: wrap;
    margin-bottom: 8px;
    word-break: break-word;
}

@media (max-width: 600px) {
    .order-container {
        max-width: 98vw;
        padding: 18px 4vw 18px 4vw;
        box-sizing: border-box;
    }

    .menu-list li {
        flex-direction: column;
        align-items: stretch;
        gap: 10px;
        padding: 18px 0;
        margin-bottom: 14px;
        word-break: break-word;
    }

    .menu-input,
    .menu-input.price,
    .menu-input.category {
        width: 100%;
        min-width: 0;
        box-sizing: border-box;
        font-size: 1.05rem;
        word-break: break-word;
    }

    .delete-btn,
    .add-btn {
        width: 100%;
        margin-top: 4px;
        font-size: 1.08rem;
    }
}

/* Yukarıdaki responsive ve ana .menu-list li blokları zaten mevcut, bu tekrarlı ve hatalı blok kaldırıldı. */

.menu-input {
    font-size: 1rem;
    padding: 6px 10px;
    border-radius: 8px;
    border: 1px solid #ccc;
    background: #f8f8f8;
    color: var(--primary);
}

.menu-input.price {
    width: 80px;
}

.menu-input.category {
    min-width: 120px;
    font-size: 1rem;
    padding: 6px 10px;
    border-radius: 8px;
    border: 1px solid #ccc;
    background: #f8f8f8;
    color: var(--primary);
}

.add-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 18px;
    width: 100%;
}

@media (min-width: 601px) {
    .add-section {
        flex-direction: row;
        gap: 16px;
        align-items: center;
        margin-bottom: 18px;
    }

    .add-section .menu-input,
    .add-section .menu-input.price,
    .add-section .menu-input.category {
        width: 100%;
        min-width: 0;
        box-sizing: border-box;
    }

    .add-section .add-btn {
        width: 100%;
        font-size: 1.08rem;
    }
}

.add-btn {
    background: var(--primary);
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 8px 18px;
    font-size: 1rem;
    cursor: pointer;
    transition: background .2s;
}

.add-btn:hover {
    background: var(--primary-dark);
}

.delete-btn {
    background: #d32f2f;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 8px 14px;
    font-size: 1rem;
    cursor: pointer;
    transition: background .2s;
}

.delete-btn:hover {
    background: #a31515;
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
