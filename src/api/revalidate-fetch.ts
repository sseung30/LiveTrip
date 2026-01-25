export const fetchRevalidateByTag = async (tag: string) => {
  const res = await fetch('/api/revalidate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tag }),
  });

  return (await res.json()) as unknown;
};
