declare global {
  interface Window {
    kakao?: {
      maps: {
        Map: new (container: HTMLElement, options: MapOptions) => MapInstance;
        LatLng: new (lat: number, lng: number) => LatLngInstance;
        services: {
          Geocoder: new () => GeocoderInstance;
          Status: {
            OK: string;
          };
        };
        CustomOverlay: new (
          options: CustomOverlayOptions
        ) => CustomOverlayInstance;
        load: (callback: () => void) => void;
      };
    };
  }
}

interface MapOptions {
  center: LatLngInstance;
  level: number;
}

export interface MapInstance {
  setCenter: (latlng: LatLngInstance) => void;
}

export interface LatLngInstance {
  getLat: () => number;
  getLng: () => number;
}

interface GeocoderInstance {
  addressSearch: (
    address: string,
    callback: (result: GeocodeResult[], status: string) => void
  ) => void;
}

export interface GeocodeResult {
  x: string;
  y: string;
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  region_4depth_name: string;
  code: string;
}

interface CustomOverlayOptions {
  map: MapInstance;
  position: LatLngInstance;
  content: string;
  yAnchor: number;
}

interface CustomOverlayInstance {
  setMap: (map: MapInstance | null) => void;
}

export {};
