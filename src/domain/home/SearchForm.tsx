import Image from 'next/image';

export default function SearchForm() {
  return (
    <form className='flex-center relative w-full px-0 md:px-10'>
      <Image
        src='/icons/search.svg'
        alt='돋보기 아이콘'
        className='absolute left-4 md:left-15'
        width={24}
        height={24}
      />
      <input
        placeholder='내가 원하는 체험은'
        className='w-full rounded-3xl py-3.5 pl-12 shadow-md md:pl-14'
      />
      <button className='bg-primary-500 text-14 absolute right-2 rounded-xl px-4.5 py-2.5 text-white md:right-13'>
        검색하기
      </button>
    </form>
  );
}
