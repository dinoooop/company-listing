<?php

namespace App\Http\Controllers;

use App\Http\Requests\EmployeeRequest;
use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function index()
    {
        $query = Employee::query();
        $response = $query->orderBy('id', 'desc')->with('company')->paginate(10);
        return response()->json($response);
    }

    public function show(Employee $employee)
    {
        $employee->load('company');
        return response()->json($employee);
    }


    public function store(EmployeeRequest $request)
    {
        $validated = $request->validated();
        $response = Employee::create($validated);
        return response()->json($response);
    }

    public function update(EmployeeRequest $request, $id)
    {
        $validated = $request->validated();
        $employee = Employee::findOrFail($id);
        $response = $employee->update($validated);
        return response()->json($response);
    }

    public function destroy(Employee $employee)
    {
        $response = $employee->delete();
        return response()->json($response);
    }
}
