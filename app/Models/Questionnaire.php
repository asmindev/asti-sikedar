<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Questionnaire extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'employee_id',
        'k1',
        'k2',
        'k3',
        'k4',
        'k5',
        'k6',
        'k7',
        'a1',
        'a2',
        'a3',
        'a4',
        'a5',
        'a6',
        'a7',
        'b1',
        'b2',
        'b3',
        'b4',
        'b5',
        'b6',
        'b7',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'employee_id' => 'integer',
        'k1' => 'integer',
        'k2' => 'integer',
        'k3' => 'integer',
        'k4' => 'integer',
        'k5' => 'integer',
        'k6' => 'integer',
        'k7' => 'integer',
        'a1' => 'integer',
        'a2' => 'integer',
        'a3' => 'integer',
        'a4' => 'integer',
        'a5' => 'integer',
        'a6' => 'integer',
        'a7' => 'integer',
        'b1' => 'integer',
        'b2' => 'integer',
        'b3' => 'integer',
        'b4' => 'integer',
        'b5' => 'integer',
        'b6' => 'integer',
        'b7' => 'integer',
    ];

    /**
     * Get the employee that owns the questionnaire.
     */
    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }

    /**
     * Get the K dimension scores as an array.
     *
     * @return array<int, int>
     */
    public function getKScoresAttribute(): array
    {
        return [
            $this->k1,
            $this->k2,
            $this->k3,
            $this->k4,
            $this->k5,
            $this->k6,
            $this->k7
        ];
    }

    /**
     * Get the A dimension scores as an array.
     *
     * @return array<int, int>
     */
    public function getAScoresAttribute(): array
    {
        return [
            $this->a1,
            $this->a2,
            $this->a3,
            $this->a4,
            $this->a5,
            $this->a6,
            $this->a7
        ];
    }

    /**
     * Get the B dimension scores as an array.
     *
     * @return array<int, int>
     */
    public function getBScoresAttribute(): array
    {
        return [
            $this->b1,
            $this->b2,
            $this->b3,
            $this->b4,
            $this->b5,
            $this->b6,
            $this->b7
        ];
    }

    /**
     * Get the average score for K dimension.
     */
    public function getKAverageAttribute(): float
    {
        return array_sum($this->k_scores) / 7;
    }

    /**
     * Get the average score for A dimension.
     */
    public function getAAverageAttribute(): float
    {
        return array_sum($this->a_scores) / 7;
    }

    /**
     * Get the average score for B dimension.
     */
    public function getBAverageAttribute(): float
    {
        return array_sum($this->b_scores) / 7;
    }
}
