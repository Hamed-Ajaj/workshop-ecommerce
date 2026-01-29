import { Link } from "react-router-dom";

const SignInPage = () => {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-sm">
        <div className="space-y-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
            Welcome back
          </p>
          <h1 className="text-3xl font-semibold text-foreground">Sign in</h1>
          <p className="text-sm text-muted-foreground">
            Enter your details to continue shopping.
          </p>
        </div>
        <form className="mt-8 flex flex-col gap-4">
          <label className="space-y-2 text-sm text-foreground">
            <span>Email</span>
            <input
              type="email"
              placeholder="you@example.com"
              className="h-11 w-full rounded-lg border border-input bg-transparent px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
            />
          </label>
          <label className="space-y-2 text-sm text-foreground">
            <span>Password</span>
            <input
              type="password"
              placeholder="••••••••"
              className="h-11 w-full rounded-lg border border-input bg-transparent px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
            />
          </label>
          <button
            type="submit"
            className="h-11 w-full rounded-full bg-foreground text-sm font-semibold text-background transition hover:opacity-90"
          >
            Sign in
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="font-semibold text-foreground">
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
};

export default SignInPage;
