<template>
    <div class="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
        <div class="flex flex-col items-center">
            <img :src="user.data.avatar" alt="User Avatar" class="w-32 h-32 rounded-full shadow-lg">
            <h2 class="mt-4 text-2xl font-semibold text-gray-900">{{ user.data.name }}</h2>
            <p class="mt-2 text-gray-600">{{ user.data.email }}</p>
            <p class="mt-1 text-gray-500 text-sm">Role: {{ user.data.role }}</p>
            <p class="mt-1 text-gray-500 text-sm">Member since: {{ new
                Date(user.data.creationAt).toLocaleDateString() }}</p>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        user() {
            return this.$store.state.user;
        }
    }
}
</script>

<style scoped></style>