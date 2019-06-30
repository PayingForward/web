<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Support\Facades\Storage;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $exception)
    {
        switch (get_class($exception)) {
            case 'App\Exceptions\WebApiException':
                return response()->json([
                    "success"=>false,
                    'message' => $exception->getMessage(),
                    'code' => 'WE' . $exception->getCode(),
                ]);
            default:
                Storage::put('/public/errors/'.date('Y-m-d-H-i-s').".txt",date("H:m:s")."\n\nStack Trace:-\n".$exception->__toString()."\n\nRequest:-\n".json_encode($request->all())."\n\n");
                return parent::render($request, $exception);
        }
    }
}
