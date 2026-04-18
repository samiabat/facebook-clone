<script setup>
import GuestLayout from '@/Layouts/GuestLayout.vue';
import InputError from '@/Components/InputError.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';

defineProps({
    canResetPassword: { type: Boolean },
    status: { type: String },
});

const form = useForm({
    email: '',
    password: '',
    remember: false,
});

const submit = () => {
    form.post(route('login'), {
        onFinish: () => form.reset('password'),
    });
};
</script>

<template>
    <GuestLayout>
        <Head title="Facebook - Log in or sign up" />

        <div class="min-h-screen bg-[#F0F2F5] flex flex-col items-center justify-center px-4 py-8">
            <!-- Two-column layout -->
            <div class="flex flex-col lg:flex-row items-center justify-center gap-8 w-full max-w-[980px]">

                <!-- Left column: wordmark + tagline -->
                <div class="flex flex-col lg:pb-10 text-center lg:text-left lg:flex-1">
                    <span class="text-[#1877F2] text-6xl font-bold leading-none mb-4" style="font-family: Georgia, 'Times New Roman', serif;">
                        facebook
                    </span>
                    <p class="text-xl leading-6 max-w-[400px]">
                        Facebook helps you connect and share with the people in your life.
                    </p>
                </div>

                <!-- Right column: login card -->
                <div class="w-full max-w-[396px] flex flex-col gap-4">
                    <div class="bg-white rounded-lg shadow-md p-4">

                        <div v-if="status" class="mb-3 text-sm text-green-600 font-medium">
                            {{ status }}
                        </div>

                        <form @submit.prevent="submit" class="flex flex-col gap-3">
                            <div>
                                <input
                                    id="email"
                                    v-model="form.email"
                                    type="email"
                                    placeholder="Email address or phone number"
                                    required
                                    autofocus
                                    autocomplete="username"
                                    class="w-full border border-[#CED0D4] rounded-md px-4 py-3 text-base text-[#050505] placeholder-[#65676B] focus:outline-none focus:border-[#1877F2] focus:ring-1 focus:ring-[#1877F2]"
                                />
                                <InputError class="mt-1 text-xs" :message="form.errors.email" />
                            </div>

                            <div>
                                <input
                                    id="password"
                                    v-model="form.password"
                                    type="password"
                                    placeholder="Password"
                                    required
                                    autocomplete="current-password"
                                    class="w-full border border-[#CED0D4] rounded-md px-4 py-3 text-base text-[#050505] placeholder-[#65676B] focus:outline-none focus:border-[#1877F2] focus:ring-1 focus:ring-[#1877F2]"
                                />
                                <InputError class="mt-1 text-xs" :message="form.errors.password" />
                            </div>

                            <button
                                type="submit"
                                :disabled="form.processing"
                                class="w-full bg-[#1877F2] hover:bg-[#166FE5] text-white font-bold text-xl py-3 rounded-md transition-colors disabled:opacity-60"
                            >
                                Log in
                            </button>
                        </form>

                        <div class="text-center mt-3">
                            <Link
                                v-if="canResetPassword"
                                :href="route('password.request')"
                                class="text-[#1877F2] text-sm hover:underline"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <div class="flex items-center gap-2 my-4">
                            <div class="flex-1 h-px bg-[#CED0D4]"></div>
                            <div class="flex-1 h-px bg-[#CED0D4]"></div>
                        </div>

                        <div class="flex justify-center">
                            <Link
                                :href="route('register')"
                                class="bg-[#42B72A] hover:bg-[#36A420] text-white font-bold text-base px-5 py-3 rounded-md transition-colors"
                            >
                                Create new account
                            </Link>
                        </div>
                    </div>

                    <p class="text-center text-sm text-[#050505]">
                        <a href="#" class="font-bold hover:underline">Create a Page</a>
                        for a celebrity, band or business.
                    </p>
                </div>
            </div>
        </div>
    </GuestLayout>
</template>
