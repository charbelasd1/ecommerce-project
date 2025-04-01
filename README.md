# Charbel-Ecomm

An e-commerce website built with **Angular Framework**, **Fake Store API**, and **Firebase Authentication**.

## Features

### 🛍️ Product Features
- Products listing with pagination
- Filter and sort product list by category/price
- Search functionality across all products
- Single product view with similar items recommendation
- Special "Sale" section for discounted items

### 🛒 Cart Functionality
- Add/remove items from cart
- Adjust item quantities
- Apply discount codes
- Secure checkout process

### 👤 User Management
- Firebase authentication (login/register)
- User profile dashboard
- Order history tracking
- Account settings

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- Angular CLI (v17+)
- Docker (optional, for containerized deployment)

### Installation
```bash
# Clone the repository
git clone https://github.com/charbelasd1/ecomm-proj.git
cd ecomm-proj

# Install dependencies
npm install

# Install Angular CLI globally (if not already installed)
npm install -g @angular/cli
```
### Running the Project
```bash
# Start the development server
ng serve
```
### 🧪 Testing
```bash
# Run unit tests
ng test
# Run tests in watch mode
ng test --watch

# Run tests in CI mode (single run)
ng test --watch=false --browsers=ChromeHeadless

# Run tests via Docker
docker-compose run test
```
### Further help

To get more help on the Angular CLI use ng help or go check out the Angular CLI Overview and Command Reference page.