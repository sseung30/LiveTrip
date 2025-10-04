'use client';

import { useState } from 'react';
import SideMenu from '@/components/sideMenu/SideMenu';
import StateBadge from '@/components/stateBadge/StateBadge';
import type { StateType } from '@/components/stateBadge/type';
import Input from '@/components/ui/Input/Input';

const stateTestData: StateType[] = [
  'cancelled',
  'completed',
  'rejected',
  'experience_completed',
  'approved',
];

export default function StateBadgeTestPage() {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const emailRegex = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/;
  const emailError =
    emailValue && !emailRegex.test(emailValue)
      ? '이메일 형식으로 작성해 주세요.'
      : '';

  return (
    <div className='flex min-h-screen flex-col gap-8 bg-white p-10'>
      {/* StateBadge 테스트 */}
      <div>
        <h2 className='mb-4 text-xl font-semibold text-gray-800'>
          StateBadge 컴포넌트
        </h2>
        <div className='flex flex-wrap gap-2'>
          <StateBadge state='cancelled' />
          <StateBadge state='rejected' />
          <StateBadge state='completed' />
          <StateBadge state='experience_completed' />
          <StateBadge state='approved' />
        </div>
      </div>

      {/* SideMenu 테스트 */}
      <div>
        <h2 className='mb-4 text-xl font-semibold text-gray-800'>
          SideMenu 컴포넌트
        </h2>
        <div className='flex gap-4'>
          <div className='flex flex-col gap-2'>
            <h3 className='text-sm font-medium text-gray-600'>
              Large (291x450)
            </h3>
            <SideMenu size='large' />
          </div>
          <div className='flex flex-col gap-2'>
            <h3 className='text-sm font-medium text-gray-600'>
              Small (178x342)
            </h3>
            <SideMenu size='small' />
          </div>
        </div>
      </div>

      {/* Input 테스트 */}
      <div>
        <h2 className='mb-4 text-xl font-semibold text-gray-800'>
          Input 컴포넌트
        </h2>
        <div className='flex flex-col gap-4'>
          <Input
            label='이메일'
            placeholder='이메일을 입력해 주세요'
            type='email'
            value={emailValue}
            error={emailError}
            onChange={setEmailValue}
          />
          <Input
            label='비밀번호'
            placeholder='비밀번호를 입력해 주세요'
            type='password'
            value={passwordValue}
            onChange={setPasswordValue}
          />
        </div>
      </div>
    </div>
  );
}
