<!-- NewTablePage.vue -->
<template>
    <div class="page-wrapper">
        <div class="login-container">
            <div class="page-container" :class="{ 'page-container--scroll': shouldScroll }">
                <!-- Geri -->
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
                    <div v-for="table in emptyTables" :key="table.id" class="item">
                        <div class="item-info"
                            @click="$router.push({ name: 'add-order', params: { tableId: table.id } })"
                            style="cursor:pointer;">
                            <span class="item-name">Masa {{ table.id }}</span>
                            <span class="item-status">Boş</span>
                        </div>
                        <div class="item-actions">
                            <button class="delete-btn" @click="deleteTable(table.id)" aria-label="Masa sil">Sil</button>
                        </div>
                    </div>
                    <div v-if="!emptyTables.length" class="state muted">Şu an boş masa yok.</div>
                </div>
                <div class="add-table-row">
                    <button class="add-table-btn" @click="addNewTable">Masa Ekle</button>
                </div>
            </div> <!-- .page-container -->

            <!-- Masa Ekle container hemen altı -->

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
        };
    },
    computed: {
        shouldScroll() {
            return this.emptyTables.length > 10;
        },
    },
    methods: {
        async addNewTable() {
            // Önce tüm masaları çek, en büyük id'yi bul, bir fazlasını ekle
            const sessionId = this.getCleanSessionId();
            let nextNum = 1;
            try {
                const allResp = await fetch('http://localhost:8080/table/getAll', {
                    method: 'GET',
                    headers: { 'X-Session-Id': sessionId }
                });
                if (!allResp.ok) throw new Error('Tüm masalar alınamadı');
                const allData = await allResp.json();
                // Normalize allData to numeric ids. Support formats:
                // - [1,2,3]
                // - [{id:1}, ...]
                // - ['table1','table2'] or [{id: 'table12'}, ...]
                const parseNumericId = v => {
                    if (v == null) return null;
                    if (typeof v === 'number' && Number.isFinite(v)) return Number(v);
                    if (typeof v === 'string') {
                        // try pure number
                        if (/^\d+$/.test(v)) return Number(v);
                        // try pattern like 'table12' or 'Table-12'
                        const m = v.match(/(\d+)$/);
                        return m ? Number(m[1]) : null;
                    }
                    if (typeof v === 'object') {
                        // object may have id property
                        const idVal = v.id ?? v.ID ?? v.name ?? null;
                        return parseNumericId(idVal);
                    }
                    return null;
                };

                let allIds = [];
                if (Array.isArray(allData)) {
                    allIds = allData.map(item => parseNumericId(item)).filter(n => n != null);
                }
                if (allIds.length) {
                    const maxId = Math.max(...allIds.map(id => Number(id) || 0));
                    nextNum = maxId + 1;
                }
                const tableName = `table${nextNum}`;
                const resp = await fetch(`http://localhost:8080/table/add?number=${encodeURIComponent(tableName)}&areaID=1`, {
                    method: 'POST',
                    headers: { 'X-Session-Id': sessionId }
                });
                if (!resp.ok) throw new Error('Masa eklenemedi');
                await this.fetchEmptyTables();
            } catch (e) {
                this.error = 'Masa eklenemedi.';
            }
        },
        // localStorage -> header için güvenli hale getir
        getCleanSessionId() {
            const raw = localStorage.getItem('sessionId') || '';
            return raw.replace(/(^"|"$)/g, '').trim();
        },

        async fetchEmptyTables() {
            this.loading = true;
            this.error = '';

            const sessionId = this.getCleanSessionId();
            if (!sessionId) {
                this.loading = false;
                // E001 yani oturum yoksa login’e dön
                this.$router.replace('/');
                return;
            }

            try {
                const resp = await fetch('http://localhost:8080/table/getEmpty', {
                    method: 'GET',
                    headers: {
                        'X-Session-Id': sessionId,     // backend’in beklediği header
                    },
                });

                // Hata gövdesi genelde {status, exception:{message: "..."}}
                if (!resp.ok) {
                    let msg = 'Boş masalar alınamadı.';
                    try {
                        const err = await resp.json();
                        msg = err?.exception?.message || err?.message || msg;
                    } catch (_) { }
                    // Oturum yok/bozuksa login’e gönder
                    if (msg.toLowerCase().includes('session') && msg.toLowerCase().includes('empty')) {
                        this.$router.replace('/');
                        return;
                    }
                    this.error = msg;
                    return;
                }

                const data = await resp.json();
                // Normalize response into objects with numeric `id` and keep sorted order
                const parseNumericId = v => {
                    if (v == null) return null;
                    if (typeof v === 'number' && Number.isFinite(v)) return Number(v);
                    if (typeof v === 'string') {
                        if (/^\d+$/.test(v)) return Number(v);
                        const m = v.match(/(\d+)$/);
                        return m ? Number(m[1]) : null;
                    }
                    if (typeof v === 'object') {
                        const idVal = v.id ?? v.ID ?? v.name ?? null;
                        return parseNumericId(idVal);
                    }
                    return null;
                };

                if (!Array.isArray(data)) {
                    this.emptyTables = [];
                } else {
                    const normalized = data
                        .map(item => {
                            const num = parseNumericId(item);
                            return num == null ? null : { id: num, raw: item };
                        })
                        .filter(Boolean)
                        .sort((a, b) => a.id - b.id);
                    this.emptyTables = normalized;
                }
            } catch (e) {
                this.error = 'Sunucuya bağlanılamadı.';
            } finally {
                this.loading = false;
            }
        },
        async deleteTable(tableId) {
            if (!confirm(`Masa ${tableId} silinsin mi?`)) return;
            try {
                const sessionId = this.getCleanSessionId();
                const resp = await fetch(`http://localhost:8080/table/remove?tableId=${encodeURIComponent(tableId)}`, {
                    method: 'DELETE',
                    headers: { 'X-Session-Id': sessionId }
                });
                if (!resp.ok) throw new Error('Masa silinemedi');
                await this.fetchEmptyTables();
            } catch (e) {
                alert('Masa silinirken hata oluştu.');
            }
        },
    },
    mounted() {
        this.fetchEmptyTables();
    },
};
</script>

