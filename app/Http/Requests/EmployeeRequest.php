<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EmployeeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        if ($this->isMethod('POST')) {
            return [
                'first_name' => 'required|string',
                'last_name' => 'required|string',
                'company_id' => 'required|integer',
                'email' => 'nullable|email|unique:employees',
                'phone' => 'nullable|string',
            ];
        }

        if ($this->isMethod('PUT')) {
            return [
                'first_name' => 'sometimes|string',
                'last_name' => 'sometimes|string',
                'company_id' => 'sometimes|integer',
                'email' => 'nullable|email|unique:employees,email,' . $this->route('employee'),
                'phone' => 'nullable|string',
            ];
        }
    }
}
