'use client';

import { useState } from 'react';
import ReservationCard from '@/domain/experience-detail/components/reservation/ReservationCard';
import type { ExperienceDetail } from '@/domain/experience-detail/type';

interface ExperienceDetailClientProps {
  experience: ExperienceDetail;
  isMyExperience: boolean;
}

export default function ExperienceDetailClient({
  experience,
  isMyExperience,
}: ExperienceDetailClientProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [participantCount, setParticipantCount] = useState(1);

  if (isMyExperience) {
    return null;
  }

  return (
    <div className='lg:col-span-1'>
      <ReservationCard
        experience={experience}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        participantCount={participantCount}
        onDateChange={setSelectedDate}
        onTimeChange={setSelectedTime}
        onParticipantChange={setParticipantCount}
      />
    </div>
  );
}
