<?php

namespace App\Policies;

use App\Models\User;

class ClusterPolicy
{
    /**
     * Determine whether the user can view cluster results.
     */
    public function view(User $user): bool
    {
        return true; // Both admin and user can view
    }

    /**
     * Determine whether the user can run cluster analysis.
     */
    public function run(User $user): bool
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can export cluster results.
     */
    public function export(User $user): bool
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can manage cluster settings.
     */
    public function manage(User $user): bool
    {
        return $user->isAdmin();
    }
}
