import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="flex min-h-[100svh] flex-col items-start justify-center px-5 md:px-10">
      <div className="label">404</div>
      <h1 className="display mt-6 text-[18vw] md:text-[10vw]">Lost the <span className="serif font-normal text-accent">plot</span>.</h1>
      <Link href="/" className="mt-10 rounded-full bg-ink px-6 py-4 text-sm font-medium text-bg">Back home</Link>
    </main>
  );
}
