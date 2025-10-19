import Image from 'next/image';

interface StarRatingProps {
  rating: number;
  reviewCount: number;
  size?: 'sm' | 'md';
}

const STAR_SIZES = {
  sm: { width: 14, height: 14 },
  md: { width: 16, height: 16 },
} as const;

export default function StarRating({
  rating,
  reviewCount,
  size = 'sm',
}: StarRatingProps) {
  const starSize = STAR_SIZES[size];

  return (
    <div className='flex items-center gap-2'>
      <Image
        src='/icons/star.svg'
        alt='별점'
        width={starSize.width}
        height={starSize.height}
      />
      <span className='text-sm font-medium text-gray-900'>
        {rating} ({reviewCount})
      </span>
    </div>
  );
}
