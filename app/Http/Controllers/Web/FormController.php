<?php
namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\Base;
use App\FormGen\Form;
use Illuminate\Support\Facades\Route;
use Illuminate\Database\Eloquent\Builder;

class FormController extends Controller {
    public function __construct()
    {
        $formName = Route::current()->parameter('form');
        $this->makeModel($formName);
    }

    /**
     * Modal instance
     *
     * @var Form
     */
    protected $form;

    /**
     * Setting up the relavant form modal
     *
     * @param string $form form name in camel case notation
     * @return Base
     */
    protected function makeModel($form){
        $classNameSpace = '\App\Forms\\'.ucfirst(camel_case($form));
        
        if(class_exists($classNameSpace)){
            $class = new $classNameSpace();

            $this->form = $class;
        } else {
            abort(404);
        }
    }

    /**
     * Records searching for a dropdown
     *
     * @param Request $request
     * @param string $form
     * 
     * @return JsonResponse
     */
    public function dropdown(Request $request, string $form){
        $keyword = $request->input('keyword','');
        $where = $request->input('where',[]);
        $page = $request->input('page',1);
        $perPage = $request->input('perPage',30);

        $model = $this->form->getModel();

        /** @var Builder $query  */
        $query = $model::query();

        $this->form->beforeDropdownSearch($query,$keyword,$where);

        foreach ($this->form->getColumns() as $name => $column) {
            if($column->isSearchable()){
                $column->makeCondition($query,$keyword);
            }
        }

        $query->latest();
        $query->take($perPage);
        $query->skip(($page-1)*$perPage);

        $results = $query->get();

        $results->transform(function( Base $row)use($where){
            return [
                'id'=>$row->getKey(),
                'label'=>$this->form->formatDropdownLabel($row,$where)
            ];
        });

        return success_response(['items'=>$results]);
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
    public function validateInput(Request $request, string $form){

    }
}