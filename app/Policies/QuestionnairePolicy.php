<?php

namespace App\Policies;

use App\Models\User;

class QuestionnairePolicy
{
    /**
     * Determine whether the user can view questionnaires.
     */
    public function view(User $user): bool
    {
        return true; // Both admin and user can view
    }

    /**
     * Determine whether the user can import questionnaires.
     */
    public function import(User $user): bool
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can create questionnaires.
     */
    public function create(User $user): bool
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can update questionnaires.
     */
    public function update(User $user): bool
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can delete questionnaires.
     */
    public function delete(User $user): bool
    {
        return $user->isAdmin();
    }
}
