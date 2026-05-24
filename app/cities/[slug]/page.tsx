import { notFound } from 'next/navigation';
const cities = ['mumbai','delhi','bangalore','hyderabad','chennai','pune','kolkata','ahmedabad','jaipur','lucknow'];
export async function generateStaticParams() { return cities.map(c => ({ slug: c })); }
export default function CityPage({ params }: { params: { slug: string } }) {
  if (!cities.includes(params.slug)) notFound();
  return <div className="pt-32 text-center"><h1 className="text-4xl font-serif">Digital Marketing in {params.slug}</h1><p className="text-gray-400">Coming soon.</p></div>;
}
