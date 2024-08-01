<?php

namespace App\Http\Controllers;

use App\Http\Requests\CompanyRequest;
use App\Models\Company;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    public function index()
    {
        $query = Company::query();
        $response = $query->orderBy('id', 'desc')->paginate(10);
        return response()->json($response);
    }

    public function show(Company $company)
    {
        $company->load('employees');
        return response()->json($company);
    }

    public function store(CompanyRequest $request)
    {

        $validated = $request->validated();

        if ($request->hasFile('logo') && $request->file('logo')->isValid()) {
            $validated['logo'] = uploadFileToPublic($request->file('logo'));
        }

        $response = Company::create($validated);

        return response()->json($response);
    }

    public function update(CompanyRequest $request, $id)
    {
        $validated = $request->validated();
        $company = Company::findOrFail($id);

        
        if ($request->hasFile('logo') && $request->file('logo')->isValid()) {
            $validated['logo'] = uploadFileToPublic($request->file('logo'));
        }
        
        $response = $company->update($validated);
        return response()->json($response);
    }

    /***
     * 
     * PHP does not handle file uploads in PUT
     */
    public function updateLogo(Request $request, $id)
    {
        $validated = $request->validate([
            'logo' => 'required|mimes:png,jpg,jpeg',
        ]);

        $company = Company::findOrFail($id);

        $response = false;

        if ($request->hasFile('logo') && $request->file('logo')->isValid()) {
            $validated['logo'] = uploadFileToPublic($request->file('logo'));
            $response = $company->update($validated);
        }

        return response()->json($response);
    }

    public function destroy(Company $company)
    {
        deleteFileFromPublic($company->logo);
        $response = $company->delete();
        return response()->json($response);
    }
}
