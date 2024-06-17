<template>
    <div class="pagination">
        <button v-if="currentPage !== 1" @click="changePage(currentPage - 1)">
            <i class="fa-solid fa-chevron-left"></i>
        </button>

        <button v-if="totalPages > 1" class="page" @click="changePage(1)"
            :class="{ active: currentPage === 1 }">1</button>
        <span v-if="showStartEllipsis">...</span>

        <button class="page" v-for="page in pagesToShow" :key="page" @click="changePage(page)"
            :class="{ active: page === currentPage }">
            {{ page }}
        </button>

        <span v-if="showEndEllipsis">...</span>
        <button class="page" @click="changePage(totalPages)" :class="{ active: currentPage === totalPages }">
            {{ totalPages }}
        </button>

        <button v-if="currentPage !== totalPages" @click="changePage(currentPage + 1)">
            <i class="fa-solid fa-chevron-right"></i>
        </button>
    </div>
</template>

<script>
export default {
    props: {
        currentPage: {
            type: Number,
            required: true
        },
        totalPages: {
            type: Number,
            required: true
        }
    },
    computed: {
        pagesToShow() {
            const pages = [];
            const startPage = Math.max(2, this.currentPage - 2);
            const endPage = Math.min(this.totalPages - 1, this.currentPage + 2);
            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }
            return pages;
        },
        showStartEllipsis() {
            return this.currentPage > 4;
        },
        showEndEllipsis() {
            return this.currentPage < this.totalPages - 3;
        }
    },
    methods: {
        changePage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.$emit('page-changed', page);
            }
        }
    }
};
</script>

<style scoped>
.pagination {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin: 20px 0;
}

.page {
    padding: 5px 10px;
    border: 1px solid #ccc;
    background: #fff;
    cursor: pointer;
}

.page.active {
    background-color: #0f249a;
    color: #fff;
}

.pagination button {
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 17px;
    color: #0f249a;
    border-radius: 50%;
}

.pagination span {
    padding: 5px 10px;
}
</style>
