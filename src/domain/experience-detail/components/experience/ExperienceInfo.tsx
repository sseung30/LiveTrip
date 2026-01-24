import type { ExperienceInfoProps } from '@/domain/experience-detail/type';
import KakaoMap from '@/components/ui/KakaoMap';
import Section from '@/components/ui/Section';

export default function ExperienceInfo({
  description,
  address,
}: ExperienceInfoProps) {
  return (
    <div className='space-y-8'>
      {/* 체험 설명 */}
      <Section title='체험 설명'>
        <p>{description}</p>
      </Section>

      {/* 오시는 길 */}
      <Section title='오시는 길'>
        <p className='mb-4'>{address}</p>
        <KakaoMap address={address} />
      </Section>
    </div>
  );
}
