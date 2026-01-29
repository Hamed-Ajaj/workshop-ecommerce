import { Link } from "react-router-dom";

const SignUpPage = () => {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-sm">
        <div className="space-y-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
            Join us
          </p>
          <h1 className="text-3xl font-semibold text-foreground">Sign up</h1>
          <p className="text-sm text-muted-foreground">
            Create an account to start your wishlist.
          </p>
        </div>
        <form className="mt-8 flex flex-col gap-4">
          <label className="space-y-2 text-sm text-foreground">
            <span>Full name</span>
            <input
              type="text"
              placeholder="Alex Morgan"
              className="h-11 w-full rounded-lg border border-input bg-transparent px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
            />
          </label>
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
              placeholder="Create a password"
              className="h-11 w-full rounded-lg border border-input bg-transparent px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
            />
          </label>
          <button
            type="submit"
            className="h-11 w-full rounded-full bg-foreground text-sm font-semibold text-background transition hover:opacity-90"
          >
            Create account
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/sign-in" className="font-semibold text-foreground">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
};

export default SignUpPage;
