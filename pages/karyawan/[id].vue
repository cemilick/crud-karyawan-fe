<template>
    <base-layout :loading="this.is_loading">
    <div class="container mx-auto">
        <h1 class="text-2xl font-bold mb-4">Karyawan - {{this.create_action ? 'Buat Baru' : 'Detail'}}</h1>
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="nama">
                    Nama
                </label>
                <input
                    v-model="karyawan.name"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="nama"
                    type="text"
                    placeholder="Nama"
                />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                    Email
                </label>
                <input
                    v-model="karyawan.email"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Email"
                />
            </div>
            
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                    No. Telepon
                </label>
                <input
                    v-model="karyawan.phone"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="phone"
                    type="text"
                    placeholder="No. Telepon"
                />
            </div>
            
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                    Alamat
                </label>
                <input
                    v-model="karyawan.address"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="address"
                    type="text"
                    placeholder="Alamat"
                />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="job">
                    Job
                </label>
                <select
                    v-model="karyawan.job_id"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="job"
                >
                    <option value="">Select Job</option>
                    <option v-for="job in jobs" :key="job.id" :value="job.id">{{ job.job_name }}</option>
                </select>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="division">
                    Division
                </label>
                <select
                    v-model="karyawan.division_id"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="division"
                >
                    <option value="">Select Division</option>
                    <option v-for="division in divisions" :key="division.id" :value="division.id">{{ division.division_name }}</option>
                </select>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="isActive">
                    Active
                </label>
                <div class="relative inline-block w-10 mr-3 align-middle select-none">
                    <input
                        v-model="karyawan.is_active"
                        id="isActive"
                        type="checkbox"
                        class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer duration-300" 
                        :class="{ 'ml-4': karyawan.is_active }"
                    />
                    <label
                        for="isActive"
                        class="toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-300"
                        :class="{ 'bg-blue-500': karyawan.is_active, 'bg-gray-300': !karyawan.is_active }"
                    ></label>
                </div>
                <label
                    for="isActive"
                    class="text-xs text-gray-700"
                >
                    {{ karyawan.is_active ? 'Yes' : 'No' }}
                </label>
            </div>
            <!-- Add more fields here as needed -->
            <div class="flex justify-between align-middle mt-5">
                <div>   
                    <button
                        v-if="!this.create_action"
                        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        @click="deleteKaryawan"
                    >
                        Delete
                    </button>
                </div>
                <div>
                    <button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-5 rounded focus:outline-none focus:shadow-outline"
                    @click="saveKaryawan"
                    >
                        Save
                    </button>
                    
                    <button
                        class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        @click="this.$router.push({ name: 'karyawan' })"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </div>
    </base-layout>
</template>

<script>
import BaseLayout from '~/components/layout/BaseLayout.vue';
import axios from '~/utils/axios.tsx';
import Swal from 'sweetalert2';

export default {
  components: { BaseLayout },
    data() {
        return {
            karyawan: {
                nama: '',
                email: '',
                alamat: '',
                phone: '',
                job_id: '',
                division_id: '',
                is_active: false,
                // Add more properties here as needed
            },
            jobs: {},
            divisions: {},
            create_action: this.$route.params.id == 'create',
            is_loading: false
        };
    },
    mounted() {
        if (!this.create_action) {
            this.fetchKaryawanData();
        }
        this.fetchOptions();
    },
    methods: {
        fetchKaryawanData() {
            axios.get('/api/karyawan/' + (this.create_action ? '' : this.$route.params.id))
                .then(response => {
                    this.karyawan = {
                        name: response.data.data.name,
                        email: response.data.data.email,
                        address: response.data.data.address,
                        phone: response.data.data.phone,
                        job_id: response.data.data.job_id,
                        division_id: response.data.data.division_id,
                        is_active: response.data.data.is_active,
                    };
                })
                .catch(error => {
                    console.error(error);
                });
        },
        fetchOptions() {
            axios.get('/api/job')
                .then(response => {
                    this.jobs = response.data.data;
                })
                .catch(error => {
                    console.error(error);
                });
            axios.get('/api/division')
                .then(response => {
                    this.divisions = response.data.data;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        saveKaryawan() {
            this.is_loading = true;
            axios.post('/api/karyawan/' + this.$route.params.id, this.karyawan)
                .then(response => {
                    // Handle success
                    this.is_loading = false;
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Data karyawan berhasil disimpan',
                    }).then(() => {
                        this.$router.push({ name: 'karyawan' });
                    });
                })
                .catch(error => {
                    this.is_loading = false;
                    // Handle error
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: error,
                    });
                });
        },
        deleteKaryawan: async() => {
            Swal.fire({
                title: 'Yakin Hapus Data?',
                text: 'Data karyawan akan dihapus',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Ya, hapus karyawan!',
                cancelButtonText: 'Batal',
            }).then(async (result) => {
                if (result.value) {
                    this.is_loading = true;
                    await axios.delete('/api/karyawan/' + this.$route.params.id)
                        .then(response => {
                            // Handle success
                            Swal.fire({
                                icon: 'success',
                                title: 'Success',
                                text: 'Data karyawan berhasil dihapus',
                            }).then(() => {
                                this.is_loading = false;
                                this.$router.push({ name: 'karyawan' });
                            });
                        })
                        .catch(error => {
                            // Handle error
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: error,
                            });
                        });
                }
            });
        },
    },
};
</script>

<style>
/* Add your custom styles here */
</style>