<template>
    <div>
        <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                    {{label}}
                </label>
                <input
                    :value="value"
                    v-bind="bind"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    :id="id"
                    :type="type"
                    :placeholder="placeholder"
                    @change="handleChange"
                />
            </div>
    </div>
</template>

<script>
export default {
    props: {
        bind: {
            type: Object,
            default: () => ({})
        },
        id: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: true
        },
        value: {
            type: [String, Number],
            required: true
        },
        type: {
            type: String,
            default: 'text'
        },
        placeholder: {
            type: String,
            default: ''
        },
        error: {
            type: String,
            default: ''
        }
    },
    computed: {
        inputClasses() {
            return 'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50';
        }
    },
    methods: {
        handleChange(event) {
            console.log(event.target.value);
        }
    }
};
</script>

<style scoped>
/* Add your custom styles here */
</style>