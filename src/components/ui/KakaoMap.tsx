'use client';

import { useEffect, useRef } from 'react';
import type { GeocodeResult, LatLngInstance, MapInstance } from '@/types/kakao';

interface KakaoMapProps {
  address: string;
  className?: string;
}

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

export default function KakaoMap({ address, className = '' }: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current || typeof window === 'undefined') {
      return;
    }

    let isMounted = true;
    let attempts = 0;
    const maxAttempts = KAKAO_LOAD_TIMEOUT / 100;

    const isKakaoLoaded = (): boolean => Boolean(window.kakao?.maps);

    const createCustomOverlay = (
      map: MapInstance,
      position: LatLngInstance
    ) => {
      const { kakao } = window;

      if (!kakao?.maps) {
        return;
      }

      new kakao.maps.CustomOverlay({
        map,
        position,
        content: createCustomOverlayContent(address),
        yAnchor: 1,
      });
    };

    const handleGeocodeResult = (
      result: GeocodeResult[],
      status: string,
      container: HTMLElement
    ) => {
      const { kakao } = window;

      if (!isMounted || !mapRef.current || !kakao?.maps) {
        return;
      }

      const { maps } = kakao;

      if (status === maps.services.Status.OK && result.length > 0) {
        const firstResult = result[0];
        const coords = new maps.LatLng(
          parseFloat(firstResult.y),
          parseFloat(firstResult.x)
        );
        const map = new maps.Map(container, {
          center: coords,
          level: MAP_LEVEL,
        });

        createCustomOverlay(map, coords);
      } else {
        const defaultCenter = new maps.LatLng(
          SEOUL_CITY_HALL.lat,
          SEOUL_CITY_HALL.lng
        );

        new maps.Map(container, {
          center: defaultCenter,
          level: MAP_LEVEL,
        });
      }
    };

    const initMap = () => {
      const { kakao } = window;

      if (!isMounted || !mapRef.current || !kakao?.maps) {
        return;
      }

      const { maps } = kakao;
      const { load } = maps;

      load(() => {
        const { kakao: kakaoInner } = window;

        if (!isMounted || !mapRef.current || !kakaoInner?.maps) {
          return;
        }

        const container = mapRef.current;
        const { maps: kakaoMaps } = kakaoInner;
        const { services } = kakaoMaps;
        const geocoder = new services.Geocoder();

        geocoder.addressSearch(
          address,
          (result: GeocodeResult[], status: string) => {
            handleGeocodeResult(result, status, container);
          }
        );
      });
    };

    const checkKakaoLoaded = setInterval(() => {
      attempts = attempts + 1;

      if (isKakaoLoaded()) {
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
    <div
      id='map'
      ref={mapRef}
      className={`relative h-96 w-full overflow-hidden rounded-2xl bg-gray-100 ${className}`}
    />
  );
}
