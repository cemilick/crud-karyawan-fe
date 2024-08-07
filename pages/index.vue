<template>
    <base-layout>
    <div class="container mx-auto">
        <h1 class="text-2xl font-bold mb-4">Dashboard</h1>
        <div class="mb-4">
            <h2 class="text-lg font-bold mb-2">Filter berdasarkan Divisi</h2>
            <select v-model="selectedDivision" class="p-2 border border-gray-300 rounded">
                <option value="">Semua Divisi</option>
                <option v-for="division in divisions" :key="division.id" :value="division.id">{{ division.name }}</option>
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
                <li v-for="karyawan in filteredKaryawan" :key="karyawan.id">{{ karyawan.name }}</li>
            </ul>
        </div>
    </div>
    </base-layout>
</template>

<script>
import BaseLayout from '~/components/layout/BaseLayout.vue';
export default {
  components: { BaseLayout },
    data() {
        return {
            totalKaryawan: 0,
            totalActiveKaryawan: 0,
            totalInactiveKaryawan: 0,
            selectedDivision: '',
            divisions: [
                { id: 1, name: 'Division 1' },
                { id: 2, name: 'Division 2' },
                { id: 3, name: 'Division 3' },
            ],
            karyawan: [
                { id: 1, name: 'John Doe', status: 'active', divisionId: 1 },
                { id: 2, name: 'Jane Smith', status: 'inactive', divisionId: 2 },
                { id: 3, name: 'Bob Johnson', status: 'active', divisionId: 1 },
                // Add more karyawan data here
            ],
        };
    },
    computed: {
        filteredKaryawan() {
            if (this.selectedDivision) {
                return this.karyawan.filter(karyawan => karyawan.divisionId === this.selectedDivision);
            } else {
                return this.karyawan;
            }
        },
    },
    created() {
        this.totalKaryawan = this.karyawan.length;
        this.totalActiveKaryawan = this.karyawan.filter(karyawan => karyawan.status === 'active').length;
        this.totalInactiveKaryawan = this.karyawan.filter(karyawan => karyawan.status === 'inactive').length;
    },
};
</script>

<style>
/* Add your custom styles here */
</style>