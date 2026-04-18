<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import DeleteUserForm from './Partials/DeleteUserForm.vue';
import UpdatePasswordForm from './Partials/UpdatePasswordForm.vue';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm.vue';
import { Head, usePage } from '@inertiajs/vue3';
import { ref, computed } from 'vue';

defineProps({
    mustVerifyEmail: { type: Boolean },
    status: { type: String },
});

const page = usePage();
const user = computed(() => page.props.auth.user);
const userName = computed(() => user.value?.name ?? 'User');
const userInitial = computed(() => userName.value.charAt(0).toUpperCase());

const activeTab = ref('posts');
const showEditModal = ref(false);

const tabs = ['Posts', 'About', 'Friends', 'Photos', 'Videos', 'More'];

const photoPosts = [
    { id: 1, color: 'from-blue-400 to-indigo-600' },
    { id: 2, color: 'from-green-400 to-teal-600' },
    { id: 3, color: 'from-pink-400 to-rose-600' },
    { id: 4, color: 'from-yellow-400 to-orange-500' },
    { id: 5, color: 'from-purple-400 to-pink-500' },
    { id: 6, color: 'from-cyan-400 to-blue-500' },
];
</script>

<template>
    <Head title="Profile" />

    <AuthenticatedLayout>
        <div class="bg-[#F0F2F5] min-h-screen">

            <!-- Profile card (cover + info + tabs) -->
            <div class="bg-white shadow">
                <div class="max-w-[1090px] mx-auto">

                    <!-- Cover photo -->
                    <div class="relative h-[350px] bg-gradient-to-b from-gray-300 to-gray-400 rounded-b-lg overflow-hidden">
                        <div class="absolute inset-0 flex items-center justify-center">
                            <div class="w-full h-full bg-gradient-to-br from-slate-300 via-slate-400 to-slate-500"></div>
                        </div>
                        <div class="absolute bottom-4 right-4">
                            <button class="flex items-center gap-2 bg-white hover:bg-[#F0F2F5] text-[#050505] font-semibold text-sm px-4 py-2 rounded-lg shadow">
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 15.2A3.2 3.2 0 0 1 8.8 12 3.2 3.2 0 0 1 12 8.8 3.2 3.2 0 0 1 15.2 12 3.2 3.2 0 0 1 12 15.2M18.5 1H5.5A2.5 2.5 0 0 0 3 3.5V16.5A2.5 2.5 0 0 0 5.5 19H18.5A2.5 2.5 0 0 0 21 16.5V3.5A2.5 2.5 0 0 0 18.5 1M12 17a5 5 0 0 1-5-5 5 5 0 0 1 5-5 5 5 0 0 1 5 5 5 5 0 0 1-5 5Z"/></svg>
                                Edit cover photo
                            </button>
                        </div>
                    </div>

                    <!-- Profile info section -->
                    <div class="px-4 pb-0 relative">
                        <div class="flex flex-col sm:flex-row sm:items-end gap-4 -mt-[72px] pb-4">
                            <!-- Avatar -->
                            <div class="w-[168px] h-[168px] rounded-full border-4 border-white bg-[#1877F2] flex items-center justify-center text-white font-bold text-6xl flex-shrink-0 shadow-md">
                                {{ userInitial }}
                            </div>

                            <!-- Name + actions -->
                            <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between flex-1 pb-2">
                                <div>
                                    <h1 class="text-[28px] font-bold text-[#050505] leading-tight">{{ userName }}</h1>
                                    <p class="text-[#65676B] font-semibold text-sm mt-0.5">243 friends</p>
                                    <!-- Friend avatars row -->
                                    <div class="flex -space-x-2 mt-2">
                                        <div v-for="i in 6" :key="i" class="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                                            :class="['bg-blue-500','bg-pink-500','bg-green-500','bg-yellow-500','bg-purple-500','bg-red-500'][i-1]">
                                            {{ ['A','M','J','S','C','R'][i-1] }}
                                        </div>
                                    </div>
                                </div>

                                <!-- Action buttons -->
                                <div class="flex items-center gap-2 mt-3 sm:mt-0">
                                    <button class="flex items-center gap-2 bg-[#1877F2] hover:bg-[#166FE5] text-white font-semibold text-sm px-4 py-2 rounded-lg">
                                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 13H13v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                                        Add to story
                                    </button>
                                    <button @click="showEditModal = true" class="flex items-center gap-2 bg-[#E4E6EB] hover:bg-[#D8DADF] text-[#050505] font-semibold text-sm px-4 py-2 rounded-lg">
                                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                                        Edit profile
                                    </button>
                                    <button class="flex items-center justify-center bg-[#E4E6EB] hover:bg-[#D8DADF] text-[#050505] font-semibold text-sm w-10 h-9 rounded-lg">
                                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Tabs -->
                        <div class="border-t border-[#CED0D4] flex items-center gap-1 overflow-x-auto">
                            <button
                                v-for="tab in tabs"
                                :key="tab"
                                @click="activeTab = tab.toLowerCase()"
                                class="px-4 py-3 text-sm font-semibold relative flex-shrink-0 transition-colors"
                                :class="activeTab === tab.toLowerCase()
                                    ? 'text-[#1877F2] border-b-[3px] border-[#1877F2]'
                                    : 'text-[#65676B] hover:bg-[#F0F2F5] rounded-lg'"
                            >
                                {{ tab }}
                                <span v-if="tab === 'More'" class="ml-1">▾</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Profile content area -->
            <div class="max-w-[1090px] mx-auto px-4 py-4">
                <div class="flex flex-col lg:flex-row gap-4">

                    <!-- Left column: Intro + Photos -->
                    <div class="w-full lg:w-[360px] flex-shrink-0 flex flex-col gap-4">

                        <!-- Intro card -->
                        <div class="bg-white rounded-lg shadow p-4">
                            <h2 class="font-bold text-xl text-[#050505] mb-3">Intro</h2>
                            <div class="flex flex-col gap-3 text-sm text-[#050505]">
                                <div class="flex items-center gap-2">
                                    <svg class="w-5 h-5 text-[#65676B] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/></svg>
                                    <span class="text-[#65676B]">Studied at <span class="font-semibold text-[#050505]">State University</span></span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <svg class="w-5 h-5 text-[#65676B] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                                    <span class="text-[#65676B]">Lives in <span class="font-semibold text-[#050505]">San Francisco, CA</span></span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <svg class="w-5 h-5 text-[#65676B] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
                                    <span class="text-[#65676B]">From <span class="font-semibold text-[#050505]">Austin, TX</span></span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <svg class="w-5 h-5 text-[#65676B] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                                    <span class="text-[#65676B]">{{ user?.email }}</span>
                                </div>
                            </div>
                            <button @click="showEditModal = true" class="w-full mt-4 bg-[#E4E6EB] hover:bg-[#D8DADF] text-[#050505] font-semibold text-sm py-2 rounded-lg">
                                Edit details
                            </button>
                            <button class="w-full mt-2 bg-[#E4E6EB] hover:bg-[#D8DADF] text-[#050505] font-semibold text-sm py-2 rounded-lg">
                                Add featured
                            </button>
                        </div>

                        <!-- Photos card -->
                        <div class="bg-white rounded-lg shadow p-4">
                            <div class="flex items-center justify-between mb-3">
                                <h2 class="font-bold text-xl text-[#050505]">Photos</h2>
                                <a href="#" class="text-[#1877F2] text-sm font-semibold hover:underline">See all photos</a>
                            </div>
                            <div class="grid grid-cols-3 gap-1">
                                <div
                                    v-for="photo in photoPosts"
                                    :key="photo.id"
                                    class="aspect-square rounded-md bg-gradient-to-br cursor-pointer hover:opacity-90 transition-opacity"
                                    :class="photo.color"
                                ></div>
                            </div>
                        </div>
                    </div>

                    <!-- Right column: Post box + Posts -->
                    <div class="flex-1 flex flex-col gap-4">

                        <!-- Create post box -->
                        <div class="bg-white rounded-lg shadow p-3">
                            <div class="flex items-center gap-2">
                                <div class="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                    {{ userInitial }}
                                </div>
                                <div class="flex-1 bg-[#F0F2F5] hover:bg-[#E4E6EB] rounded-full px-4 py-2 cursor-text text-[#65676B] text-base">
                                    What's on your mind?
                                </div>
                            </div>
                            <div class="border-t border-[#CED0D4] mt-3 pt-2 flex items-center justify-around">
                                <button class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#F0F2F5] flex-1 justify-center">
                                    <svg class="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>
                                    <span class="text-xs font-semibold text-[#65676B] hidden sm:block">Live video</span>
                                </button>
                                <button class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#F0F2F5] flex-1 justify-center">
                                    <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
                                    <span class="text-xs font-semibold text-[#65676B] hidden sm:block">Photo/video</span>
                                </button>
                                <button class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#F0F2F5] flex-1 justify-center">
                                    <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/></svg>
                                    <span class="text-xs font-semibold text-[#65676B] hidden sm:block">Feeling/activity</span>
                                </button>
                            </div>
                        </div>

                        <!-- Sample post -->
                        <div class="bg-white rounded-lg shadow">
                            <div class="flex items-center gap-2 px-4 pt-3 pb-2">
                                <div class="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                    {{ userInitial }}
                                </div>
                                <div>
                                    <p class="font-semibold text-sm text-[#050505]">{{ userName }}</p>
                                    <span class="text-xs text-[#65676B]">Just now · 🌐</span>
                                </div>
                            </div>
                            <div class="px-4 pb-3">
                                <p class="text-sm text-[#050505]">Welcome to my Facebook profile! Feel free to connect with me. 😊</p>
                            </div>
                            <div class="flex items-center justify-between px-4 py-2 text-xs text-[#65676B]">
                                <span>0 likes</span>
                                <span>0 comments · 0 shares</span>
                            </div>
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
                </div>
            </div>

            <!-- Edit Profile Modal -->
            <div v-if="showEditModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div class="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 overflow-y-auto max-h-[90vh]">
                    <div class="flex items-center justify-between px-4 py-3 border-b border-[#CED0D4]">
                        <h2 class="font-bold text-xl text-[#050505]">Edit profile</h2>
                        <button @click="showEditModal = false" class="w-9 h-9 rounded-full bg-[#E4E6EB] hover:bg-[#D8DADF] flex items-center justify-center text-[#050505]">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                        </button>
                    </div>
                    <div class="p-4 space-y-4">
                        <UpdateProfileInformationForm :must-verify-email="mustVerifyEmail" :status="status" />
                        <div class="border-t border-[#CED0D4] pt-4">
                            <UpdatePasswordForm />
                        </div>
                        <div class="border-t border-[#CED0D4] pt-4">
                            <DeleteUserForm />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </AuthenticatedLayout>
</template>
