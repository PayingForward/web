<?php
namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\Base;
use App\FormGen\Form;
use Illuminate\Support\Facades\Route;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Validator;
use App\Exceptions\WebApiException;

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
     * Returning the informations of form
     *
     * @param Request $request
     * @param string $form
     * @return void
     */
    public function info(Request $request, string $form){
        $inputs = $this->form->getInputs();
        $columns = $this->form->getColumns();
        $title = $this->form->getTitle();
        $structure = $this->form->getStructure();
        $actions = $this->form->getActions();
        $success = true;
        
        return compact(['inputs','columns','title','structure','actions','success']);
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

        $query->where(function(Builder $query)use($keyword){
            foreach ($this->form->getColumns() as $name => $column) {
                if($column->isSearchable()){
                    $column->makeCondition($query,$keyword);
                }
            }
        });

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
    public function createOrUpdate(Request $request, string $form,string $mode){
        $model = $this->form->getModel();
        /** @var Base $instance */
        $instance = new $model();

        $rules = [
            'values'=>'required|array'
        ];

        if($mode=='update'){
            $rules['id'] = 'required|exists:'.$instance->getTable().','.$instance->getKeyName();
        }

        $validation = Validator::make($request->all(),$rules);

        if($validation->fails()){
            throw new WebApiException("Invalid values supplied.",5);
        }

        if($mode=='update'){
            $instance = $model::find($request->input('id'));

            if(!$instance){
                throw new WebApiException("The record has deleted or blocked!",2);
            }
        }

        $values = $request->input('values');

        $inputs = $this->form->getInputs();

        $rules = [];

        // Making validation rules
        foreach ($inputs as $name => $input) {
            $rule = $input->getValidationRule();

            if(isset($rule)){
                $rules[$name] = $rule;
            }

            if(isset($values[$name])){
                $instance->{$input->getColumnName()} = $input->serializeValue($values[$name]);
            } else {
                $instance->{$input->getColumnName()} = $input->getDefaultValue();
            }
        }

        $secondValidation = Validator::make($values,$rules);

        if($secondValidation->fails()){
            throw new WebApiException("Invalid values supplied.",5);
        }

        $thirdValidation = $this->form->validateValues($instance);

        if(!$thirdValidation){
            throw new WebApiException("Invalid values supplied.",5);
        }

        $this->form->{'before'.ucfirst($mode)}($instance,$values);

        try {

            $instance->save();
        } catch (\Exception $e){
            throw new WebApiException("Sorry!. Your operation is not successfull.",6);
        }

        $this->form->{'after'.ucfirst($mode)}($instance,$values);

        return success_response(['message'=>"Successfully created!"]);
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
        $modelName = $this->form->getModel();

        /** @var Base $instance */
        $instance = new $modelName();

        $tableName = $instance->getTable();
        $keyName = $instance->getKeyName();

        $validation = Validator::make($request->all(),[
            'id'=>'required|exists:'.$tableName.','.$keyName
        ]);

        if($validation->fails()){
            throw new WebApiException("Invalid values supplied.",5);
        }

        $instance = $modelName::find($request->input('id'));

        if(!$instance){
            throw new WebApiException("The record has deleted or blocked.",2);
        }

        $this->form->beforeDelete($instance);

        $instance->delete();

        $this->form->afterDelete($request->input('id'));

        return success_response(['message'=>"Successfully deleted you record."]);
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
        $validation = Validator::make($request->all(),[
            'values'=>'array',
            'page'=>'required',
            'perPage'=>'required',
            'sortBy'=>'required'
        ]);

        if($validation->fails()){
            throw new WebApiException("Invalid values supplied.",5);
        }

        $values = $request->input('values');
        $page = $request->input('page');
        $perPage = $request->input('perPage');
        $sortBy = $request->input('sortBy');

        $columns = $this->form->getColumns();

        $modelName = $this->form->getModel();
        /** @var Base $instance */
        $instance = new $modelName();

        $query = $instance::query();

        foreach ($columns as $name => $column) {
            if(isset($values[$name])){
                $column->makeCondition($query,$values[$name]);
            }
        }

        $count = $query->count();

        $query->take($page);
        $query->skip(($page-1)*$perPage);

        $sortColumn = $this->form->getColumn($sortBy);


        if(!isset($sortColumn)){
            throw new WebApiException("Invalid values supplied.",5);
        }

        $query->orderBy($sortColumn->getColumnName());

        $this->form->beforeSearch($query,$values);

        $results= $query->get();

        $results->transform(function(Base $model) use ( $columns) {
            $formatedResults = [];

            foreach($columns as $name=>$column){
                $value = $model->{$column->getColumnName()};

                $formatedResults[$name] = $column->unserializeValue($value);
            }

            return $formatedResults;
        });

        return \success_response(['results'=>$results,'count'=>$count]);

    }
}