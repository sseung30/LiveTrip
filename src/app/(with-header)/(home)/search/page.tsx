export default async function HomeSearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    q: string;
  }>;
}) {
  const { q } = await searchParams;

  return (
    <>
      <div className=''> 검색어 : {q}</div>
    </>
  );
}
