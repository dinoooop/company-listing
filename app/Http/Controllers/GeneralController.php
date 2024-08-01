<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;

class GeneralController extends Controller
{
    public function auto(Request $request, $item)
    {
        try {
            switch ($item) {
                
                case 'companies':
                    $query = Company::query();
                    break;

                default:
                    return response()->json([], 404);
            }

            if ($request->isMethod('post')) {
                $id = $request->input('id');
                $ids = $request->input('ids');

                if ($id) {
                    // single auto select
                    $data = $query->find($id);
                    return response()->json($data);
                }

                if ($ids) {
                    // multi auto select
                    $data = $query->whereIn('id', $ids)->get();
                    return response()->json($data);
                }

                return response()->json([]);
            }

            $search = $request->query('search');
            if ($search) {
                $query->where('name', 'like', '%' . $search . '%');
            }

            $data = $query->orderBy('name')->limit(10)->get();
            return response()->json($data);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
