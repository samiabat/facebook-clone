<script setup>
import { ref, computed } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';

const page = usePage();
const user = computed(() => page.props.auth.user);
const userInitial = computed(() => user.value?.name?.charAt(0).toUpperCase() ?? '?');

const activeTab = ref('home');
</script>

<template>
    <div class="min-h-screen bg-[#F0F2F5]">
        <!-- Fixed top nav -->
        <nav class="fixed top-0 left-0 right-0 z-50 bg-white shadow h-14 flex items-center">
            <div class="w-full px-4 flex items-center justify-between h-full">

                <!-- Left: logo + search -->
                <div class="flex items-center gap-2 flex-shrink-0">
                    <!-- Facebook "f" logo -->
                    <Link :href="route('dashboard')" class="flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" class="w-10 h-10">
                            <path fill="#1877F2" d="M36 18C36 8.059 27.941 0 18 0S0 8.059 0 18c0 8.988 6.584 16.436 15.188 17.793V23.203h-4.57V18h4.57v-3.968c0-4.513 2.688-7.007 6.802-7.007 1.97 0 4.03.352 4.03.352v4.43h-2.27c-2.237 0-2.934 1.389-2.934 2.812V18h4.993l-.798 5.203h-4.195v12.59C29.416 34.436 36 26.988 36 18z"/>
                            <path fill="#fff" d="M25.003 23.203l.798-5.203h-4.993v-3.381c0-1.423.697-2.812 2.934-2.812h2.27v-4.43s-2.06-.352-4.03-.352c-4.114 0-6.802 2.494-6.802 7.007V18h-4.57v5.203h4.57v12.59a18.175 18.175 0 005.624 0V23.203h4.199z"/>
                        </svg>
                    </Link>

                    <!-- Search bar -->
                    <div class="hidden sm:flex items-center bg-[#F0F2F5] rounded-full px-3 py-2 gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-[#65676B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
                        </svg>
                        <input
                            type="text"
                            placeholder="Search Facebook"
                            class="bg-transparent text-sm text-[#050505] placeholder-[#65676B] outline-none w-40 lg:w-56"
                        />
                    </div>
                </div>

                <!-- Center: nav tabs -->
                <div class="hidden md:flex items-center h-full gap-1">
                    <!-- Home -->
                    <Link
                        :href="route('dashboard')"
                        class="flex items-center justify-center w-24 lg:w-28 h-full relative group"
                        :class="route().current('dashboard') ? 'text-[#1877F2]' : 'text-[#65676B] hover:bg-[#F0F2F5]'"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                        </svg>
                        <div v-if="route().current('dashboard')" class="absolute bottom-0 left-0 right-0 h-[3px] bg-[#1877F2] rounded-full"></div>
                    </Link>

                    <!-- Watch -->
                    <a href="#" class="flex items-center justify-center w-24 lg:w-28 h-full relative text-[#65676B] hover:bg-[#F0F2F5] group">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM8 15l8-4.5L8 6v9z"/>
                        </svg>
                    </a>

                    <!-- Marketplace -->
                    <a href="#" class="flex items-center justify-center w-24 lg:w-28 h-full relative text-[#65676B] hover:bg-[#F0F2F5] group">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 17H5V8h14v12z"/>
                        </svg>
                    </a>

                    <!-- Groups -->
                    <a href="#" class="flex items-center justify-center w-24 lg:w-28 h-full relative text-[#65676B] hover:bg-[#F0F2F5] group">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                        </svg>
                    </a>

                    <!-- Gaming -->
                    <a href="#" class="flex items-center justify-center w-24 lg:w-28 h-full relative text-[#65676B] hover:bg-[#F0F2F5] group">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M15 7.5V2H9v5.5l3 3 3-3zM7.5 9H2v6h5.5l3-3-3-3zM9 16.5V22h6v-5.5l-3-3-3 3zM16.5 9l-3 3 3 3H22V9h-5.5z"/>
                        </svg>
                    </a>
                </div>

                <!-- Right: action buttons + avatar -->
                <div class="flex items-center gap-2 flex-shrink-0">
                    <!-- Apps grid -->
                    <button class="w-9 h-9 rounded-full bg-[#E4E6EB] hover:bg-[#D8DADF] flex items-center justify-center text-[#050505]">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M4 8h4V4H4zm6 12h4v-4h-4zm-6 0h4v-4H4zm0-6h4v-4H4zm6 0h4v-4h-4zm6-10v4h4V4zm-6 4h4V4h-4zm6 6h4v-4h-4zm0 6h4v-4h-4z"/>
                        </svg>
                    </button>

                    <!-- Messenger -->
                    <button class="w-9 h-9 rounded-full bg-[#E4E6EB] hover:bg-[#D8DADF] flex items-center justify-center text-[#050505]">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.914 1.354 5.52 3.484 7.25v3.507l3.184-1.75c.85.235 1.753.36 2.332.36 5.523 0 10-4.145 10-9.243S17.523 2 12 2zm1.008 12.437l-2.547-2.719-4.973 2.719 5.473-5.812 2.611 2.719 4.91-2.719-5.474 5.812z"/>
                        </svg>
                    </button>

                    <!-- Notifications bell -->
                    <button class="w-9 h-9 rounded-full bg-[#E4E6EB] hover:bg-[#D8DADF] flex items-center justify-center text-[#050505]">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
                        </svg>
                    </button>

                    <!-- User avatar + dropdown -->
                    <div class="relative flex items-center gap-1">
                        <Link :href="route('profile.edit')" class="w-9 h-9 rounded-full bg-[#1877F2] flex items-center justify-center text-white font-bold text-sm flex-shrink-0 hover:opacity-90">
                            {{ userInitial }}
                        </Link>
                        <!-- Logout dropdown trigger -->
                        <Link
                            :href="route('logout')"
                            method="post"
                            as="button"
                            class="w-5 h-5 rounded-full bg-[#E4E6EB] hover:bg-[#D8DADF] flex items-center justify-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-[#050505]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M7 10l5 5 5-5z"/>
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Page content (offset by nav height) -->
        <main class="pt-14">
            <slot />
        </main>
    </div>
</template>
