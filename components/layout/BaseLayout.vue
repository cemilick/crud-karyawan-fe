<template>
    <div class="flex flex-col min-h-screen">
        <LayoutHeader />
        
        <main class="flex-grow p-10">
            <slot v-if="!loading"></slot>
            <div v-else class="flex justify-center items-center h-64">
                <svg class="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V2.83a1 1 0 011.7-.71l6 6a1 1 0 010 1.42l-6 6a1 1 0 01-1.41-1.42L11 13.41V4a1 1 0 00-1-1H4a1 1 0 00-1 1v8z"></path>
                </svg>
            </div>
        </main>
        
        <LayoutFooter />
    </div>
</template>

<script>
export default {
    name: 'BaseLayout',
    props: {
        loading: {
            type: Boolean,
            default: false,
        },
    }
};
</script>

<style>
/* Add your custom styles here */
</style>