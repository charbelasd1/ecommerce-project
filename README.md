# <img src="./src/assets/hug.png" alt="Logo" width="50" style="vertical-align: middle; margin-bottom:10px"/> Aïah

An e-commerce website built with **Angular Framework**, **Fake Store API**, and local data. While the Fake Store API provides only 4 categories, I added a fifth one, "skincare," in honor of my friend Ayah, who's always dreamed of having her own e-pharmacy, hence the name of the project **Aïah** 😊

<div style="text-align: center;">
  <img src="./src/assets/aiah 2.png" alt="Home Page" width="800px" style="display:block; margin: 0 auto;"/>
</div>

## Technologies Used

- This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.8.
- **Fake Stroe API**: https://fakestoreapi.com/docs
- **Authentication API**: http://173.249.40.235:5005/swagger/index.html#/

## User Features

### Products

<table>
  <tr>
    <td>
      <img src="./src/assets/aiah products.png" alt="Products Page" width="700px" style="display:inline;"/>
    </td>
    <td >
      <ul>
        <li>Products listing</li>
        <li>Filter and sort product list</li>
        <li>Search through products</li>
        <li>Single product view <em>(displays similar items)</em></li>
        <li>View products on Sale <em>(can be also viewed in the "Sale" tab)</em></li>
      </ul>
    </td>
  </tr>
</table>

### Cart

<table>
  <tr>
    <td>
      <img src="./src/assets/aiah cart.png" alt="Cart Page" width="700px" style="display:inline;"/>
    </td>
    <td >
      <ul>
        <li>Add items to cart</li>
        <li>Update cart</li>
        <li>Delete cart</li>
        <li>Increase/Decrease cart item quantity</li>
        <li>Remove cart item</li>
        <li>Use discount code at checkout</li>
      </ul>
    </td>
  </tr>
</table>

### User Profile

<table>
  <tr>
    <td>
      <img src="./src/assets/aiah profile.png" alt="Profile Page" width="700px" style="display:inline;"/>
    </td>
    <td >
      <ul>
        <li>View user details</li>
        <li>View previous orders</li>
      </ul>
    </td>
  </tr>
</table>

## Steps to Run the Project

1. **Clone the repository**:
   ```bash
   git clone https://github.com/hi6a/aiah-ecommerce.git
   ```
2. **Navigate to the project directory and install Angular CLI**:

   ```bash
   cd diretory-name
   npm install -g @angular/cli
   ```

3. **Install project dependencies**:

   ```bash
   npm install
   ```

4. **Start the development server**:

   ```bash
   ng serve
   ```

5. Open `http://localhost:4200/` in your browser.
