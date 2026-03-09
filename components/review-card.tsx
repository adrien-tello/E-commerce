'use client';

import { RatingStars } from './rating-stars';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { useState } from 'react';

interface Review {
  id: string;
  author: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  helpful: number;
  unhelpful: number;
  verified: boolean;
  images?: string[];
}

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const [helpful, setHelpful] = useState(review.helpful);
  const [unhelpful, setUnhelpful] = useState(review.unhelpful);
  const [userVote, setUserVote] = useState<'helpful' | 'unhelpful' | null>(null);

  const handleHelpful = () => {
    if (userVote === 'helpful') {
      setHelpful(helpful - 1);
      setUserVote(null);
    } else {
      if (userVote === 'unhelpful') {
        setUnhelpful(unhelpful - 1);
      }
      setHelpful(helpful + 1);
      setUserVote('helpful');
    }
  };

  const handleUnhelpful = () => {
    if (userVote === 'unhelpful') {
      setUnhelpful(unhelpful - 1);
      setUserVote(null);
    } else {
      if (userVote === 'helpful') {
        setHelpful(helpful - 1);
      }
      setUnhelpful(unhelpful + 1);
      setUserVote('unhelpful');
    }
  };

  return (
    <div className="border-b pb-6 mb-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <RatingStars rating={review.rating} size="sm" />
            <h3 className="font-bold text-gray-900">{review.title}</h3>
          </div>
          
          {review.verified && (
            <p className="text-xs text-green-600 mb-2">✓ Verified Purchase</p>
          )}
          
          <p className="text-sm text-gray-700 mb-3">{review.content}</p>
          
          <div className="flex items-center gap-4">
            <button
              onClick={handleHelpful}
              className={`flex items-center gap-1 text-xs transition ${
                userVote === 'helpful' ? 'text-orange-500' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <ThumbsUp size={16} />
              Helpful ({helpful})
            </button>
            <button
              onClick={handleUnhelpful}
              className={`flex items-center gap-1 text-xs transition ${
                userVote === 'unhelpful' ? 'text-orange-500' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <ThumbsDown size={16} />
              Not helpful ({unhelpful})
            </button>
          </div>
        </div>
        
        <div className="text-right text-xs text-gray-600 ml-4">
          <p>{review.author}</p>
          <p>{review.date}</p>
        </div>
      </div>
    </div>
  );
}
