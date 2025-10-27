export default function createQueryString(params: Record<string, any>) {
  const filteredParams = Object.entries(params).filter(
    ([, value]) => value !== null && value !== undefined
  );
  const searchParams = new URLSearchParams(filteredParams);

  return searchParams.toString();
}
