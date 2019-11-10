<template>
    <div>
        <li class="list-group-item" :class="className">{{ data }}</li>
        <small class="badge float-right" :class="badgeClass">{{ user }}</small>
    </div>
</template>
<script>
    export default {
        props: [
            'color',
            'data',
            'user'
        ],
        computed: {
            className(){
                return 'list-group-item-' + this.color
            },
            badgeClass(){
                return 'badge-' + this.color
            }
        }
    }
</script>
