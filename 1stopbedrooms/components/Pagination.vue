<template>
    <div class="pagination">
        <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">Previous</button>

        <button @click="changePage(1)" :class="{ active: currentPage === 1 }">1</button>
        <span v-if="showStartEllipsis">...</span>

        <button v-for="page in pagesToShow" :key="page" @click="changePage(page)"
            :class="{ active: page === currentPage }">
            {{ page }}
        </button>

        <span v-if="showEndEllipsis">...</span>
        <button @click="changePage(totalPages)" :class="{ active: currentPage === totalPages }">{{ totalPages
            }}</button>

        <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
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
    gap: 5px;
    margin: 20px 0;
}

.pagination button {
    padding: 5px 10px;
    border: 1px solid #ccc;
    background: #fff;
    cursor: pointer;
}

.pagination button.active {
    background: #007bff;
    color: #fff;
}

.pagination button:disabled {
    background: #f5f5f5;
    cursor: not-allowed;
}

.pagination span {
    padding: 5px 10px;
}
</style>
