<template>
    <base-layout>
        <div class="p-4">
            <table class="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th class="py-2 px-4 border-b">ID</th>
                        <th class="py-2 px-4 border-b">Name</th>
                        <th class="py-2 px-4 border-b">Email</th>
                        <th class="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody class="text-center">
                    <tr v-for="employee in employees" :key="employee?.id">
                        <td class="py-2 px-4 border-b">{{ employee?.id }}</td>
                        <td class="py-2 px-4 border-b">{{ employee?.name }}</td>
                        <td class="py-2 px-4 border-b">{{ employee?.email }}</td>
                        <td class="py-2 px-4 border-b">
                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                                Edit
                            </button>
                            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="flex justify-center mt-4">
            <button 
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" 
                :class="{ 'bg-gray-500 hover:bg-gray-500': currentPage === 1 }" 
                @click="previousPage" 
                :disabled="currentPage === 1"
            >
                Previous
            </button>
            <div class="flex items-center">
                <ul class="flex">
                    <li v-for="page in totalPages" :key="page">
                        <button 
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" 
                            :class="{ 'bg-gray-500 hover:bg-gray-500': currentPage === page }" 
                            @click="goToPage(page)"
                        >
                            {{ page }}
                        </button>
                    </li>
                </ul>
            </div>
            <button 
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                :class="{ 'bg-gray-500 hover:bg-gray-500': currentPage === totalPages }" 
                @click="nextPage" 
                :disabled="currentPage === totalPages"
            >
                Next
            </button>
        </div>
    </base-layout>
</template>

<script>
import axios from '~/utils/axios.tsx';
import BaseLayout from '~/components/layout/BaseLayout.vue';

export default {
    components: { BaseLayout },
    data() {
        return {
            employees: [],
            currentPage: 1,
            totalPages: 0,
        };
    },
    mounted() {
        const token = localStorage.getItem('token');
        if (!token) {
            this.$router.push('/login'); // Replace '/login' with your login page route
        } else {
            this.fetchEmployees();
        }
    },
    methods: {
        fetchEmployees() {
            axios.get('/api/karyawan?page=' + this.currentPage)
                .then(response => {
                    const data = response.data.data;
                    this.employees = data.data;
                    this.currentPage = data.current_page;
                    this.totalPages = data.last_page;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        nextPage() {
            this.currentPage++;
            this.fetchEmployees();
        },
        previousPage() {
            this.currentPage--;
            this.fetchEmployees();
        },
        goToPage(page) {
            this.currentPage = page;
            this.fetchEmployees();
        }
    },
};
           
</script>

<style>
/* Add any custom styles here */
</style>