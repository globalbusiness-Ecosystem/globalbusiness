'use client';

import { useState } from 'react';
import { usePiAuth } from '@/contexts/pi-auth-context';
import { PRODUCT_CONFIG } from '@/lib/product-config';

interface PaymentButtonProps {
  className?: string;
}

export function PaymentButton({ className = '' }: PaymentButtonProps) {
  const { products, sdk } = usePiAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const product = products?.find(
    (p) => p.id === PRODUCT_CONFIG.PRODUCT_6a37e9dcce795c1541aefdb2
  );

  if (!product) {
    return (
      <button
        disabled
        className={`px-6 py-2 bg-gray-600 text-white rounded-lg font-semibold opacity-50 cursor-not-allowed ${className}`}
      >
        Loading...
      </button>
    );
  }

  const handlePayment = async () => {
    if (!sdk) {
      setError('SDK not initialized');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await sdk.makePurchase(product.slug);

      if (result.ok) {
        setSuccess(true);
        setError(null);
        // Reset success message after 3 seconds
        setTimeout(() => setSuccess(false), 3000);
        console.log('[Payment] Success:', {
          productId: result.productId,
          paymentId: result.paymentId,
          txid: result.txid,
        });
      } else {
        setError('Payment failed. Please try again.');
      }
    } catch (err: any) {
      const errorCode = err?.code;
      let errorMessage = 'Payment failed. Please try again.';

      if (errorCode === 'product_not_found') {
        errorMessage = 'Product not found';
      } else if (errorCode === 'purchase_cancelled') {
        errorMessage = 'Payment cancelled';
      } else if (errorCode === 'purchase_error') {
        errorMessage = 'Payment error. Please try again.';
      }

      setError(errorMessage);
      console.error('[Payment] Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handlePayment}
        disabled={isLoading || success}
        className={`px-8 py-3 bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-700 disabled:cursor-not-allowed text-black font-bold rounded-lg transition-colors duration-200 ${className}`}
      >
        {isLoading ? 'Processing...' : success ? '✓ Purchase Complete' : `Access Platform - ${product.price_in_pi} Pi`}
      </button>
      {error && <p className="text-red-400 text-sm font-medium">{error}</p>}
      {success && (
        <p className="text-green-400 text-sm font-medium">
          Welcome to GlobalBusiness Ecosystem!
        </p>
      )}
    </div>
  );
}
