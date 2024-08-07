<template>
    <base-layout>
    <div class="container mx-auto">
        <h1 class="text-2xl font-bold mb-4">Dashboard</h1>
        <div class="mb-4">
            <h2 class="text-lg font-bold mb-2">Filter berdasarkan Divisi</h2>
            <select v-model="selectedDivision" class="p-2 border border-gray-300 rounded" @change="handleChangeDivision">
                <option value="">Semua Divisi</option>
                <option v-for="division in divisions" :key="division.id" :value="division.id">{{ division.division_name }}</option>
            </select>
        </div>
        <div class="flex justify-between mb-4">
            <div class="w-1/3">
                <h2 class="text-lg font-bold mb-2">Total Karyawan</h2>
                <p>{{ totalKaryawan }}</p>
            </div>

            <div class="w-1/3">
                <h2 class="text-lg font-bold mb-2">Total Karyawan Aktif</h2>
                <p>{{ totalActiveKaryawan }}</p>
            </div>

            <div class="w-1/3">
                <h2 class="text-lg font-bold mb-2">Total Karyawan Nonaktif</h2>
                <p>{{ totalInactiveKaryawan }}</p>
            </div>
        </div>
        <div>
            <h2 class="text-lg font-bold mb-2">Daftar Karyawan</h2>
            <ul>
                <li v-for="karyawan in karyawans" :key="karyawan.id">{{ karyawan.name }}</li>
            </ul>
        </div>
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
            totalKaryawan: 0,
            totalActiveKaryawan: 0,
            totalInactiveKaryawan: 0,
            selectedDivision: '',
            divisions: [],
            karyawans: [],
        };
    },
    mounted() {
        this.fetchDataDashboard();
        this.fetchDivision();
    },
    methods: {
        fetchDataDashboard() {
            axios.get('/api/karyawan/statistics?division=' + this.selectedDivision)
                .then(response => {
                    const data = response.data.data;
                    this.totalKaryawan = data.total_karyawan;
                    this.totalActiveKaryawan = data.total_karyawan_active;
                    this.totalInactiveKaryawan = data.total_karyawan_non_active;
                    this.karyawans = data.data;
                })
                .catch(error => {
                    console.error(error);
                });
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
        handleChangeDivision() {
            this.fetchDataDashboard();
        }
    },
};
</script>

<style>
/* Add your custom styles here */
</style>