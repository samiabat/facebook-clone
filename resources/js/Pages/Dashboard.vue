<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';

const page = usePage();
const user = computed(() => page.props.auth.user);
const userName = computed(() => user.value?.name ?? 'User');
const userInitial = computed(() => userName.value.charAt(0).toUpperCase());

const stories = [
    { name: 'Alex', color: 'from-purple-500 to-pink-500' },
    { name: 'Maria', color: 'from-blue-500 to-cyan-400' },
    { name: 'James', color: 'from-yellow-400 to-orange-500' },
    { name: 'Sofia', color: 'from-green-400 to-teal-500' },
];

const posts = [
    {
        id: 1,
        author: 'Alex Johnson',
        time: '2 hours ago',
        privacy: 'Friends',
        content: 'Just had the most amazing hiking trip this weekend! The views from the summit were absolutely breathtaking. 🏔️ Highly recommend it to everyone who loves the outdoors!',
        likes: 47,
        comments: 12,
        shares: 5,
    },
    {
        id: 2,
        author: 'Maria Garcia',
        time: 'Yesterday at 3:24 PM',
        privacy: 'Public',
        content: 'Feeling grateful for all the wonderful people in my life. ❤️',
        bgColor: 'bg-gradient-to-br from-pink-400 to-rose-600',
        isStatus: true,
        likes: 132,
        comments: 28,
        shares: 3,
    },
    {
        id: 3,
        author: 'James Williams',
        time: '3 days ago',
        privacy: 'Public',
        content: 'Finally finished reading "The Mountain Beyond Mountains" — what an incredible story of dedication and compassion. Highly recommend to anyone looking for an inspiring read. 📚',
        likes: 23,
        comments: 7,
        shares: 2,
    },
];

const contacts = [
    { name: 'Alex Johnson', initial: 'A', color: 'bg-purple-500' },
    { name: 'Maria Garcia', initial: 'M', color: 'bg-pink-500' },
    { name: 'James Williams', initial: 'J', color: 'bg-blue-500' },
    { name: 'Sofia Martinez', initial: 'S', color: 'bg-green-500' },
    { name: 'Chris Lee', initial: 'C', color: 'bg-yellow-500' },
];

