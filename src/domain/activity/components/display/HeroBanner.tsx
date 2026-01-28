import Image from 'next/image';

const _BLUR_DATA_URL =
  'data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAABwAABAAAQUxQSAwAAAABD9D/iAjMf0T/AwJWUDggaAAAAFADAJ0BKggABQABQCYlsAJ0ugH4AfiA2QD9ALNuBl96kA6gAP75Z51e8FBt59L/pGne0IdQe7jaWeCEH7/+S3vqolH2ah3O6qfMh0gN/+5J/8/p/7AOE78+/y4j2kjwb8Bs5k/m0AAA';

export default function HeroBanner() {
  return (
    <>
      <section className='relative w-fit rounded-3xl shadow-sm'>
        <div className='absolute right-0 left-0 h-full rounded-3xl bg-linear-to-b from-black/0 to-black/70' />
        <Image
          priority
          className='aspect-[11/6] h-auto w-full max-w-full rounded-3xl object-cover xl:w-[70rem]'
          src='/images/activities/unsplash_0yUw1_FEFO0-activity.webp'
          fetchPriority='high'
          placeholder='blur'
          blurDataURL={_BLUR_DATA_URL}
          alt=''
          width={1120}
          height={610}
        />
        <div className='margin-auto absolute bottom-9 flex w-full flex-col gap-2 text-white md:bottom-[4.5rem] md:gap-3.5 xl:bottom-24 xl:gap-5'>
          <h1 className='text-18 md:text-24 xl:text-32 text-center font-bold'>
            함께 배우면 즐거운 스트릿 댄스
          </h1>
          <div className='text-14 md:text-16 xl:text-18 text-center font-medium xl:font-bold'>
            1월의 인기 체험 BEST 🔥
          </div>
        </div>
      </section>
    </>
  );
}
