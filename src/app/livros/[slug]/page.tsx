import { redirect } from "next/navigation";
import { defaultLocale } from "@/i18n/config";

type LegacyBookPageProps = { params: Promise<{ slug: string }> };

export default async function LegacyBookPage({ params }: LegacyBookPageProps) {
  const { slug } = await params;
  redirect(`/${defaultLocale}/livros/${slug}`);
}
