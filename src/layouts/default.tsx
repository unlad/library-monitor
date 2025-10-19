export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="dark text-foreground bg-background h-screen p-10">
      {children}
    </main>
  );
}
