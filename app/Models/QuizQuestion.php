<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuizQuestion extends Model
{
    protected $fillable = [
        'aspect',
        'question',
        'order',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer'
    ];

    // Scope for active questions
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    // Scope for specific aspect
    public function scopeForAspect($query, $aspect)
    {
        return $query->where('aspect', $aspect);
    }

    // Scope for ordered questions
    public function scopeOrdered($query)
    {
        return $query->orderBy('order');
    }

    // Get questions grouped by aspect
    public static function getGroupedQuestions()
    {
        return self::active()
            ->ordered()
            ->get()
            ->groupBy('aspect')
            ->map(function ($questions) {
                return $questions->pluck('question')->toArray();
            });
    }

    // Constants for aspects
    const ASPECT_KNOWLEDGE = 'knowledge';
    const ASPECT_ATTITUDE = 'attitude';
    const ASPECT_BEHAVIOR = 'behavior';

    public static function getAspects()
    {
        return [
            self::ASPECT_KNOWLEDGE => 'Aspek Knowledge (Pengetahuan)',
            self::ASPECT_ATTITUDE => 'Aspek Attitude (Sikap)',
            self::ASPECT_BEHAVIOR => 'Aspek Behavior (Perilaku)'
        ];
    }
}
