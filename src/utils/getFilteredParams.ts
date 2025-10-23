export const getFilteredParams = (
  params: Record<string, string | undefined | null>
) => {
  return Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== undefined && value !== null
    )
  );
};
