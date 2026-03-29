import InvoicesPage from '@/app/ui/invoices/page';

export default async function Page({ searchParams }: { searchParams?: { query?: string; page?: string } }) {
  return <InvoicesPage searchParams={searchParams} />;
}