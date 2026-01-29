import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.5em] text-muted-foreground">
          Error 404
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
          The page you are looking for does not exist or has been moved. Try
          heading back home or browse the shop.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-sm font-semibold text-background transition hover:opacity-90"
          >
            Back to home
          </Link>
          <Link
            to="/shop"
            className="inline-flex h-11 items-center justify-center rounded-full border border-foreground/20 px-6 text-sm font-semibold text-foreground transition hover:border-foreground/40"
          >
            Shop products
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
