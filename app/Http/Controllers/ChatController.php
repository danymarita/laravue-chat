<?php

namespace App\Http\Controllers;

use App\Events\ChatEvent;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function chat() {
        return view('chat');
    }

    public function send(Request $request) {
        // It will work after you run php artisan make:auth
        $user = User::find(Auth::id());
        event(new ChatEvent($request->message, $user));
        return $request->all();
    }

    // Only for testing purpose
    // public function send() {
    //     // It will work after you run php artisan make:auth
    //     $user = User::find(Auth::id());
    //     event(new ChatEvent('Chat Message', $user));
    // }
}
