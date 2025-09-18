<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LikertOption extends Model
{
    protected $fillable = [
        'value',
        'label',
        'description',
        'order',
        'is_active'
    ];

    protected $casts = [
        'value' => 'integer',
        'order' => 'integer',
        'is_active' => 'boolean'
    ];

    // Scope for active options
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    // Scope for ordered options
    public function scopeOrdered($query)
    {
        return $query->orderBy('order');
    }

    // Get all active options in order
    public static function getActiveOptions()
    {
        return self::active()
            ->ordered()
            ->get()
            ->map(function ($option) {
                return [
                    'value' => (string) $option->value,
                    'label' => $option->label,
                    'description' => $option->description
                ];
            })
            ->toArray();
    }
}
