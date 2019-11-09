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
    <div class="container">
        <div class="row" id="app">
            <div class=" offset-4 col-4">
                <li class="list-group-item active">Chat room</li>
                <ul class="list-group">
                    <chat-message v-for="value in chat.message" :data="value"></chat-message>
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
</body>
</html>