<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Log;

class CompanyRequest extends FormRequest
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

        // To handle image upload - update as post
        if ($this->isMethod('POST') && $this->route('id')) {
            return [
                'name' => 'sometimes|string',
                'email' => 'nullable|email|unique:companies,email,' . $this->route('id'),
                'logo' => 'nullable',
                'website' => 'nullable|string|url',
            ];
        }

        if ($this->isMethod('POST')) {
            return [
                'name' => 'required|string',
                'email' => 'nullable|email|unique:companies',
                'logo' => 'nullable|mimes:png,jpg,jpeg',
                'website' => 'nullable|url',
            ];
        }

        
    }
}
