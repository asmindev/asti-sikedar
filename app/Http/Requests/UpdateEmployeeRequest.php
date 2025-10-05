<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateEmployeeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user() && $this->user()->isAdmin();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $employeeId = $this->route('employee')->id ?? null;

        return [

            'name' => [
                'required',
                'string',
                'max:255'
            ],

            'position' => [
                'required',
                'string',
                'max:100'
            ],
            'gender' => [
                'required',
                'string',
                Rule::in(['Laki-laki', 'Perempuan'])
            ],
            'address' => [
                'nullable',
                'string',
                'max:500'
            ],

            // User account creation/update fields (conditional)
            'create_user_account' => [
                'boolean'
            ],
            'email' => [
                'required_if:create_user_account,true',
                'nullable',
                'email',
                'max:255'
            ],
            'password' => [
                'nullable',
                'string',
                'min:8',
                'confirmed'
            ],
            'role' => [
                'required_if:create_user_account,true',
                Rule::in(['admin', 'user'])
            ],
            'birth_date' => [
                'required',
                'date',
                'before:today'
            ],
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'The employee name is required.',
            'position.required' => 'The position is required.',
            'gender.required' => 'The gender is required.',
            'gender.in' => 'Gender must be either Laki-laki or Perempuan.',
            'email.required_if' => 'Email is required when creating a user account.',
            'password.min' => 'Password must be at least 8 characters.',
            'password.confirmed' => 'Password confirmation does not match.',
            'role.required_if' => 'Role is required when creating a user account.',
            'role.in' => 'Role must be either admin or user.',
            'birth_date.date' => 'The birth date must be a valid date.',
            'birth_date.before' => 'The birth date must be a date before today.',
            'birth_date.required' => 'Birth date is required to calculate age.',
        ];
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'gender' => 'gender',
        ];
    }
}
