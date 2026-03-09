'use client';

import { useState } from 'react';
import { RatingStars } from './rating-stars';
import { ReviewCard } from './review-card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface ReviewsSectionProps {
  rating: number;
  reviewCount: number;
  ratingBreakdown: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  reviews: any[];
}

export function ReviewsSection({
  rating,
  reviewCount,
  ratingBreakdown,
  reviews
}: ReviewsSectionProps) {
  const [sortBy, setSortBy] = useState('helpful');
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const chartData = [
    { name: '5★', value: ratingBreakdown[5], percentage: (ratingBreakdown[5] / reviewCount) * 100 },
    { name: '4★', value: ratingBreakdown[4], percentage: (ratingBreakdown[4] / reviewCount) * 100 },
    { name: '3★', value: ratingBreakdown[3], percentage: (ratingBreakdown[3] / reviewCount) * 100 },
    { name: '2★', value: ratingBreakdown[2], percentage: (ratingBreakdown[2] / reviewCount) * 100 },
    { name: '1★', value: ratingBreakdown[1], percentage: (ratingBreakdown[1] / reviewCount) * 100 }
  ];

  const filteredReviews = selectedRating
    ? reviews.filter((r) => r.rating === selectedRating)
    : reviews;

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      <div className="bg-gray-50 rounded-lg p-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Overall Rating */}
          <div className="space-y-4">
            <div>
              <p className="text-4xl font-bold text-gray-900">{rating.toFixed(1)}</p>
              <RatingStars rating={rating} />
              <p className="text-sm text-gray-600 mt-2">
                Based on {reviewCount.toLocaleString()} customer reviews
              </p>
            </div>
            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
              Write a Product Review
            </Button>
          </div>

          {/* Right: Rating Breakdown */}
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((stars) => (
              <button
                key={stars}
                onClick={() => setSelectedRating(selectedRating === stars ? null : stars)}
                className={`w-full flex items-center gap-3 p-2 rounded transition ${
                  selectedRating === stars ? 'bg-orange-100' : 'hover:bg-gray-100'
                }`}
              >
                <span className="text-sm font-medium w-6">{stars}★</span>
                <div className="flex-1 h-2 bg-gray-300 rounded overflow-hidden">
                  <div
                    className="h-full bg-yellow-400"
                    style={{ width: `${chartData[5 - stars].percentage}%` }}
                  />
                </div>
                <span className="text-xs text-gray-600 w-12 text-right">
                  {ratingBreakdown[stars as keyof typeof ratingBreakdown]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold">Customer Reviews</h3>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm"
          >
            <option value="helpful">Most Helpful</option>
            <option value="recent">Most Recent</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
          </select>
        </div>

        {filteredReviews.length === 0 ? (
          <div className="text-center py-8 text-gray-600">
            No reviews found for the selected filter.
          </div>
        ) : (
          <div>
            {filteredReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
