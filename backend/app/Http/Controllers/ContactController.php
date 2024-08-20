<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        try{
            $authUser = Auth::user()->id;
            $response = Contact::where('user_id', '=', $authUser)->get();
            return response()->json($response, Response::HTTP_OK);
        } catch (\Exception $e){
            return response()->json($e, Response::HTTP_INTERNAL_SERVER_ERROR);
            //REMOVE $e
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $authUserId = Auth::user()->id;
        $validator = Validator::make(
            ['name' => $request->input('name')],
            ['name' => ['required', 'string', 'max:255']]
        );

        if ($validator->fails()) {
            return response()->json($validator->errors(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }
        try {
            $contact = new Contact();
            $contact->name = $request->input('name');
            $contact->phone = $request->input('phone');
            $contact->email = $request->input('email');
            $contact->user_id = $authUserId;
            $contact->save();
            return response()->json('success', Response::HTTP_CREATED);
        } catch (\Exception $e){
            return response()->json($e, Response::HTTP_INTERNAL_SERVER_ERROR);
            //REMOVE $e
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        try{
            $authUser = Auth::user()->id;
            $response = Contact::where('id', '=', $id)
                ->where('user_id', '=', $authUser)
                ->firstOrFail();
            return response()->json($response, Response::HTTP_OK);
        } catch (\Exception $e){
            return response()->json($e, Response::HTTP_INTERNAL_SERVER_ERROR);
            //REMOVE $e
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);
        try{
            $authUser = Auth::user()->id;
            $contact = Contact::where('user_id', '=', $authUser)->findOrFail($id);
            if($contact){
                $contact->update($request->all());
                return response()->json('success', Response::HTTP_OK);
            }
        }
        catch (\Exception $e){
            return response()->json($e, Response::HTTP_INTERNAL_SERVER_ERROR);
            //REMOVE $e
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        try{
            $authUser = Auth::user()->id;
            $response = Contact::where('id', $id)
                ->where('user_id', $authUser)
                ->delete();
            if(!$response) return response()->json('', Response::HTTP_INTERNAL_SERVER_ERROR);
            else return response()->json('', Response::HTTP_NO_CONTENT);
        }
        catch (\Exception $e){
            return response()->json($e, Response::HTTP_INTERNAL_SERVER_ERROR);
            //REMOVE $e
        }

    }
}
