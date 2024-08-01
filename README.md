# Company Listing
The application allow you to manage companies and its employees.

## Features
Basic Laravel Auth: ability to log in as administrator
Use database seeds to create first user with email admin@admin.com and password “password”
CRUD functionality (Create / Read / Update / Delete) for two menu items: Companies and Employees.
Companies DB table consists of these fields: Name (required), email, logo (minimum 100×100), website
Employees DB table consists of these fields: First name (required), last name (required), Company (foreign key to Companies), email, phone
Use database migrations to create those schemas above
Store companies logos in storage/app/public folder and make them accessible from public
Use basic Laravel resource controllers with default methods – index, create, store etc.
Use Laravel’s validation function, using Request classes
Use Laravel’s pagination for showing Companies/Employees list, 10 entries per page
Use Laravel make:auth as default Bootstrap-based design theme, but remove ability to register
API with authentication (user listing with company details after logged in)


## Installation
PHP 8.1 and Laravel 9 or higher are required.



## .env Configuration
To configure your Laravel application and connect to the database, update the following settings in `.env` file.

```dotenv
APP_URL=http://localhost:8000

DB_CONNECTION=sqlite
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=E:\company-listing\database\company_listing.sqlite3
DB_USERNAME=root
DB_PASSWORD=
```


To install all dependencies, run the following command
```sh
composer install
```

Run the following cammand to creates a symbolic link from the public/storage directory to the storage/app/public directory. So that you can view the images in browser.
```sh
php artisan storage:link
```

To ensure the security of the application you have to run the following command to generate a key.
```sh
php artisan key:generate
```

Run the following command to create all required table for the application 
```sh
php artisan migrate
```

For easy testing, application come up with dummy data. Seed it.
```sh
php artisan db:seed
```

Run the following command to starts a local development server for your Laravel application
```sh
php artisan serve
```

## Test User Account

The seed command will create a test user accounts for your convenience. You can use the following email address to access the test account:

**Test User Email:** `admin@admin.com`
**Test User password:** `password`


## Configure Client

Inside the client directory you have .env, you can specify the api url
REACT_APP_API = http://127.0.0.1:8000/api

Open another terminal
```sh
cd client
npm install
npm start
```