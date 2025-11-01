import type {
  ExperienceDetail,
  ReviewResponse,
} from '@/domain/experience-detail/type';

// 체험 상세 Mock 데이터
export const MOCK_EXPERIENCE_DETAIL: ExperienceDetail = {
  id: 1,
  userId: 21,
  title: '함께 배우면 즐거운 스트릿 댄스',
  description:
    '안녕하세요! 저희 스트릿 댄스 체험을 소개합니다. 저희는 신나고 재미있는 스트릿 댄스 스타일을 가르칩니다. 크럼프는 세계적으로 인기 있는 댄스 스타일로, 어디서든 춤출 수 있습니다. 저희 체험에서는 새로운 스타일을 접할 수 있고, 즐거운 시간을 보낼 수 있습니다. 저희는 초보자부터 전문가까지 어떤 수준의 춤추는 사람도 가르칠 수 있도록 준비해놓았습니다. 저희와 함께 즐길 수 있는 시간을 기대해주세요! 각종 음악에 적합한 스타일로, 저희는 크럼프 외에도 전통적인 스트릿 댄스 스타일과 최신 스트릿 댄스 스타일까지 가르칠 수 있습니다. 저희 체험에서는 전문가가 직접 강사로 참여하기 때문에, 저희가 제공하는 코스는 어떤 수준의 춤추는 사람도 쉽게 이해할 수 있도록 준비해놓았습니다. 저희 체험을 참가하게 된다면, 즐거운 시간 뿐만 아니라 새로운 스타일을 접할 수 있을 것입니다.',
  shortDescription: '초보자부터 전문가까지 춤추는 즐거움을 함께 느껴보세요.',
  category: '문화·예술',
  price: 1000,
  address: '서울특별시 테헤란로 142 위워크 역삼역',
  bannerImageUrl: '/images/activities/1-activity.png',
  subImages: [
    {
      id: 1,
      imageUrl: '/images/activities/2-activity.png',
    },
    {
      id: 2,
      imageUrl: '/images/activities/3-activity.png',
    },
  ],
  schedules: [
    {
      id: 1,
      date: '2023-12-01',
      startTime: '14:00',
      endTime: '15:00',
    },
    {
      id: 2,
      date: '2023-12-01',
      startTime: '15:00',
      endTime: '16:00',
    },
    {
      id: 3,
      date: '2023-12-01',
      startTime: '16:00',
      endTime: '17:00',
    },
  ],
  reviewCount: 293,
  rating: 4.9,
  createdAt: '2023-12-31T21:28:50.589Z',
  updatedAt: '2023-12-31T21:28:50.589Z',
};

// 리뷰 Mock 데이터
export const MOCK_REVIEWS: ReviewResponse = {
  averageRating: 4.9,
  totalCount: 293,
  reviews: [
    {
      id: 1,
      user: {
        id: 1,
        profileImageUrl: '/images/default_profile.png',
        nickname: '김태현',
      },
      activityId: 1,
      rating: 5,
      content:
        '저는 저희 스트릿 댄서 체험에 참가하게 된 지 얼마 안됐지만, 정말 즐거운 시간을 보냈습니다. 새로운 스타일과 춤추기를 좋아하는 나에게 정말 적합한 체험이었고, 전문가가 직접 강사로 참여하기 때문에 어떤 수준의 춤추는 사람도 쉽게 이해할 수 있었습니다. 강사님께서 정말 친절하게 설명해주셔서 정말 좋았고, 이번 체험을 거쳐 새로운 스타일과 춤추기에 대한 열정이 더욱 생겼습니다. 저는 이 체험을 적극 추천합니다!"',
      createdAt: '2023-02-04T10:30:00.000Z',
      updatedAt: '2023-02-04T10:30:00.000Z',
    },
    {
      id: 2,
      user: {
        id: 2,
        profileImageUrl: '/images/default_profile.png',
        nickname: '조민선',
      },
      activityId: 1,
      rating: 5,
      content:
        '저는 저희 스트릿 댄서 체험에 참가하게 된 지 얼마 안됐지만, 정말 즐거운 시간을 보냈습니다. 전문가가 직접 강사로 참여하기 때문에 어떤 수준의 춤추는 사람도 쉽게 이해할 수 있었고, 강사님의 친절한 설명 덕분에 저는 새로운 스타일과 춤추기에 대한 열정이 더욱 생겼습니다.',
      createdAt: '2023-02-03T15:45:00.000Z',
      updatedAt: '2023-02-03T15:45:00.000Z',
    },
    {
      id: 3,
      user: {
        id: 3,
        profileImageUrl: '/images/default_profile.png',
        nickname: '강지현',
      },
      activityId: 1,
      rating: 4,
      content:
        '전문가가 직접 강사로 참여하기 때문에 어떤 수준의 춤추는 사람도 쉽게 이해할 수 있었습니다. 이번 체험을 거쳐 저의 춤추기 실력은 더욱 향상되었어요.',
      createdAt: '2023-02-02T09:20:00.000Z',
      updatedAt: '2023-02-02T09:20:00.000Z',
    },
    {
      id: 4,
      user: {
        id: 4,
        profileImageUrl: '/images/default_profile.png',
        nickname: '최유나',
      },
      activityId: 1,
      rating: 5,
      content:
        '댄스 경험이 전혀 없었는데도 부담 없이 참여할 수 있었어요. 운동도 되고 스트레스 해소도 되고 일석이조였습니다!',
      createdAt: '2023-02-01T14:10:00.000Z',
      updatedAt: '2023-02-01T14:10:00.000Z',
    },
    {
      id: 5,
      user: {
        id: 5,
        profileImageUrl: '/images/default_profile.png',
        nickname: '정현우',
      },
      activityId: 1,
      rating: 5,
      content:
        '친구들과 함께 신나게 춤추고 왔어요! 분위기가 정말 좋고 선생님도 재미있게 가르쳐주세요. 또 참여하고 싶습니다.',
      createdAt: '2023-01-31T16:30:00.000Z',
      updatedAt: '2023-01-31T16:30:00.000Z',
    },
    {
      id: 6,
      user: {
        id: 6,
        profileImageUrl: '/images/default_profile.png',
        nickname: '한소영',
      },
      activityId: 1,
      rating: 4,
      content:
        '스트릿 댄스에 대한 관심이 생겼어요! 체험 후에도 연습하고 싶을 정도로 재미있었습니다. 감사합니다.',
      createdAt: '2023-01-30T11:45:00.000Z',
      updatedAt: '2023-01-30T11:45:00.000Z',
    },
  ],
};
