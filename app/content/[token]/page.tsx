import ContentView from './ContentView'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ token: string }>
  searchParams: Promise<{ product?: string }>
}

export default async function ContentPage({ params, searchParams }: PageProps) {
  const { token } = await params
  const sp = await searchParams
  return <ContentView token={token} productId={sp.product ?? null} />
}
