# Multi-Panel System Documentation

## Overview

This document describes the multi-panel system implementation for Laravel 12 + Inertia.js (React) + Tailwind 4 + Shadcn project, providing separated admin and user panels.

## System Architecture

### 1. User Roles

- **Admin**: Full system access with CRUD operations
- **User**: Limited access to profile and read-only data

### 2. Database Changes

#### Users Table Migration

- Added `role` ENUM column with values: `admin`, `user`
- Default value: `user`

#### User Model Updates

- Added `role` to `$fillable` array
- Added helper methods: `isAdmin()`, `isUser()`

#### Database Seeder

- **Admin User**: admin@kejati.go.id / admin123
- **Regular User**: user@kejati.go.id / user123

### 3. Middleware

#### RoleMiddleware

- Location: `app/Http/Middleware/RoleMiddleware.php`
- Registered as `role` alias in `bootstrap/app.php`
- Usage: `middleware('role:admin')` or `middleware('role:user')`

### 4. Route Structure

#### Common Routes

- `/dashboard` - Entry point that redirects based on user role

#### Admin Panel Routes (Prefix: `/admin`)

All protected with `middleware(['auth', 'verified', 'role:admin'])`

- `/admin/dashboard` - Admin dashboard
- `/admin/employees` - Employee CRUD operations
    - `/admin/employees/create` - Add new employee
    - `/admin/employees/{id}/edit` - Edit employee
    - `/admin/employees/{id}` - View employee details
- `/admin/questionnaires/upload` - CSV questionnaire upload
- `/admin/clusters/analysis` - Clustering analysis interface
- `/admin/clusters/run` - Execute clustering algorithm
- `/admin/clusters/export-pdf` - Export results as PDF

#### User Panel Routes (Prefix: `/user`)

All protected with `middleware(['auth', 'verified', 'role:user'])`

- `/user/dashboard` - User dashboard
- `/user/profile` - Profile management
- `/user/results` - View cluster results (read-only)

### 5. Controllers

#### DashboardController

- `index()` - Route users to appropriate dashboard based on role

#### Admin Controllers

- `Admin\EmployeeController` - Employee CRUD operations
- `Admin\QuestionnaireImportController` - CSV file upload and processing
- `Admin\ClusterController` - Clustering analysis management

#### User Controllers

- `User\UserProfileController` - Profile management
- `User\UserResultController` - Read-only cluster results view

### 6. Policies

#### EmployeePolicy

- Only admins can perform CRUD operations

#### QuestionnairePolicy

- Import: Admin only
- View: Both admin and user

#### ClusterPolicy

- Run/Export: Admin only
- View: Both admin and user

#### UserPolicy

- Profile updates: Owner only
- View: Owner or admin

### 7. React Components

#### Layouts

- `AdminLayout.jsx` - Admin panel layout with AdminSidebar
- `UserLayout.jsx` - User panel layout with UserSidebar

#### Admin Pages

- `Admin/Dashboard/Index.jsx` - Admin dashboard with metrics
- `Admin/Employees/Index.jsx` - Employee listing
- `Admin/Employees/Create.jsx` - Add new employee form
- `Admin/Questionnaires/Upload.jsx` - CSV upload interface
- `Admin/Clusters/Analysis.jsx` - Clustering analysis tools

#### User Pages

- `User/Dashboard/Index.jsx` - User dashboard
- `User/Profile/Index.jsx` - Profile management form
- `User/Results/Index.jsx` - Read-only cluster results

### 8. Inertia Middleware Updates

#### HandleInertiaRequests

Enhanced user data sharing:

```javascript
'auth' => [
    'user' => [
        'id', 'name', 'email', 'role',
        'email_verified_at', 'created_at',
        'is_admin', 'is_user'
    ]
]
```

## Access Control Summary

### Admin Capabilities

- ✅ Full employee CRUD operations
- ✅ Upload and manage questionnaires
- ✅ Run clustering algorithms
- ✅ Export cluster results as PDF
- ✅ View all system analytics
- ✅ Manage system settings

### User Capabilities

- ✅ View personal dashboard
- ✅ Update own profile
- ✅ View cluster results (read-only)
- ❌ No access to admin functions
- ❌ Cannot modify system data
- ❌ Cannot run clustering analysis

## Database Commands

### Fresh Installation

```bash
php artisan migrate:refresh --seed
```

### Check Routes

```bash
# Admin routes
php artisan route:list --name=admin

# User routes
php artisan route:list --name=user
```

## Security Features

1. **Role-based Middleware**: Automatic role verification
2. **Policy Protection**: Controller-level access control
3. **Route Guards**: URL-level protection
4. **UI Separation**: Complete interface separation
5. **Data Isolation**: Users only see their own data

## Future Enhancements

1. **Employee Model**: Create dedicated Employee model and migrations
2. **Questionnaire System**: Implement full questionnaire management
3. **Clustering Algorithms**: Integrate actual ML clustering algorithms
4. **PDF Export**: Add PDF generation functionality
5. **Audit Logging**: Track user actions and changes
6. **Email Notifications**: Notify users of results
7. **Advanced Analytics**: Add more detailed reporting

## Testing

### Test Users

- **Admin**: admin@kejati.go.id / admin123
- **User**: user@kejati.go.id / user123

### Verify Installation

1. Run migrations and seeders
2. Login as admin and test admin routes
3. Login as user and test user routes
4. Verify middleware protection works
5. Test role-based redirections

## Troubleshooting

### Common Issues

1. **Missing Components**: Ensure all UI components are installed via Shadcn
2. **Route Errors**: Verify middleware is properly registered
3. **Permission Denied**: Check user roles and policies
4. **Layout Issues**: Confirm sidebar components exist

### Debug Commands

```bash
# Check middleware registration
php artisan middleware:list

# Verify policies
php artisan make:policy --help

# Route debugging
php artisan route:list
```

This multi-panel system provides a solid foundation for role-based access control with clear separation between admin and user functionalities.
