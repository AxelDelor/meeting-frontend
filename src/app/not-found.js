import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <h1>Page not found</h1>
      <p>The page you are looking for has not been found</p>
      <Link className="btn" href="/">
        Back to rooms
      </Link>
    </>
  );
}
