<template>
    <div class="page-wrapper">
        <div class="order-container">
            <button class="back-btn" @click="$router.go(-1)">Geri</button>
            <h2 class="title">Menü Düzenle</h2>
            <div class="menu-section">
                <div class="add-category-section"
                    style="margin-bottom: 18px; display: flex; gap: 10px; align-items: center;">
                    <input v-model="newCategoryName" placeholder="Yeni kategori adı" class="menu-input category" />
                    <button class="add-btn" @click="addCategory">Kategori Ekle</button>
                </div>
                <div class="add-section" style="margin-bottom: 18px;">
                    <select v-model="newCategory" class="menu-input category">
                        <option disabled value="">Kategori seç</option>
                        <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
                    </select>
                    <input v-model="newName" placeholder="Ürün adı" class="menu-input" />
                    <input v-model="newDescription" placeholder="Açıklama" class="menu-input" />
                    <input v-model.number="newPrice" type="number" placeholder="Fiyat" class="menu-input price" />
                    <button class="add-btn" @click="addItem">Ekle</button>
                </div>
                <h3 class="subtitle">Mevcut Ürünler</h3>
                <div v-if="mainMenu && mainMenu.subMenus && mainMenu.subMenus.length">
                    <div v-for="cat in mainMenu.subMenus" :key="cat.id" class="menu-category-block">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <h4 style="margin: 0;">{{ cat.name }}</h4>
                            <button class="delete-btn" style="padding:4px 10px;font-size:0.95rem;"
                                @click="deleteCategory(cat)">Sil</button>
                        </div>
                        <ul class="menu-list">
                            <li v-for="(item, i) in cat.items" :key="item.name + i">
                                <div class="menu-item-info"
                                    style="display: flex; align-items: center; gap: 18px; min-width: 0;">
                                    <span class="menu-item-name" style="font-weight: 600; color: var(--primary);">{{
                                        item.name }}</span>
                                    <span class="menu-item-desc" v-if="item.description"
                                        style="color: #555; font-size: 0.98em; white-space: pre-line;">({{
                                            item.description }})</span>
                                </div>
                                <span class="menu-item-price" style="margin-left: auto; font-weight: 500;">{{ item.price
                                    }}₺</span>
                                <button class="delete-btn" @click="deleteItem(cat.id, item)">Sil</button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div v-else>Menüde ürün yok.</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MenuEditPage',
    props: {
        onAddItem: {
            type: Function,
            required: true
        },
        onDeleteItem: {
            type: Function,
            required: true
        }
    },
    data() {
        return {
            newName: '',
            newDescription: '',
            newPrice: '',
            newCategory: '',
            newCategoryName: '',
            categories: [],
            mainMenu: null
        };
    },
    async mounted() {
        await this.fetchCategories();
        await this.fetchMenu();
    },
    methods: {
        async deleteCategory(cat) {
            if (cat.items && cat.items.length > 0) {
                const confirmed = confirm('Bu kategoride ürünler var. Silmek istediğinize emin misiniz?');
                if (!confirmed) return;
            }
            try {
                const sessionId = localStorage.getItem('sessionId') || '';
                const response = await fetch('http://localhost:8080/menu/remove', {
                    method: 'DELETE',
                    headers: { 'X-Session-Id': sessionId },
                    body: JSON.stringify({ name: cat.name })
                });
                if (!response.ok) throw new Error('Kategori silinemedi');
                await this.fetchCategories();
                await this.fetchMenu();
            } catch (err) {
                alert('Kategori silinemedi: ' + (err.message || 'Sunucu hatası'));
            }
        },
        async fetchMenu() {
            try {
                const sessionId = localStorage.getItem('sessionId') || '';
                const response = await fetch('http://localhost:8080/menu/getMainMenu', {
                    method: 'GET',
                    headers: { 'X-Session-Id': sessionId }
                });
                if (!response.ok) throw new Error('Menü alınamadı');
                const data = await response.json();
                this.mainMenu = data;
            } catch (err) {
                this.mainMenu = null;
            }
        },
        async fetchCategories() {
            try {
                const sessionId = localStorage.getItem('sessionId') || '';
                const response = await fetch('http://localhost:8080/menu/getMainMenu', {
                    method: 'GET',
                    headers: { 'X-Session-Id': sessionId }
                });
                if (!response.ok) throw new Error('Kategoriler alınamadı');
                const data = await response.json();
                // subMenus içindeki name'leri kategori olarak kullan
                if (data && Array.isArray(data.subMenus)) {
                    this.categories = data.subMenus.map(m => m.name);
                } else {
                    this.categories = [];
                }
            } catch (err) {
                this.categories = [];
            }
        },
        async addCategory() {
            if (!this.newCategoryName) return;
            try {
                const sessionId = localStorage.getItem('sessionId') || '';
                const response = await fetch('http://localhost:8080/menu/add', {
                    method: 'POST',
                    headers: { 'X-Session-Id': sessionId },
                    body: new URLSearchParams({ name: this.newCategoryName, parentMenu: "MainMenu" })
                });
                if (!response.ok) throw new Error('Kategori eklenemedi');
                this.newCategoryName = '';
                await this.fetchCategories();
                await this.fetchMenu();
            } catch (err) {
                alert('Kategori eklenemedi: ' + (err.message || 'Sunucu hatası'));
            }
        },
        addItem() {
            if (!this.newName || !this.newPrice || !this.newCategory) return;
            const sessionId = localStorage.getItem('sessionId') || '';
            const item = {
                name: this.newName,
                description: this.newDescription || '',
                price: this.newPrice,
                path: ''
            };
            fetch(`http://localhost:8080/menu/addItems?menu=${encodeURIComponent(this.newCategory)}`, {
                method: 'POST',
                headers: {
                    'X-Session-Id': sessionId,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify([item])
            })
                .then(res => {
                    if (!res.ok) throw new Error('Ürün eklenemedi');
                    this.newName = '';
                    this.newDescription = '';
                    this.newPrice = '';
                    this.newCategory = '';
                    this.fetchCategories();
                    this.fetchMenu();
                    alert('Ürün başarıyla eklendi!');
                })
                .catch(err => {
                    alert('Ürün eklenemedi: ' + (err.message || 'Sunucu hatası'));
                });
        },
        deleteItem(idx) {
            this.onDeleteItem(idx);
        }

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
    min-height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--background);
}

.order-container {
    position: relative;
    width: 100%;
    max-width: 650px;
    max-height: 77vh;
    margin: auto;
    background: var(--container-bg, var(--surface));
    border: 1px solid var(--border);
    border-radius: 24px;
    box-shadow: 0 2px 16px rgba(0, 0, 0, .08);
    padding: 48px 32px 32px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
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
