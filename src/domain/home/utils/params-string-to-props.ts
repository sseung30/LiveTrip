import type { homeSearchParams } from '@/domain/home/type';

export const paramsStringToProps = (params: homeSearchParams) => {
  return {
    page: params.page ? Number(params.page) : 1,
    sort: params.sort,
    categoryIndex: params.categoryIndex ? Number(params.categoryIndex) : -1,
  };
};
