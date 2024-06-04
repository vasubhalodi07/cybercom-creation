<template>
    <div class="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
        <div class="flex flex-col items-center">
            <img :src="$auth.user.avatar" alt="User Avatar" class="w-32 h-32 rounded-full shadow-lg">
            <h2 class="mt-4 text-2xl font-semibold text-gray-900">{{ $auth.user.name }}</h2>
            <p class="mt-2 text-gray-600">{{ $auth.user.email }}</p>
            <p class="mt-1 text-gray-500 text-sm">Role: {{ $auth.user.role }}</p>
            <p class="mt-1 text-gray-500 text-sm">Member since: {{ new
                Date($auth.user.creationAt).toLocaleDateString() }}</p>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        user() {
            return this.$auth.user;
        }
    }
}
</script>

<style scoped></style>