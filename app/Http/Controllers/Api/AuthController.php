<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        
        $data = $request->validated();
        if (!Auth::attempt($data)) {
            return response([
                'message' => 'Provided password or email is incorrect',
            ]);
        }
        /** @var User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        return response([
            'user' => $user,
            'token' => $token,
        ]);
    }
    public function signup(SignupRequest $request)
    {
        $data = $request->validated();

        $user = User::create([
            'name' => $data['name'],
            'password' => bcrypt($data['password']),
            'email' => $data['email'],
        ]);
        $token = $user->createToken('main')->plainTextToken;
        return response([
            'user' => $user,
            'token' => $token,
        ]);
    }
    public function logout(Request $request)
    {   
        $user = $request->user();
        $user->tokens()->delete();
        return response($user,204);
    }
}
