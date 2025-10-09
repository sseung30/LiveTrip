import Pagination from '@/components/pagination/Pagination';
import AllActivitySection from '@/domain/home/AllActivitySection';
import PopularActivitySection from '@/domain/home/PopularActivitySection';

export default function Home() {
  return (
    <div className='flex-center w-full flex-col gap-20'>
      <PopularActivitySection />
      <AllActivitySection />
      {/* <Pagination /> */}
    </div>
  );
}
