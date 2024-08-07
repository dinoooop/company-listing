# Company Listing
The application allow you to manage companies and its employees.

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