const leftNavItems = [
    { label: 'Friends', icon: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z', color: 'text-[#1877F2]' },
    { label: 'Memories', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z', color: 'text-[#1877F2]' },
    { label: 'Saved', icon: 'M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z', color: 'text-[#1877F2]' },
    { label: 'Groups', icon: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z', color: 'text-[#1877F2]' },
    { label: 'Marketplace', icon: 'M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z', color: 'text-[#1877F2]' },
    { label: 'Watch', icon: 'M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM8 15l8-4.5L8 6v9z', color: 'text-[#1877F2]' },
    { label: 'Events', icon: 'M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z', color: 'text-[#1877F2]' },
];
</script>

<template>
    <Head title="Facebook" />

    <AuthenticatedLayout>
        <div class="flex gap-0 min-h-screen bg-[#F0F2F5]">

            <!-- Left sidebar -->
            <aside class="hidden lg:flex flex-col w-[360px] flex-shrink-0 px-2 py-4 overflow-y-auto fixed left-0 top-14 bottom-0">
                <!-- User profile link -->
                <a href="#" class="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-[#F2F2F2] mb-1">
                    <div class="w-9 h-9 rounded-full bg-[#1877F2] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {{ userInitial }}
                    </div>
                    <span class="font-semibold text-[#050505]">{{ userName }}</span>
                </a>

                <!-- Nav items -->
                <nav class="flex flex-col gap-0.5">
                    <a
                        v-for="item in leftNavItems"
                        :key="item.label"
                        href="#"
                        class="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-[#F2F2F2] text-[#050505]"
                    >
                        <div class="w-9 h-9 rounded-full bg-[#E4E6EB] flex items-center justify-center flex-shrink-0">
                            <svg class="w-5 h-5" :class="item.color" fill="currentColor" viewBox="0 0 24 24">
                                <path :d="item.icon"/>
                            </svg>
                        </div>
                        <span class="font-medium text-sm">{{ item.label }}</span>
                    </a>
                </nav>

                <div class="my-2 border-t border-[#CED0D4]"></div>

                <!-- Shortcuts -->
                <p class="px-2 text-[#65676B] font-bold text-base mb-2">Your shortcuts</p>
                <a href="#" class="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-[#F2F2F2]">
                    <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-400 to-indigo-600 flex-shrink-0"></div>
                    <span class="font-medium text-sm text-[#050505]">Photography Club</span>
                </a>
                <a href="#" class="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-[#F2F2F2]">
                    <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-green-400 to-teal-600 flex-shrink-0"></div>
                    <span class="font-medium text-sm text-[#050505]">Hiking Enthusiasts</span>
                </a>

                <!-- Footer -->
                <div class="mt-auto pt-4 px-2">
                    <p class="text-[#65676B] text-xs leading-5">
                        Privacy · Terms · Advertising · Ad Choices · Cookies · More · Meta © 2024
                    </p>
                </div>
            </aside>

            <!-- Center feed -->
            <main class="flex-1 flex flex-col items-center lg:ml-[360px] xl:mr-[360px] px-4 py-4 max-w-full">
                <div class="w-full max-w-[590px]">

                    <!-- Stories row -->
                    <div class="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
                        <!-- Create story card -->
                        <div class="flex-shrink-0 w-[116px] h-[200px] rounded-xl overflow-hidden relative cursor-pointer shadow bg-white">
                            <div class="h-[140px] bg-[#E4E6EB] flex items-center justify-center">
                                <div class="w-9 h-9 rounded-full bg-[#1877F2] flex items-center justify-center text-white font-bold text-sm">
                                    {{ userInitial }}
                                </div>
                            </div>
                            <div class="h-[60px] flex flex-col items-center justify-center bg-white">
                                <div class="w-8 h-8 rounded-full bg-[#1877F2] flex items-center justify-center -mt-5 border-2 border-white">
                                    <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19 13H13v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                                </div>
                                <span class="text-xs font-semibold text-[#050505] mt-1">Create Story</span>
                            </div>
                        </div>

                        <!-- Story cards -->
                        <div
                            v-for="story in stories"
                            :key="story.name"
                            class="flex-shrink-0 w-[116px] h-[200px] rounded-xl overflow-hidden relative cursor-pointer shadow"
                        >
                            <div class="w-full h-full bg-gradient-to-b" :class="story.color">
                                <div class="absolute top-3 left-3 w-10 h-10 rounded-full border-4 border-[#1877F2] bg-white overflow-hidden flex items-center justify-center font-bold text-[#1877F2]">
                                    {{ story.name.charAt(0) }}
                                </div>
                                <div class="absolute bottom-3 left-3 text-white font-semibold text-sm">
                                    {{ story.name }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Create post box -->
                    <div class="bg-white rounded-lg shadow mb-4 p-3">
                        <div class="flex items-center gap-2 mb-3">
                            <div class="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                {{ userInitial }}
                            </div>
                            <div class="flex-1 bg-[#F0F2F5] hover:bg-[#E4E6EB] rounded-full px-4 py-2 cursor-text text-[#65676B] text-base">
                                What's on your mind, {{ userName.split(' ')[0] }}?
                            </div>
                        </div>
                        <div class="border-t border-[#CED0D4] pt-2 flex items-center justify-around">
                            <button class="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[#F0F2F5] flex-1 justify-center">
                                <svg class="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>
                                <span class="text-sm font-semibold text-[#65676B] hidden sm:block">Live video</span>
                            </button>
                            <button class="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[#F0F2F5] flex-1 justify-center">
                                <svg class="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
                                <span class="text-sm font-semibold text-[#65676B] hidden sm:block">Photo/video</span>
                            </button>
                            <button class="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[#F0F2F5] flex-1 justify-center">
                                <svg class="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/></svg>
                                <span class="text-sm font-semibold text-[#65676B] hidden sm:block">Feeling/activity</span>
                            </button>
                        </div>
                    </div>

                    <!-- Posts -->
                    <div v-for="post in posts" :key="post.id" class="bg-white rounded-lg shadow mb-4">
                        <!-- Post header -->
                        <div class="flex items-center justify-between px-4 pt-3 pb-2">
                            <div class="flex items-center gap-2">
                                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                    {{ post.author.charAt(0) }}
                                </div>
                                <div>
                                    <p class="font-semibold text-sm text-[#050505]">{{ post.author }}</p>
                                    <div class="flex items-center gap-1">
                                        <span class="text-xs text-[#65676B]">{{ post.time }}</span>
                                        <span class="text-[#65676B]">·</span>
                                        <!-- Globe icon -->
                                        <svg class="w-3 h-3 text-[#65676B]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                                    </div>
                                </div>
                            </div>
                            <button class="w-8 h-8 rounded-full hover:bg-[#F0F2F5] flex items-center justify-center">
                                <svg class="w-5 h-5 text-[#65676B]" fill="currentColor" viewBox="0 0 24 24"><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
                            </button>
                        </div>

                        <!-- Post body -->
                        <div
                            v-if="post.isStatus"
                            class="mx-0 h-56 flex items-center justify-center"
                            :class="post.bgColor"
                        >
                            <p class="text-white text-2xl font-bold text-center px-8">{{ post.content }}</p>
                        </div>
                        <div v-else class="px-4 pb-3">
                            <p class="text-[#050505] text-sm leading-5">{{ post.content }}</p>
                        </div>

                        <!-- Likes/comments count -->
                        <div class="flex items-center justify-between px-4 py-2 text-xs text-[#65676B]">
                            <div class="flex items-center gap-1">
                                <div class="flex -space-x-1">
                                    <div class="w-4 h-4 rounded-full bg-[#1877F2] flex items-center justify-center">
                                        <span class="text-white" style="font-size:9px">👍</span>
                                    </div>
                                    <div class="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
                                        <span style="font-size:9px">❤️</span>
                                    </div>
                                </div>
                                <span>{{ post.likes }}</span>
                            </div>
                            <div class="flex gap-3">
                                <span>{{ post.comments }} comments</span>
                                <span>{{ post.shares }} shares</span>
                            </div>
                        </div>

                        <!-- Action buttons -->
                        <div class="border-t border-[#CED0D4] mx-4"></div>
                        <div class="flex items-center px-2 py-1">
                            <button class="flex items-center justify-center gap-1.5 flex-1 py-2 rounded-lg hover:bg-[#F0F2F5] text-[#65676B] font-semibold text-sm">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017a2 2 0 01-1.789-1.106L7 13H4a2 2 0 01-2-2V7a2 2 0 012-2h3.5"/></svg>
                                Like
                            </button>
                            <button class="flex items-center justify-center gap-1.5 flex-1 py-2 rounded-lg hover:bg-[#F0F2F5] text-[#65676B] font-semibold text-sm">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                                Comment
                            </button>
                            <button class="flex items-center justify-center gap-1.5 flex-1 py-2 rounded-lg hover:bg-[#F0F2F5] text-[#65676B] font-semibold text-sm">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
                                Share
                            </button>
                        </div>
                    </div>

                </div>
            </main>

            <!-- Right sidebar -->
            <aside class="hidden xl:flex flex-col w-[360px] flex-shrink-0 px-2 py-4 fixed right-0 top-14 bottom-0 overflow-y-auto">

                <!-- Sponsored -->
                <div class="mb-4">
                    <p class="font-bold text-[#65676B] text-base mb-2 px-2">Sponsored</p>
                    <div class="flex gap-3 px-2 py-2 rounded-lg hover:bg-[#F2F2F2] cursor-pointer">
                        <div class="w-28 h-28 rounded-lg bg-gradient-to-br from-orange-300 to-pink-400 flex-shrink-0"></div>
                        <div>
                            <p class="text-sm text-[#050505]">Discover amazing deals on our new collection!</p>
                            <p class="text-xs text-[#65676B] mt-1">shopexample.com</p>
                        </div>
                    </div>
                </div>

                <div class="border-t border-[#CED0D4] mb-4"></div>

                <!-- Birthdays -->
                <div class="mb-4 px-2">
                    <p class="font-bold text-[#65676B] text-base mb-2">Birthdays</p>
                    <div class="flex items-center gap-3">
                        <svg class="w-9 h-9 text-[#1877F2] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 6c1.11 0 2-.9 2-2 0-.38-.1-.73-.29-1.03L12 0l-1.71 2.97C10.1 3.27 10 3.62 10 4c0 1.1.89 2 2 2zm4.6 9.99l-1.07-1.07-1.08 1.07c-1.3 1.3-3.58 1.31-4.89 0l-1.07-1.07-1.09 1.07C6.75 16.64 5.88 17 4.96 17c-.73 0-1.4-.23-1.96-.61V20c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-3.61c-.56.38-1.23.61-1.96.61-.92 0-1.79-.36-2.44-1.01zM18 9H6c-1.66 0-3 1.34-3 3v.56c0 1.1.89 2.44 2.96 2.44 1 0 1.98-.39 2.69-1.1l1.07-1.07 1.07 1.07c.7.7 1.64 1.1 2.65 1.1 1 0 1.94-.39 2.65-1.1l1.07-1.07 1.07 1.07C19.01 14.61 20 15 21.04 15 22.89 15 24 13.56 24 12.56V12c0-1.66-1.34-3-3-3h-3z"/></svg>
                        <p class="text-sm text-[#050505]"><span class="font-semibold">Sofia Martinez</span> and <span class="font-semibold">2 others</span> have birthdays today.</p>
                    </div>
                </div>

                <div class="border-t border-[#CED0D4] mb-4"></div>

                <!-- Contacts -->
                <div class="px-2">
                    <div class="flex items-center justify-between mb-2">
                        <p class="font-bold text-[#65676B] text-base">Contacts</p>
                        <div class="flex gap-2">
                            <button class="w-8 h-8 rounded-full hover:bg-[#F0F2F5] flex items-center justify-center">
                                <svg class="w-4 h-4 text-[#65676B]" fill="currentColor" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
                            </button>
                        </div>
                    </div>
                    <div
                        v-for="contact in contacts"
                        :key="contact.name"
                        class="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-[#F2F2F2] cursor-pointer"
                    >
                        <div class="relative flex-shrink-0">
                            <div class="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm" :class="contact.color">
                                {{ contact.initial }}
                            </div>
                            <div class="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white"></div>
                        </div>
                        <span class="text-sm font-medium text-[#050505]">{{ contact.name }}</span>
                    </div>
                </div>

                <!-- Footer -->
                <div class="mt-auto pt-4 px-2">
                    <p class="text-[#65676B] text-xs leading-5">
                        Privacy · Terms · Advertising · Ad Choices · Cookies · More · Meta © 2024
                    </p>
                </div>
            </aside>
        </div>
    </AuthenticatedLayout>
</template>
