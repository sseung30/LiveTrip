import Pagination from '@/components/pagination/Pagination';
import Card from '@/domain/home/Card';

export default function Home() {
  return (
    <section className='flex-center'>
      <Card src='/images/activities/1-activity.png' alt='' />
      <Card src='/images/activities/2-activity.png' alt='' />
      <Card src='/images/activities/3-activity.png' alt='' />
      {/* <Pagination /> */}
    </section>
  );
}
