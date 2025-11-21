/**
 * Header Component
 * 
 * Main navigation header with logo, menu, search, and cart icon.
 * Sticky positioning for better UX. Responsive design with mobile menu.
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/components/cart/CartProvider';

export default function Header() {
  const pathname = usePathname();
  const { cart } = useCart();
  
  /**
   * Check if a navigation link is active
   */
  const isActive = (path: string) => pathname === path;
  
  return (
    <header className="sticky top-0 z-50 flex items-center justify-center bg-white/80 dark:bg-background-dark/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      <nav className="flex items-center justify-between whitespace-nowrap px-4 sm:px-10 py-3 w-full max-w-7xl">
        {/* Logo and Brand */}
        <div className="flex items-center gap-4 text-deep-navy dark:text-white">
          <Link href="/" className="flex items-center gap-2">
            {/* Logo Icon */}
            <div className="size-6 text-primary">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path 
                  clipRule="evenodd" 
                  d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" 
                  fill="currentColor" 
                  fillRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold leading-tight tracking-[-0.015em]">
              Procure Marine
            </h2>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 justify-end gap-8">
          <div className="flex items-center gap-9">
            <Link 
              href="/" 
              className={`text-sm font-medium leading-normal transition-colors ${
                isActive('/') 
                  ? 'text-primary dark:text-primary font-bold' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/products" 
              className={`text-sm font-medium leading-normal transition-colors ${
                isActive('/products') 
                  ? 'text-primary dark:text-primary font-bold' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary'
              }`}
            >
              Products
            </Link>
            <Link 
              href="/about" 
              className={`text-sm font-medium leading-normal transition-colors ${
                isActive('/about') 
                  ? 'text-primary dark:text-primary font-bold' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary'
              }`}
            >
              About Us
            </Link>
            <Link 
              href="/contact" 
              className="text-sm font-medium leading-normal text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </div>
          
          {/* Cart Button with Item Count */}
          <Link 
            href="/cart"
            className="relative flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90 transition-colors"
          >
            <span className="material-symbols-outlined mr-2">shopping_cart</span>
            <span className="truncate">Cart</span>
            {/* Cart item count badge */}
            {cart.totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent-orange text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                {cart.totalItems}
              </span>
            )}
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          {/* Cart Icon for Mobile */}
          <Link 
            href="/cart"
            className="relative p-2 text-gray-800 dark:text-gray-200"
          >
            <span className="material-symbols-outlined text-3xl">shopping_cart</span>
            {cart.totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-accent-orange text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cart.totalItems}
              </span>
            )}
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button className="text-gray-800 dark:text-gray-200">
            <span className="material-symbols-outlined text-3xl">menu</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
