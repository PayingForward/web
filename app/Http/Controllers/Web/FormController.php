<?php
namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FormController extends Controller {
    /**
     * Records searching for a dropdown
     *
     * @param Request $request
     * @param string $form
     * 
     * @return JsonResponse
     */
    public function dropdown(Request $request, string $form){

    }
    /**
     * Creating a record
     *
     * @param Request $request
     * @param string $form
     * 
     * @return JsonResponse
     */
    public function create(Request $request, string $form){

    }
    /**
     * Deleting a record or more
     *
     * @param Request $request
     * @param string $form
     * 
     * @return JsonResponse
     */
    public function delete(Request $request, string $form){

    }
    /**
     * Searching records for the table
     *
     * @param Request $request
     * @param string $form
     * 
     * @return JsonResponse
     */
    public function search(Request $request, string $form){

    }
    /**
     * Update a record or more
     *
     * @param Request $request
     * @param string $form
     * 
     * @return JsonResponse
     */
    public function update(Request $request, string $form){

    }
    /**
     * Validating a record input
     *
     * @param Request $request
     * @param string $form
     * 
     * @return JsonResponse
     */
    public function validate(Request $request, string $form){

    }
}