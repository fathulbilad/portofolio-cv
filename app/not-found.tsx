import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="section-page">
      <div className="page-paper section-content">
        <p className="eyebrow">404</p><h1>This page took a wrong turn.</h1>
        <p className="intro-text">Let’s get you back to the overview.</p>
        <Link href="/" className="button button-blue">Back to overview →</Link>
      </div>
    </main>
  );
}
