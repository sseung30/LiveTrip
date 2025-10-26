'use client';

import { useEffect } from 'react';
import { toast } from '@/components/toast';

export default function ToastOnMount({ message }: { message: string }) {
  useEffect(() => {
    if (message) {
      toast({ message, eventType: 'error' });
    }
  }, [message]);

  return null;
}

