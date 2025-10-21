'use client';

import { useState } from 'react';
import CardList from '@/components/cardList/CardList';
import SideMenu from '@/components/side-menu';
import StateBadge from '@/components/stateBadge/StateBadge';
import Input from '@/components/ui/Input/Input';

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
          <StateBadge state='canceled' />
          <StateBadge state='pending' />
          <StateBadge state='declined' />
          <StateBadge state='completed' />
          <StateBadge state='confirmed' />
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmailValue(e.target.value);
            }}
          />
          <Input
            label='비밀번호'
            placeholder='비밀번호를 입력해 주세요'
            type='password'
            value={passwordValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmailValue(e.target.value);
            }}
          />
        </div>
      </div>

      {/* CardList 테스트 */}
      <div>
        <h2 className='mb-4 text-xl font-semibold text-gray-800'>
          CardList 컴포넌트
        </h2>
        <div className='flex flex-col gap-4'>
          <CardList
            state='completed'
            title='함께 배우면 즐거운 스트릿 댄스'
            date='2023.02.14'
            startTime='11:00'
            endTime='12:30'
            price={35000}
            capacity={10}
            onChangeReservation={() => {
              console.log('예약 변경');
            }}
            onCancelReservation={() => {
              console.log('예약 취소');
            }}
            onWriteReview={() => {
              console.log('후기 작성');
            }}
          />
          <CardList
            state='canceled'
            title='내 강아지 사진 찍어주기'
            date='2023.02.11'
            startTime='13:00'
            endTime='14:00'
            price={35000}
            capacity={1}
            onChangeReservation={() => {
              console.log('예약 변경');
            }}
            onCancelReservation={() => {
              console.log('예약 취소');
            }}
            onWriteReview={() => {
              console.log('후기 작성');
            }}
          />
          <CardList
            state='completed'
            title='열기구 페스티벌'
            date='2025.08.28'
            startTime='11:00'
            endTime='12:30'
            price={70000}
            capacity={2}
            onChangeReservation={() => {
              console.log('예약 변경');
            }}
            onCancelReservation={() => {
              console.log('예약 취소');
            }}
            onWriteReview={() => {
              console.log('후기 작성');
            }}
          />
        </div>
      </div>
    </div>
  );
}
