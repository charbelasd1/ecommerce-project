/**
 * Interface representing a product in the e-commerce system
 * Contains all essential information about a product listing
 */
export interface Product {
  /** Unique identifier for the product */
  id : number;
  /** Name/title of the product */
  title: string;
  /** Product's price in the store's currency */
  price: number;
  /** Detailed description of the product */
  description: string;
  /** Product's category classification */
  category : string;
  /** URL to the product's image */
  image: string;
  /** Product's rating information */
  rating : {
    /** Average rating score from customers */
    rate: number;
    /** Number of ratings received */
    count: number;
  }
}