<template>
    <div class="card-body">
        <h3 class="card-title">{{ title }}</h3>
        <p class="card-text">{{ text }}</p>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: ['title', 'text']
    }
</script>