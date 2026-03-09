'use client';

import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onRate?: (rating: number) => void;
}

export function RatingStars({
  rating,
  reviewCount,
  size = 'md',
  interactive = false,
  onRate
}: RatingStarsProps) {
  const sizeMap = {
    sm: 16,
    md: 20,
    lg: 24
  };

  const iconSize = sizeMap[size];
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-0.5">
        {stars.map((star) => {
          const isFilled = star <= Math.round(rating);
          const isHalf = star === Math.ceil(rating) && rating % 1 !== 0;

          return (
            <button
              key={star}
              onClick={() => onRate?.(star)}
              disabled={!interactive}
              className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
            >
              <Star
                size={iconSize}
                className={`${
                  isFilled || isHalf ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                }`}
              />
            </button>
          );
        })}
      </div>
      {reviewCount !== undefined && (
        <span className="text-sm text-gray-600 ml-1">
          {rating.toFixed(1)} ({reviewCount.toLocaleString()} reviews)
        </span>
      )}
    </div>
  );
}
