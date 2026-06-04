import type { Metadata } from 'next';
import { specialities } from '@/lib/data';
import { notFound } from 'next/navigation';
import SpecialityPageClient from './SpecialityPageClient';

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const spec = specialities.find(s => s.slug === slug);
  if (!spec) return { title: 'Speciality Not Found' };
  return {
    title: `${spec.name} | Narayana Health`,
    description: `${spec.description} Expert ${spec.name} doctors at Narayana Health hospitals across India.`,
    alternates: { canonical: `https://www.narayanahealth.org/specialities/${spec.slug}` },
  };
}

export default async function SpecialityPage({ params }: Props) {
  const { slug } = await params;
  const spec = specialities.find(s => s.slug === slug);
  if (!spec) notFound();
  return <SpecialityPageClient speciality={spec!} />;
}
