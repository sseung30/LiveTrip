import Pagination from '@/components/pagination/Pagination';
import Card from '@/domain/home/Card';
import PopularActivitySection from '@/domain/home/PopularActivitySection';

export default function Home() {
  return (
    <div className='flex-center w-full'>
      <PopularActivitySection />
      {/* <Pagination /> */}
    </div>
  );
}
