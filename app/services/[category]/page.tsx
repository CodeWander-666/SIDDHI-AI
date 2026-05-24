import { notFound } from 'next/navigation';
const categories = ['for-startups','for-developers','for-small-businesses','for-social-creators'];
export async function generateStaticParams() { return categories.map(c => ({ category: c })); }
export default function ServicePage({ params }: { params: { category: string } }) {
  if (!categories.includes(params.category)) notFound();
  return <div className="pt-32 text-center"><h1 className="text-4xl font-serif">{params.category.replace(/-/g,' ')}</h1><p className="text-gray-400">Coming soon.</p></div>;
}
