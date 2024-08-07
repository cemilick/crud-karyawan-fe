<template>
    <base-layout :loading="this.is_loading">
    <h1 class="text-2xl font-bold mb-4">Data Karyawan</h1>
        <div class="p-4">
            <div class="flex justify-center gap-5 mb-4">
                <div>
                    <input
                        type="text"
                        class="w-full border border-gray-300 rounded py-2 px-4"
                        placeholder="Filter by Name"
                        v-model="nameFilter"
                        @input="applyFilters"
                    />
                </div>
                <div>
                    <select
                        class="w-full border border-gray-300 rounded py-2 px-4"
                        v-model="jobFilter"
                        @change="applyFilters"
                    >
                        <option value="">Filter by Job</option>
                        <option v-for="job in jobs" :key="job.id" :value="job.id">
                            {{ job.job_name }}
                        </option>
                    </select>
                </div>   
                <div>
                    <select
                        class="w-full border border-gray-300 rounded py-2 px-4"
                        v-model="divisionFilter"
                        @change="applyFilters"
                    >
                        <option value="">Filter by Division</option>
                        <option v-for="division in divisions" :key="division.id" :value="division.id">
                            {{ division.division_name }}
                        </option>
                    </select>
                </div>
                <div>
                    <button class="bg-green-500 hover:bg-green-700 text-white text-center font-bold py-2 px-4 rounded"
                    @click="createKaryawan"
                    >
                        Buat Baru
                    </button>
                </div>
            </div>
            <table class="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th class="py-2 px-4 border-b">Nama</th>
                        <th class="py-2 px-4 border-b">Pekerjaan</th>
                        <th class="py-2 px-4 border-b">Divisi</th>
                        <th class="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody class="text-center">
                    <tr v-for="employee in employees" :key="employee?.id">
                        <td class="py-2 px-4 border-b">{{ employee?.name }}</td>
                        <td class="py-2 px-4 border-b">{{ employee?.job?.job_name }}</td>
                        <td class="py-2 px-4 border-b">{{ employee?.division?.division_name }}</td>
                        <td class="py-2 px-4 border-b">
                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                            @click="viewDetail(employee?.id)"
                            >
                                Detail
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
            divisionFilter: '',
            jobFilter: '',
            nameFilter: '',
            divisions: [],
            jobs: [],
            is_loading: false,
        };
    },
    mounted() {
        this.fetchEmployees();
        this.fetchDivision();
        this.fetchJob();
    },
    methods: {
        fetchEmployees() {
            this.is_loading = true;
            axios.get('/api/karyawan?page=' + this.currentPage + '&division_id=' + this.divisionFilter + '&job_id=' + this.jobFilter + '&name=' + this.nameFilter)
                .then(response => {
                    this.is_loading = false;
                    const data = response.data.data;
                    this.employees = data.data;
                    this.currentPage = data.current_page;
                    this.totalPages = data.last_page;
                })
                .catch(error => {
                    this.is_loading = false;
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
        },
        viewDetail(id) {
            this.$router.push('/karyawan/' + id);
        },
        applyFilters() {
            this.currentPage = 1;
            this.fetchEmployees();
        },
        createKaryawan() {
            this.$router.push('/karyawan/create');
        },
        fetchDivision() {
            axios.get('/api/division')
                .then(response => {
                    this.divisions = response.data.data;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        fetchJob() {
            axios.get('/api/job')
                .then(response => {
                    this.jobs = response.data.data;
                })
                .catch(error => {
                    console.error(error);
                });
        }
    },
};
           
</script>

<style>
/* Add any custom styles here */
</style>