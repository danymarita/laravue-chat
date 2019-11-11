/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import BootstrapVue from 'bootstrap-vue';
Vue.use(BootstrapVue)

// For autoscroll
import VueChatScroll from 'vue-chat-scroll'
import Axios from 'axios';
Vue.use(VueChatScroll)

// For notification
import Toaster from 'v-toaster';
import 'v-toaster/dist/v-toaster.css';
Vue.use(Toaster, {timeout: 5000})

Vue.component('chat-message', require('./components/ChatMessage.vue').default);

const app = new Vue({
    el: '#app',
    data: {
        message: '',
        chat: {
            message: [],
            user: [],
            color: [],
            time: []
        },
        typing: '',
        numberOfUsers: 0
    },
    watch: {
        message() {
            // Enable client event in pusher app settings
            Echo.private('chat')
            .whisper('typing', {
                user_name: Laravel.user_name,
                message: this.message
            });
        }
    },
    methods: {
        send(){
            if(this.message.length > 0){
                // Data as sender
                this.chat.message.push(this.message);
                this.chat.user.push('You');
                this.chat.color.push('success');
                this.chat.time.push(this.getTime());

                Axios.post('/send', {
                    message : this.message
                }).then(response => {
                    // console.log(response);
                    this.message = '';
                }).catch(error => {
                    console.log(error);
                })
            }
        },
        getTime(){
            let time = new Date();
            return time.getHours()+':'+time.getMinutes();
        }
    },
    mounted() {
        // Karena channel yang dipakai adalah private, maka harus ada otentikasi
        // Otentikasi dapat ditambahkan di routes/channels.php
        Echo.private('chat')
        .listen('ChatEvent', (e) => {
            // console.log(e);
            // Data as receiver
            this.chat.message.push(e.message);
            this.chat.user.push(e.user);
            this.chat.color.push('warning');
            this.chat.time.push(this.getTime());
        });
        // Listener for whisper event
        Echo.private('chat')
        .listenForWhisper('typing', (e) => {
            // console.log(e);
            if(e.message != '') {
                // console.log(e.name);
                this.typing = e.user_name + ' is typing...';
            }else{
                this.typing = '';
            }
        });
        // Listener for check user join room
        Echo.join('chat')
        .here((users) => {
            this.numberOfUsers = users.length;
        })
        .joining((user) => {
            this.numberOfUsers += 1;
            this.$toaster.success(user.name + ' is joined the chat room');
        })
        .leaving((user) => {
            this.numberOfUsers -= 1;
            this.$toaster.warning(user.name + ' is leaved the chat room');
        });
    }
});