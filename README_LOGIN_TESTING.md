# Login Testing Instructions

This document provides instructions on how to test the login functionality with the users created by the factories.

## Seeding the Database

To create test users with the correct roles and the common password, run the following command:

```bash
php artisan db:seed --class=UserRoleSeeder
```

This will create three users:
1. Calon Pembeli (role: calon_pelanggan)
   - Email: calon_pembeli@gmail.com
   - Password: password123

2. Marketing (role: marketing)
   - Email: marketing@gmail.com
   - Password: password123

3. Manager (role: manager)
   - Email: manager@gmail.com
   - Password: password123

## Running the Tests

To run the login tests, use the following command:

```bash
php artisan test --filter=LoginTest
```

This will run the three test methods:
- `calon_pelanggan_can_login`
- `marketing_can_login`
- `manager_can_login`

## Manual Testing

You can also manually test the login functionality by:

1. Starting the development server:
   ```bash
   php artisan serve
   ```

2. Navigating to the login page:
   ```
   http://localhost:8000/login
   ```

3. Entering the credentials for any of the test users:
   - Calon Pembeli: calon_pembeli@gmail.com / password123
   - Marketing: marketing@gmail.com / password123
   - Manager: manager@gmail.com / password123

4. Clicking the "Log in" button

Each user should be redirected to their respective dashboard based on their role.

## Factories

The user factories are located in the `database/factories` directory:
- `PelangganFactory.php` for calon_pelanggan users
- `MarketingFactory.php` for marketing users
- `ManagerFactory.php` for manager users

All factories use the same password (`password123`) for easy testing.

## Troubleshooting

If you encounter any issues with seeding or testing:

1. Make sure you have run the migrations:
   ```bash
   php artisan migrate
   ```

2. If you get a "Class not found" error, make sure the factories explicitly define the model they should use:
   ```php
   protected $model = User::class;
   ```

3. If you get a "Field 'phone' doesn't have a default value" error, make sure the factories include a phone number in their definition:
   ```php
