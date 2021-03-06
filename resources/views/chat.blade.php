<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <style>
        .list-group{
            overflow-y: auto;
            height: 200px;
        }
    </style>
    <title>Document</title>
</head>
<body>
    <div class="container pt-4">
        <div class="row" id="app">
            <div class="offset-4 col-4 offset-sm-1 col-sm-10">
                <li class="list-group-item active">Chat room <span class="badge badge-danger badge-pill">@{{ numberOfUsers }}</span></li>
                <div class="badge badge-pill badge-primary">@{{ typing }}</div>
                <!-- :data dan color adalah sama2 props dari ChatMessage, tapi untuk data diberikan : didepannya
                karena valuenya ada dynamic. untuk syntax panjangnya adalah v-bind:data -->
                <ul class="list-group" v-chat-scroll>
                    <chat-message 
                    v-for="(value, index) in chat.message" 
                    :key="value.index"
                    :data="value"
                    :user="chat.user[index]"
                    :color="chat.color[index]"
                    :time="chat.time[index]"></chat-message>
                </ul>
                <input type="text" 
                    name="" id="" 
                    class="form-control" 
                    placeholder="Type your message here..." 
                    v-model="message"
                    @keyup.enter="send">
            </div>
        </div>
    </div>
    <script src="{{ asset('js/app.js') }}"></script>
    <script>
        // Create global window object to get user name
        window.Laravel = {!! json_encode([
            'user_name' => Auth::user()->name
        ]) !!};
    </script>
</body>
</html>