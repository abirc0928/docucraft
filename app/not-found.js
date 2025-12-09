export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center text-center overflow-hidden">
      <h1 className="text-4xl font-semibold">404 | Page not found</h1>
      <p className="mt-2 text-gray-600">
        Oops… looks like this page doesn’t exist.
      </p>
    </div>
  );
}
