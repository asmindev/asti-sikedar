<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Employee extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'employee_code',
        'name',
        'department',
        'position',
        'hire_date',
        'phone',
        'address',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'hire_date' => 'date',
    ];

    /**
     * Get the user associated with the employee.
     */
    public function user(): HasOne
    {
        return $this->hasOne(User::class);
    }

    /**
     * Get the questionnaire associated with the employee.
     */
    public function questionnaire(): HasOne
    {
        return $this->hasOne(Questionnaire::class);
    }

    /**
     * Get the cluster result associated with the employee.
     */
    public function clusterResult(): HasOne
    {
        return $this->hasOne(ClusterResult::class);
    }
}
