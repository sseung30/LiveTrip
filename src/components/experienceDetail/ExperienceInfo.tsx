/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
'use client';

import { useEffect, useRef } from 'react';
import type { ExperienceInfoProps } from '@/components/experienceDetail/type';

/** 카카오맵 SDK 로딩 최대 대기 시간 지정(30초) */
const KAKAO_LOAD_TIMEOUT = 30000;
const SEOUL_CITY_HALL = { lat: 37.5665, lng: 126.978 };
const MAP_LEVEL = 3;

const createCustomOverlayContent = (locationName: string) => {
  return `
  <div style="position:relative;bottom:50px;background:#fff;border-radius:20px;padding:8px 12px;box-shadow:0 2px 8px rgba(0,0,0,0.15);border:2px solid #4285f4;display:flex;align-items:center;">
    <div style="width:24px;height:24px;background:#4285f4;border-radius:50%;margin-right:8px;display:flex;align-items:center;justify-content:center;">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    </div>
    <span style="font-size:13px;font-weight:bold;color:#333;">${locationName}</span>
    <div style="position:absolute;bottom:-8px;left:20px;width:0;height:0;border-left:8px solid transparent;border-right:8px solid transparent;border-top:8px solid #4285f4;"></div>
    <div style="position:absolute;bottom:-6px;left:22px;width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:6px solid #fff;"></div>
  </div>
`;
};

export default function ExperienceInfo({
  description,
  address,
}: ExperienceInfoProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current || typeof window === 'undefined') {
      return;
    }

    let isMounted = true;
    let attempts = 0;
    const maxAttempts = KAKAO_LOAD_TIMEOUT / 100;

    const createCustomOverlay = (map: any, position: any) => {
      new (window.kakao as any).maps.CustomOverlay({
        map,
        position,
        content: createCustomOverlayContent(address),
        yAnchor: 1,
      });
    };

    const handleGeocodeResult = (
      result: { x: string; y: string }[],
      status: string,
      container: HTMLElement
    ) => {
      if (!isMounted || !mapRef.current) {
        return;
      }

      if (status === (window.kakao as any).maps.services.Status.OK) {
        const coords = new (window.kakao as any).maps.LatLng(
          result[0].y,
          result[0].x
        );
        const map = new (window.kakao as any).maps.Map(container, {
          center: coords,
          level: MAP_LEVEL,
        });

        createCustomOverlay(map, coords);
      } else {
        const defaultCenter = new (window.kakao as any).maps.LatLng(
          SEOUL_CITY_HALL.lat,
          SEOUL_CITY_HALL.lng
        );

        new (window.kakao as any).maps.Map(container, {
          center: defaultCenter,
          level: MAP_LEVEL,
        });
      }
    };

    const initMap = () => {
      if (!isMounted || !mapRef.current) {
        return;
      }

      const { kakao } = window;

      kakao?.maps.load(() => {
        if (!isMounted || !mapRef.current) {
          return;
        }

        const container = mapRef.current;
        const geocoder = new kakao.maps.services.Geocoder();

        geocoder.addressSearch(address, (result: any[], status) => {
          handleGeocodeResult(result, status, container);
        });
      });
    };

    const checkKakaoLoaded = setInterval(() => {
      attempts = attempts + 1;

      if (window.kakao?.maps) {
        clearInterval(checkKakaoLoaded);
        initMap();
      } else if (attempts >= maxAttempts) {
        clearInterval(checkKakaoLoaded);
      }
    }, 100);

    return () => {
      isMounted = false;
      clearInterval(checkKakaoLoaded);
    };
  }, [address]);

  return (
    <div className='space-y-8'>
      {/* 체험 설명 */}
      <div>
        <h2 className='mb-4 text-2xl font-bold text-gray-900'>체험 설명</h2>
        <p className='leading-relaxed text-gray-700'>{description}</p>
      </div>

      <div className='border-t border-gray-200'></div>

      {/* 오시는 길 */}
      <div>
        <h2 className='mb-4 text-2xl font-bold text-gray-900'>오시는 길</h2>
        <p className='mb-4 text-gray-700'>{address}</p>

        <div
          id='map'
          ref={mapRef}
          className='relative h-96 w-full overflow-hidden rounded-2xl bg-gray-100'
        />
      </div>

      <div className='border-t border-gray-200'></div>
    </div>
  );
}
