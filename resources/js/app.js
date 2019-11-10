/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import BootstrapVue from 'bootstrap-vue';
Vue.use(BootstrapVue)

import VueChatScroll from 'vue-chat-scroll'
import Axios from 'axios';
Vue.use(VueChatScroll)

Vue.component('chat-message', require('./components/ChatMessage.vue').default);

const app = new Vue({
    el: '#app',
    data: {
        message: '',
        chat: {
            message: [],
            user: [],
            color: []
        }
    },
    methods: {
        send(){
            if(this.message.length > 0){
                // Data as sender
                this.chat.message.push(this.message);
                this.chat.user.push('You');
                this.chat.color.push('success');

                Axios.post('/send', {
                    message : this.message
                }).then(response => {
                    console.log(response);
                    this.message = '';
                }).catch(error => {
                    console.log(error);
                })
            }
        }
    },
    mounted() {
        // Karena channel yang dipakai adalah private, maka harus ada otentikasi
        // Otentikasi dapat ditambahkan di routes/channels.php
        Echo.private('chat')
        .listen('ChatEvent', (e) => {
            console.log(e);
            // Data as receiver
            this.chat.message.push(e.message);
            this.chat.user.push(e.user);
            this.chat.color.push('warning');
        });
    }
});