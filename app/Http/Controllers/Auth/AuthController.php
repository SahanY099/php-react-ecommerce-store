<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;

use App\Http\Requests\Auth\SignupRequest;

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
}
