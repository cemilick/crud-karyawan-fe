<template>
    <header class="bg-gray-800 text-white py-4 px-6">
        <div class="container mx-auto flex justify-between items-center">
            <h1 class="text-2xl font-bold">My App</h1>
            <nav>
                <ul class="flex space-x-4">
                    <li><nuxt-link to="/">Dashboard</nuxt-link></li>
                    <li><nuxt-link to="/karyawan">Data Karyawan</nuxt-link></li>
                    <li><button @click="logout">Logout</button></li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<script>
import axios from '~/utils/axios.tsx';
export default {
    name: 'Header',
    methods: {
        logout() {
            axios.post('/api/auth/logout')
                .then(() => {
                    localStorage.removeItem('token');
                    this.$router.push('/login');
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }
}
</script>

<style>
/* Add your custom styles here */
</style>