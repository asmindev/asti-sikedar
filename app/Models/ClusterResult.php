<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ClusterResult extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'employee_id',
        'cluster',
        'label',
        'score_k',
        'score_a',
        'score_b',
        'distance_to_low',
        'distance_to_medium',
        'distance_to_high',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'employee_id' => 'integer',
        'cluster' => 'integer',
        'score_k' => 'decimal:4',
        'score_a' => 'decimal:4',
        'score_b' => 'decimal:4',
        'distance_to_low' => 'decimal:4',
        'distance_to_medium' => 'decimal:4',
        'distance_to_high' => 'decimal:4',
    ];

    /**
     * Get the employee that owns the cluster result.
     */
    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }

    /**
     * Get the performance label color for UI display.
     */
    public function getLabelColorAttribute(): string
    {
        return match ($this->label) {
            'High' => 'green',
            'Medium' => 'yellow',
            'Low' => 'red',
            default => 'gray',
        };
    }

    /**
     * Get the cluster name for display.
     */
    public function getClusterNameAttribute(): string
    {
        return match ($this->cluster) {
            0 => 'Cluster A',
            1 => 'Cluster B',
            2 => 'Cluster C',
            default => 'Unknown',
        };
    }
}
