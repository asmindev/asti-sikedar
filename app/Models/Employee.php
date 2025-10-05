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
        'name',
        'position',
        'gender',
        'address',
        'birth_date'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        // No casts needed for gender
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array<int, string>
     */
    protected $appends = [
        'age'
    ];

    // calculate age
    public function getAgeAttribute()
    {
        if (!$this->birth_date) {
            return null;
        }
        return \Carbon\Carbon::parse($this->birth_date)->age;
    }

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
