export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { getMessages, getMessageById } from "@/lib/api";
import { SingleMessageContent } from "./_components/SingleMessageContent";

interface Props {
  params: Promise<{ id: string }>;
}

// Pre-generate all known message pages at build time
export async function generateStaticParams() {
  const messages = await getMessages();
  return messages.map((m) => ({ id: String(m.id) }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const message = await getMessageById(Number(id));
  if (!message) return {};
  return {
    title: `${message.title} | Don Bosco`,
    description: message.content.slice(0, 160),
  };
}

export default async function SingleMessagePage({ params }: Props) {
  const { id } = await params;
  const message = await getMessageById(Number(id));
  if (!message) notFound();

  return (
    <>
      <PageHero
        eyebrow="Leadership"
        title={message.title}
        description={message.designation}
        breadcrumbs={[
          { label: "Messages", href: "/messages" },
          { label: message.staff_name },
        ]}
      />
      <SingleMessageContent message={message} />
    </>
  );
}
