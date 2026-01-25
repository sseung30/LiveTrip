'use client';

import { useState } from 'react';
import ReservationCard from '@/domain/activities/components/reservation/ReservationCard';
import type { ActivityDetail } from '@/domain/activities/type';

interface ActivityDetailProps {
  activity: ActivityDetail;
  isMyActivity: boolean;
}

export default function ActivityDetailClient({
  activity,
  isMyActivity,
}: ActivityDetailProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [participantCount, setParticipantCount] = useState(1);

  if (isMyActivity) {
    return null;
  }

  return (
    <div className='lg:col-span-1'>
      <ReservationCard
        activity={activity}
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
