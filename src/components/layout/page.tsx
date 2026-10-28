import { Topbar } from "./topbar";

export function Page({
  title, description, actions, children,
}: { title: string; description?: string; actions?: React.ReactNode; children: React.ReactNode }) {
  return (
    <>
      <Topbar title={title} description={description} actions={actions} />
      <div className="px-4 pb-8 sm:px-7">{children}</div>
    </>
  );
}
