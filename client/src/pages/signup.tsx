import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/axios";
import { useAuthStore } from "@/stores/useAuthStore";
import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";
import { getApiErrorMessage } from "@/lib/api-errors";

const SignUpPage = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const signupMutation = useMutation({
    mutationFn: async (values: { name: string; email: string; password: string }) => {
      const { data } = await client.post("/auth/register", values);
      return data as { user: { id: number; name: string; email: string }; token: string };
    },
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      toast.success("Account created");
      navigate("/shop");
    },
    onError: (err) => {
      toast.error(getApiErrorMessage(err));
    },
  });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      await signupMutation.mutateAsync(value);
    },
  });

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
        <form
          className="mt-8 flex flex-col gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            form.handleSubmit();
          }}
        >
          <form.Field name="name">
            {(field) => (
              <label className="space-y-2 text-sm text-foreground">
                <span>Full name</span>
                <input
                  type="text"
                  placeholder="Alex Morgan"
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  className="h-11 w-full rounded-lg border border-input bg-transparent px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
                />
              </label>
            )}
          </form.Field>
          <form.Field name="email">
            {(field) => (
              <label className="space-y-2 text-sm text-foreground">
                <span>Email</span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  className="h-11 w-full rounded-lg border border-input bg-transparent px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
                />
              </label>
            )}
          </form.Field>
          <form.Field name="password">
            {(field) => (
              <label className="space-y-2 text-sm text-foreground">
                <span>Password</span>
                <input
                  type="password"
                  placeholder="Create a password"
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  className="h-11 w-full rounded-lg border border-input bg-transparent px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
                />
              </label>
            )}
          </form.Field>
          <button
            type="submit"
            disabled={signupMutation.isPending}
            className="h-11 w-full rounded-full bg-foreground text-sm font-semibold text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {signupMutation.isPending ? "Creating..." : "Create account"}
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
