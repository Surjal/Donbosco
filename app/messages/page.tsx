export const dynamic = "force-dynamic";
import { PageHero } from "@/components/layout/PageHero";
import { MessagesContent } from "./_components/MessagesContent";
import { getMessageHero, getMessages } from "@/lib/api";

export const metadata = {
  title: "Leadership Messages | Don Bosco",
  description:
    "Messages from the President, Vice President, General Secretary, and leadership of Don Bosco.",
};

export default async function MessagesPage() {
  const [messages, messageHero] = await Promise.all([
    getMessages(),
    getMessageHero(),
  ]);
  // const messages = await getMessages();

  return (
    <>
      <PageHero
        eyebrow="Leadership"
        title={messageHero.title}
        description={messageHero.content}
        breadcrumbs={[{ label: "Messages" }]}
      />
      <MessagesContent messages={messages} />
    </>
  );
}
