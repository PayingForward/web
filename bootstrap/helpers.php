<?php

use Illuminate\Http\JsonResponse;
/**
 * Making a success response
 *
 * @param array $data
 * @return JsonResponse
 */
function success_response($data){
    if(!isset($data['success'])){
        $data['success'] = true;
    }

    return response()->json($data);
}