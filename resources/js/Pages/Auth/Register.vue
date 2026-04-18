<script setup>
import GuestLayout from '@/Layouts/GuestLayout.vue';
import InputError from '@/Components/InputError.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';

const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
});

const submit = () => {
    form.post(route('register'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
    });
};

const months = [
    'Jan','Feb','Mar','Apr','May','Jun',
    'Jul','Aug','Sep','Oct','Nov','Dec',
];
const days = Array.from({ length: 31 }, (_, i) => i + 1);
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
</script>

<template>
    <GuestLayout>
        <Head title="Facebook - Create a new account" />

        <div class="min-h-screen bg-[#F0F2F5] flex items-center justify-center px-4 py-8">
            <div class="w-full max-w-[432px] bg-white rounded-lg shadow-xl overflow-hidden">
                <!-- Header -->
                <div class="px-4 pt-5 pb-3 border-b border-[#CED0D4]">
                    <h1 class="text-2xl font-bold text-[#050505]">Create a new account</h1>
                    <p class="text-[#65676B] text-sm mt-0.5">It's quick and easy.</p>
                </div>

                <!-- Form body -->
                <form @submit.prevent="submit" class="px-4 pt-3 pb-4 flex flex-col gap-3">

                    <!-- Full name -->
                    <div>
                        <input
                            id="name"
                            v-model="form.name"
                            type="text"
                            placeholder="Full name"
                            required
                            autofocus
                            autocomplete="name"
                            class="w-full border border-[#CED0D4] bg-[#F5F6F7] rounded-md px-3 py-2 text-sm text-[#050505] placeholder-[#65676B] focus:outline-none focus:border-[#1877F2] focus:ring-1 focus:ring-[#1877F2]"
                        />
                        <InputError class="mt-1 text-xs" :message="form.errors.name" />
                    </div>

                    <!-- Email -->
                    <div>
                        <input
                            id="email"
                            v-model="form.email"
                            type="email"
                            placeholder="Mobile number or email address"
                            required
                            autocomplete="username"
                            class="w-full border border-[#CED0D4] bg-[#F5F6F7] rounded-md px-3 py-2 text-sm text-[#050505] placeholder-[#65676B] focus:outline-none focus:border-[#1877F2] focus:ring-1 focus:ring-[#1877F2]"
                        />
                        <InputError class="mt-1 text-xs" :message="form.errors.email" />
                    </div>

                    <!-- Password -->
                    <div>
                        <input
                            id="password"
                            v-model="form.password"
                            type="password"
                            placeholder="New password"
                            required
                            autocomplete="new-password"
                            class="w-full border border-[#CED0D4] bg-[#F5F6F7] rounded-md px-3 py-2 text-sm text-[#050505] placeholder-[#65676B] focus:outline-none focus:border-[#1877F2] focus:ring-1 focus:ring-[#1877F2]"
                        />
                        <InputError class="mt-1 text-xs" :message="form.errors.password" />
                    </div>

                    <!-- Confirm password -->
                    <div>
                        <input
                            id="password_confirmation"
                            v-model="form.password_confirmation"
                            type="password"
                            placeholder="Confirm password"
                            required
                            autocomplete="new-password"
                            class="w-full border border-[#CED0D4] bg-[#F5F6F7] rounded-md px-3 py-2 text-sm text-[#050505] placeholder-[#65676B] focus:outline-none focus:border-[#1877F2] focus:ring-1 focus:ring-[#1877F2]"
                        />
                        <InputError class="mt-1 text-xs" :message="form.errors.password_confirmation" />
                    </div>

                    <!-- Birthday -->
                    <div>
                        <p class="text-xs text-[#65676B] mb-1">
                            Birthday
                            <span class="ml-1 text-[#1877F2] cursor-pointer hover:underline">Why do I need to provide my date of birth?</span>
                        </p>
                        <div class="flex gap-2">
                            <select class="flex-1 border border-[#CED0D4] bg-[#F5F6F7] rounded-md px-2 py-2 text-sm text-[#050505] focus:outline-none focus:border-[#1877F2]">
                                <option value="" disabled selected>Month</option>
                                <option v-for="(m, i) in months" :key="i" :value="i + 1">{{ m }}</option>
                            </select>
                            <select class="flex-1 border border-[#CED0D4] bg-[#F5F6F7] rounded-md px-2 py-2 text-sm text-[#050505] focus:outline-none focus:border-[#1877F2]">
                                <option value="" disabled selected>Day</option>
                                <option v-for="d in days" :key="d" :value="d">{{ d }}</option>
                            </select>
                            <select class="flex-1 border border-[#CED0D4] bg-[#F5F6F7] rounded-md px-2 py-2 text-sm text-[#050505] focus:outline-none focus:border-[#1877F2]">
                                <option value="" disabled selected>Year</option>
                                <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
                            </select>
                        </div>
                    </div>

                    <!-- Gender -->
                    <div>
                        <p class="text-xs text-[#65676B] mb-1">Gender</p>
                        <div class="flex gap-2">
                            <label class="flex-1 flex items-center justify-between border border-[#CED0D4] bg-[#F5F6F7] rounded-md px-3 py-2 text-sm text-[#050505] cursor-pointer">
                                Female
                                <input type="radio" name="gender" value="female" class="ml-2 text-[#1877F2]" />
                            </label>
                            <label class="flex-1 flex items-center justify-between border border-[#CED0D4] bg-[#F5F6F7] rounded-md px-3 py-2 text-sm text-[#050505] cursor-pointer">
                                Male
                                <input type="radio" name="gender" value="male" class="ml-2 text-[#1877F2]" />
                            </label>
                            <label class="flex-1 flex items-center justify-between border border-[#CED0D4] bg-[#F5F6F7] rounded-md px-3 py-2 text-sm text-[#050505] cursor-pointer">
                                Custom
                                <input type="radio" name="gender" value="custom" class="ml-2 text-[#1877F2]" />
                            </label>
                        </div>
                    </div>

                    <!-- Terms -->
                    <p class="text-[11px] text-[#65676B] leading-4">
                        By clicking Sign Up, you agree to our
                        <a href="#" class="text-[#1877F2] hover:underline">Terms</a>,
                        <a href="#" class="text-[#1877F2] hover:underline">Privacy Policy</a> and
                        <a href="#" class="text-[#1877F2] hover:underline">Cookies Policy</a>.
                        You may receive SMS notifications from us and can opt out at any time.
                    </p>

                    <!-- Submit -->
                    <div class="flex justify-center mt-1">
                        <button
                            type="submit"
                            :disabled="form.processing"
                            class="bg-[#42B72A] hover:bg-[#36A420] text-white font-bold text-base px-12 py-2 rounded-md transition-colors disabled:opacity-60"
                        >
                            Sign Up
                        </button>
                    </div>

                    <!-- Login link -->
                    <p class="text-center text-sm text-[#050505]">
                        Already have an account?
                        <Link :href="route('login')" class="font-bold text-[#1877F2] hover:underline">
                            Log in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    </GuestLayout>
</template>
