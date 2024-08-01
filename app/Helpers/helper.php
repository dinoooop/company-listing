<?php

use Illuminate\Support\Facades\Storage;

function uploadFileToPublic($file)
{
    $extension = $file->getClientOriginalExtension();
    $fileName = time() . '_' . rand(100000, 999999) . '.' . $extension;
    $filePath = $file->storeAs('public', $fileName);
    return config('app.url') . Storage::url($filePath);
}

function deleteFileFromPublic($fileUrl)
{
    if(is_null($fileUrl) || $fileUrl == ''){
        return false;
    }
    $filePath = str_replace(config('app.url') . '/storage/', '', $fileUrl);
    if (Storage::exists('public/' . $filePath)) {
        Storage::delete('public/' . $filePath);
    }
}
