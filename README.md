<h1 align="center">Laptop Catalog</h1> 

## Website features:
- User authentication & authorization with password hashing
- Laptops management (admin only)
- Pagination & filtering for laptops (included in the URL)
- React Query for advanced data fetching and caching
- Conditionally rendered UI based on logged in user
- Global state management using Zustand
- Form validation both on frontend and backend
- Responsive design
- Payment using Stripe

## Technologies and Tools Used on the backend:

- Express with TypeScript
- Prisma (ORM)
- Stripe
- JSON Web Token (JWT)
- Bcrypt

## Technologies and Tools Used on the frontend:

- React with TypeScript
- React Router
- Zustand
- Nuqs
- React hook form and zod
- TailwindCSS and shadcn/ui


## Installation and Running:

1. Clone the repository: 
  ```sh
  git clone git@github.com:sarapa-dev/laptop-catalog.git
  ```
2. Navigate to the project directory: 
  ```sh
  cd project-name
  ```
3. Install the dependencies for both backend and frontend:
 ```sh
   cd backend
   npm install

   cd frontend
   npm install
 ```
4. Open `HeidiSQL` (or `MySQL Workbench`) and load the SQL dump located in the `backend/sql_dump` folder.
5. Create a `.env` file in the root of the backend folder and configure it as follows:
 ```sh
   DATABASE_URL="mysql://username:password@localhost:3306/laptop_db"
   PORT = 5000
   JWT_SECRET = 'your_secret'
   STRIPE_SECRET_KEY = 'your_stripe_secret_key'
   STRIPE_CURRENCY = 'usd'
   FRONTEND_URL = 'http://localhost:5173'
   STRIPE_WEBHOOK_SECRET = 'your_webhook_secret'
 ```
6. Configure the Stripe CLI, refer to the official Stripe documentation at this link: https://docs.stripe.com/stripe-cli <br/>
   Then, create a new sandbox in the Stripe dashboard and run the following command in your terminal:
 ```sh
   stripe listen --forward-to localhost:5000/api/stripe/webhook
 ```
7. Start the development server first for backend, then for frontend:
 ```sh
   npm run dev
 ```
8. Open your browser and navigate to:
 ```sh
   http://localhost:5173
 ```

## Website desktop preview:
![Image](https://github.com/user-attachments/assets/404aaa1d-43ab-440c-b66f-595ca1a4ea86)
![Image](https://github.com/user-attachments/assets/da00b111-1cf1-49d6-b7e5-e813c79ca034)
![Image](https://github.com/user-attachments/assets/884156a2-1322-4c7d-84fa-a58ba150909f)
![Image](https://github.com/user-attachments/assets/65d542d6-5b0a-4da6-a055-582adc39dfc4)
