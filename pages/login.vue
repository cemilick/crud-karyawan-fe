<template>
    <div class="flex justify-center items-center h-screen bg-gray-100">
        <div class="bg-white p-8 rounded shadow-md">
            <h2 class="text-2xl font-bold mb-4">Login</h2>
            <form @submit.prevent="login">
                <div class="mb-4">
                    <label for="email" class="block text-gray-700 font-bold mb-2">Email</label>
                    <input type="email" id="email" v-model="email" class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" required>
                </div>
                <div class="mb-4">
                    <label for="password" class="block text-gray-700 font-bold mb-2">Password</label>
                    <input type="password" id="password" v-model="password" class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" required>
                </div>
                <button type="submit" class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Login</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from '~/utils/axios.tsx';
export default {
    data() {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        login() {
            // Add your login logic here
            axios.post('/api/auth/login', { email: this.email, password: this.password })
                .then(response => {
                    const token = response.data.data.access_token;
                    // Save the token to cache or local storage
                    localStorage.setItem('token', token);
                    this.$router.push('/');
                    // Redirect to another page or perform any other action
                })
                .catch(error => {
                    // Handle login error
                    console.error(error);
                });
        }
    }
};
</script>

<style>
/* Add your custom styles here */
</style>