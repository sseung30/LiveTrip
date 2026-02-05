'use client';

import { FormProvider } from 'react-hook-form';
import { useActivityForm } from '@/domain/activity/components/management/RegistrationForm/hooks/useActivityForm';
import { useActivityRegistration } from '@/domain/activity/components/management/RegistrationForm/hooks/useActivityRegistration';
import { useTimeSlot } from '@/domain/activity/components/management/RegistrationForm/hooks/useTimeSlot';
import InnerRegistrationForm from '@/domain/activity/components/management/RegistrationForm/InnerRegistrationForm';
import type { ActivityDetail, RegisterFormMode } from '@/domain/activity/types';

interface RegistrationFormProps {
  mode: RegisterFormMode;
  initialData?: ActivityDetail;
  isSubmitting?: boolean;
}

export default function RegistrationForm({
  mode,
  initialData,
  isSubmitting,
}: RegistrationFormProps) {
  const { ...methods } = useActivityForm(initialData);
  const {
    timeSlots,
    handleAddTimeSlot,
    handleRemoveTimeSlot,
    handleChangeTimeSlot,
  } = useTimeSlot(initialData?.schedules ?? []);

  const { registerActivity, isSubmitting: isSubmittingMutation } =
    useActivityRegistration(mode, initialData);

  const onSubmit = (formData: any) => {
    registerActivity({ formData, timeSlots });
  };

  return (
    <FormProvider {...methods}>
      <InnerRegistrationForm
        isSubmitting={isSubmitting || isSubmittingMutation}
        handleSubmit={methods.handleSubmit}
        mode={mode}
        timeSlots={timeSlots}
        onSubmit={onSubmit}
        onAddTimeSlot={handleAddTimeSlot}
        onRemoveTimeSlot={handleRemoveTimeSlot}
        onChangeTimeSlot={handleChangeTimeSlot}
      />
    </FormProvider>
  );
}
