<template>
    <div class="min-h-screen flex justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
            <div>
                <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Logo">
                <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
            </div>
            <form class="mt-8 space-y-6" @submit.prevent="register">
                <input type="hidden" name="remember" value="true">
                <div class="rounded-md shadow-sm">
                    <div class="mb-3">
                        <input type="text" autocomplete="name" required
                            class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Name" v-model="formData.name" />
                    </div>
                    <div class="mb-3">
                        <input type="email" autocomplete="email" required
                            class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Email address" v-model="formData.email" />
                    </div>
                    <div class="mb-3">
                        <input type="password" autocomplete="new-password" required
                            class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Password" v-model="formData.password" />
                    </div>
                    <div class="mb-3">
                        <input type="text" required
                            class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Enter Image URL Link" v-model="formData.avatar" />
                    </div>
                </div>
                <div>
                    <button type="submit"
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Sign up
                    </button>
                </div>
                <div class="text-sm text-center">
                    <span class="text-gray-600">Already have an account?</span>
                    <NuxtLink to="/login" class="font-medium text-indigo-600 hover:text-indigo-500"> Sign in</NuxtLink>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            formData: {
                name: "",
                email: "",
                password: "",
                avatar: ""
            }
        };
    },
    methods: {
        register() {
            console.log(this.formData);
        },
    },
};
</script>

<style scoped></style>
