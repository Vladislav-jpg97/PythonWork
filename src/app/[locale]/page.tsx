import { redirect } from 'next/navigation';

export default async function IndexPage(props: { 
  params: Promise<{ locale: string }> 
}) {
    const { locale } = await props.params;
    // Здесь locale точно есть
    redirect(`/${locale}/course/vars`);
}