<style scoped>
/* Floating add table button */
.add-table-btn {
    position: fixed;
    right: 32px;
    bottom: 32px;
    background: var(--primary, #2e5d3a);
    color: #fff;
    border: none;
    border-radius: 50px;
    padding: 16px 32px;
    font-size: 1.15rem;
    font-weight: 600;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);
    cursor: pointer;
    z-index: 100;
    transition: background .2s;
}

.add-table-btn.inside-container {
    position: absolute;
    right: 24px;
    bottom: 24px;
    background: var(--primary, #2e5d3a);
    color: #fff;
    border: none;
    border-radius: 32px;
    padding: 10px 22px;
    font-size: 1rem;
    font-weight: 600;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);
    cursor: pointer;
    z-index: 10;
    transition: background .2s;
}

.add-table-btn.inside-container:hover {
    background: var(--primary-dark, #1e3d25);
}

.page-container {
    position: relative;
}

.login-container {
    width: 100vw;
    height: 80vh;
    max-height: 76vh;
    /* 2x56px banner */
    min-height: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
}

.page-container {
    position: relative;
    width: 88vw;
    max-width: 540px;
    height: 72vh;
    min-height: 320px;
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 20px;
    height: 100%;
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

@media (max-width:480px) {
    .login-container {
        height: calc(80vh - 64px);
        min-height: 0;
        padding: 0;
    }

    .page-container {
        padding: 8px 1vw 6px;
        width: 99vw;
        max-width: 100vw;
        height: 100%;
        min-height: 220px;
        margin: 0 auto;
        margin-top: 8px;
        margin-bottom: 8px;
    }
}
</style>