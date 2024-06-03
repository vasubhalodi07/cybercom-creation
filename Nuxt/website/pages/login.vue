<template>
    <div class="min-h-screen flex justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
            <div>
                <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Logo">
                <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
            </div>
            <form class="mt-8 space-y-4" @submit.prevent="login">
                <div class="rounded-md shadow-sm">
                    <div class="mb-3">
                        <input id="email-address" name="email" type="email" autocomplete="email" required
                            v-model="formData.email"
                            class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Email address">
                    </div>
                    <div class="mb-3">
                        <input id="password" name="password" type="password" autocomplete="current-password" required
                            v-model="formData.password"
                            class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Password">
                    </div>
                </div>
                <div>
                    <button type="submit"
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Sign in
                    </button>
                </div>
                <div class="text-sm text-center">
                    <span class="text-gray-600">Don't have an account?</span>
                    <NuxtLink to="/register" class="font-medium text-indigo-600 hover:text-indigo-500">Sign up
                    </NuxtLink>
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
                email: "",
                password: "",
            }
        };
    },
    methods: {
        async login() {
            try {
                const response = await this.$auth.loginWith('local', {
                    data: {
                        email: this.formData.email,
                        password: this.formData.password,
                    }
                })

                if (response) {
                    const userResponse = await this.$auth.fetchUser();
                    this.$auth.setUser(userResponse.data);
                    this.$router.push('/');
                } else {
                    alert("having problem in login authentication!");
                }
            } catch (err) {
                console.log(err)
            }
        },
    },
};
</script>

<style scoped></style>
