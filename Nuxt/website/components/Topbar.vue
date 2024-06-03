<template>
    <nav class="bg-gray-800">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div class="relative flex h-14 items-center justify-between">
                <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    <button type="button"
                        class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        aria-controls="mobile-menu" aria-expanded="false" @click="toggleDrawer">
                        <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>
                <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <div class="flex flex-shrink-0 items-center">
                        <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                            alt="Your Company" />
                    </div>
                    <div class="hidden sm:ml-6 sm:block">
                        <div class="flex space-x-1">
                            <NuxtLink to="/"
                                class="text-gray-300 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                                Home</NuxtLink>
                            <NuxtLink to="/product"
                                class="text-gray-300 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                                Product</NuxtLink>
                            <NuxtLink to="/contact" v-if="$auth.loggedIn && $auth.user && $auth.user.role == 'customer'"
                                class="text-gray-300 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                                Contact</NuxtLink>
                            <NuxtLink to="/contact" v-if="$auth.loggedIn && $auth.user && $auth.user.role == 'admin'"
                                class="text-gray-300 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                                Categories</NuxtLink>
                        </div>
                    </div>
                </div>
                <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <div class="py-6" v-if="!$auth.loggedIn">
                        <NuxtLink to="/login"
                            class="text-gray-300 hover:text-white rounded-md px-3 py-2 text-sm font-medium flex items-center">
                            <div>Login</div>&nbsp;<svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </NuxtLink>
                    </div>

                    <button v-if="$auth.loggedIn && $auth.user && $auth.user.role !== 'admin'" type="button"
                        class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white pr-2">
                        <NuxtLink to="/cart">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                        </NuxtLink>
                    </button>

                    <div class="relative ml-3" v-if="$auth.loggedIn">
                        <div>
                            <button type="button"
                                class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                @click="toggle">
                                <img class="h-8 w-8 rounded-full" :src="$auth.user.avatar" alt="" />
                            </button>
                        </div>

                        <div v-if="open"
                            class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                            <NuxtLink to="/profile" class="block px-4 py-2 text-sm text-gray-700" role="menuitem">Your
                                Profile</NuxtLink>
                            <a @click="logout" style="cursor: pointer;" class="block px-4 py-2 text-sm text-gray-700"
                                role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="drawer" class="sm:hidden" id="mobile-menu">
            <div class="space-y-1 px-2 pb-3 pt-2">
                <NuxtLink to="/"
                    class="text-gray-300 hover:text-white block rounded-md px-3 py-2 text-base font-medium">
                    Home</NuxtLink>
                <NuxtLink to="/product"
                    class="text-gray-300 hover:text-white block rounded-md px-3 py-2 text-base font-medium">
                    Product</NuxtLink>
                <NuxtLink to="/contact"
                    class="text-gray-300 hover:text-white block rounded-md px-3 py-2 text-base font-medium">
                    Contact</NuxtLink>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            open: false,
            drawer: false
        };
    },
    methods: {
        toggle() {
            this.open = !this.open;
        },
        toggleDrawer() {
            this.drawer = !this.drawer;
        },
        async logout() {
            await this.$auth.logout();
        }
    },
};
</script>