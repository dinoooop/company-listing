<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {

        try {
            $request->validate([
                'email' => 'required|email',
                'password' => 'required',
            ]);

            $user = User::where('email', $request->email)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                throw new Exception("The provided credentials are incorrect.");
            }

            $data['user'] = $user;
            $data['token'] = $user->createToken($user->name)->plainTextToken;


            return response()->json($data);
        } catch (Exception $e) {
            // Code to handle the exception
            return response()->json(['message' => $e->getMessage()], 422);
        }
    }

    public function logout(Request $request)
    {
        $data = $request->user()->currentAccessToken()->delete();
        return response()->json($data);
    }

    public function check(Request $request)
    {
        $data['user'] = Auth::user();
        return response()->json($data);
    }
}
