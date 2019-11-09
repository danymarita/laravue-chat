<template>
    <div>
        <li class="list-group-item" :class="className">{{ data }}</li>
        <small class="badge float-right" :class="badgeClass">You</small>
    </div>
</template>
<script>
    export default {
        props: [
            'color',
            'data'
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
