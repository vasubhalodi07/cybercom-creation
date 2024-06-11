<template>
    <transition name="fade">
        <div v-if="visible" :class="toastClasses" @click="close">
            <span>{{ message }}</span>
        </div>
    </transition>
</template>

<script>
export default {
    data() {
        return {
            visible: false,
            message: '',
            type: 'success',
            timeout: null,
        };
    },
    computed: {
        toastClasses() {
            const baseClasses = 'fixed bottom-4 right-4 p-4 rounded-lg shadow-lg cursor-pointer';
            const typeClasses = {
                success: 'bg-green-100 text-green-800',
                error: 'bg-red-100 text-red-800',
                info: 'bg-blue-100 text-blue-800',
            };

            return `${baseClasses} ${typeClasses[this.type]}`;
        },
    },
    methods: {
        show(message, type = 'success', duration = 3000) {
            this.message = message;
            this.type = type;
            this.visible = true;

            if (this.timeout) {
                clearTimeout(this.timeout);
            }

            this.timeout = setTimeout(() => {
                this.visible = false;
            }, duration);
        },
        close() {
            this.visible = false;
            if (this.timeout) {
                clearTimeout(this.timeout);
            }
        },
    },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>