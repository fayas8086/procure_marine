/**
 * Product Card Component
 * 
 * Displays a single product in a card format with image, name, part number,
 * stock status, and action button. Used in product grids and listings.
 */

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/types';

interface ProductCardProps {
  /** Product data to display */
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Determine button text and style based on stock status and price type
  const isInStock = product.stockStatus === 'in-stock';
  const isPriceOnRequest = product.price.type === 'on-request';
  
  const buttonText = isPriceOnRequest ? 'Request Quote' : 'View Details';
  const buttonClass = isPriceOnRequest
    ? 'text-primary bg-primary/20 hover:bg-primary/30'
    : 'text-white bg-primary hover:bg-primary/90';
  
  // Format stock status for display
  const stockStatusText = {
    'in-stock': 'In Stock',
    'on-request': 'On Request',
    'out-of-stock': 'Out of Stock',
  }[product.stockStatus];
  
  const stockStatusClass = {
    'in-stock': 'text-green-600 dark:text-green-400',
    'on-request': 'text-yellow-600 dark:text-yellow-400',
    'out-of-stock': 'text-red-600 dark:text-red-400',
  }[product.stockStatus];
  
  return (
    <div className="flex flex-col gap-3 pb-3 bg-card-light dark:bg-card-dark rounded-xl border border-gray-200 dark:border-gray-700/50 overflow-hidden group hover:shadow-lg transition-shadow">
      {/* Product Image */}
      <Link href={`/products/${product.slug}`}>
        <div className="w-full bg-center bg-no-repeat aspect-square bg-cover bg-gray-100 relative overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>
      
      {/* Product Info */}
      <div className="px-4 pb-4 flex flex-col flex-grow">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-base font-bold leading-normal flex-grow hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-normal leading-normal mt-1">
          Part Number: {product.partNumber}
        </p>
        
        {/* Stock Status */}
        <p className={`text-sm font-medium leading-normal mt-2 ${stockStatusClass}`}>
          {stockStatusText}
        </p>
        
        {/* Action Button */}
        <Link href={`/products/${product.slug}`}>
          <button 
            className={`mt-4 w-full ${buttonClass} focus:ring-4 focus:outline-none focus:ring-primary/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors`}
          >
            {buttonText}
          </button>
        </Link>
      </div>
    </div>
  );
}
