<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

use App\Http\Requests\Auth\SignupRequest;
use App\Http\Requests\Auth\SigninRequest;

class AuthController extends Controller
{
    public function signup(SignupRequest $request)
    {
        $data = $request->validated();

        /**  @var User $user */
        $user = User::create(
            [
                'email' => $data['email'],
                'password' => bcrypt($data['password']),
            ]
        );

        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'), 200);

    }

    public function signin(SigninRequest $request)
    {
        $data = $request->validated();
        ['email' => $email, 'password' => $password, 'remember' => $remember] = $data;
        $credentials = ['email' => $email, 'password' => $password];

        if (!Auth::attempt($credentials, $remember)) {
            return response([
                'message' => 'Provided email or password is incorrect'
            ], 422);
        }

        /**  @var User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'), 200);
    }
}
