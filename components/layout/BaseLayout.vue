<template>
    <div class="flex flex-col min-h-screen">
        <LayoutHeader />
        
        <main class="flex-grow">
            <slot></slot>
        </main>
        
        <LayoutFooter />
    </div>
</template>

<script>
export default {
    name: 'BaseLayout'
};
</script>

<style>
/* Add your custom styles here */
</style>