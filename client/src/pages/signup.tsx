import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/axios";
import { useAuthStore } from "@/stores/useAuthStore";
import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";
import { getApiErrorMessage } from "@/lib/api-errors";
import { z } from "zod";

const SignUpPage = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const signupMutation = useMutation({
    mutationFn: async (values: { name: string; email: string; password: string }) => {
      const { data } = await client.post("/auth/register", values);
      return data as {
        user: { id: number; name: string; email: string; role?: "admin" | "user" };
        token: string;
      };
    },
    onSuccess: (data) => {
      const role =
        data.user.role ?? (data.user.email === "admin@gmail.com" ? "admin" : "user");
      setAuth({ ...data.user, role }, data.token);
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

  const nameSchema = z.string().min(2, "Name must be at least 2 characters");
  const emailSchema = z.string().email("Enter a valid email");
  const passwordSchema = z.string().min(6, "Password must be at least 6 characters");
  const validateWith = (schema: z.ZodSchema<string>) => (value: string) => {
    const result = schema.safeParse(value);
    return result.success ? undefined : result.error.issues[0]?.message;
  };

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
          <form.Field
            name="name"
            validators={{
              onBlur: ({ value }) => validateWith(nameSchema)(value),
              onSubmit: ({ value }) => validateWith(nameSchema)(value),
            }}
          >
            {(field) => (
              <label className="space-y-2 text-sm text-foreground">
                <span>Full name</span>
                <input
                  type="text"
                  placeholder="Alex Morgan"
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  onBlur={field.handleBlur}
                  className="h-11 w-full rounded-lg border border-input bg-transparent px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
                />
                {field.state.meta.touchedErrors?.length ? (
                  <p className="text-xs text-red-500">
                    {field.state.meta.touchedErrors[0]}
                  </p>
                ) : null}
              </label>
            )}
          </form.Field>
          <form.Field
            name="email"
            validators={{
              onBlur: ({ value }) => validateWith(emailSchema)(value),
              onSubmit: ({ value }) => validateWith(emailSchema)(value),
            }}
          >
            {(field) => (
              <label className="space-y-2 text-sm text-foreground">
                <span>Email</span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  onBlur={field.handleBlur}
                  className="h-11 w-full rounded-lg border border-input bg-transparent px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
                />
                {field.state.meta.touchedErrors?.length ? (
                  <p className="text-xs text-red-500">
                    {field.state.meta.touchedErrors[0]}
                  </p>
                ) : null}
              </label>
            )}
          </form.Field>
          <form.Field
            name="password"
            validators={{
              onBlur: ({ value }) => validateWith(passwordSchema)(value),
              onSubmit: ({ value }) => validateWith(passwordSchema)(value),
            }}
          >
            {(field) => (
              <label className="space-y-2 text-sm text-foreground">
                <span>Password</span>
                <input
                  type="password"
                  placeholder="Create a password"
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  onBlur={field.handleBlur}
                  className="h-11 w-full rounded-lg border border-input bg-transparent px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
                />
                {field.state.meta.touchedErrors?.length ? (
                  <p className="text-xs text-red-500">
                    {field.state.meta.touchedErrors[0]}
                  </p>
                ) : null}
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
