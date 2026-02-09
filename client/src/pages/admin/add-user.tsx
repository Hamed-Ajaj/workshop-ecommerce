"use client";

import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.string().min(1, "Role is required"),
});

const AddUser = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "",
    },
    onSubmit: async ({ value }) => {
      const result = schema.safeParse(value);
      if (!result.success) {
        toast.error(result.error.issues[0]?.message ?? "Invalid input");
        return;
      }
      toast.success("User added (mock)");
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Add User</h1>
        <p className="text-sm text-slate-500">Create a new user account.</p>
      </div>

      <Card className="rounded-2xl border-slate-200 p-6">
        <form
          className="grid gap-6 md:grid-cols-2"
          onSubmit={(event) => {
            event.preventDefault();
            form.handleSubmit();
          }}
        >
          <form.Field name="name">
            {(field) => (
              <div className="md:col-span-1">
                <label className="text-sm font-semibold text-slate-700">
                  Full name
                </label>
                <Input
                  placeholder="Alex Morgan"
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                />
                {field.state.meta.errors?.length ? (
                  <p className="mt-1 text-xs text-rose-500">
                    {field.state.meta.errors[0]}
                  </p>
                ) : null}
              </div>
            )}
          </form.Field>

          <form.Field name="email">
            {(field) => (
              <div className="md:col-span-1">
                <label className="text-sm font-semibold text-slate-700">
                  Email
                </label>
                <Input
                  placeholder="user@example.com"
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                />
                {field.state.meta.errors?.length ? (
                  <p className="mt-1 text-xs text-rose-500">
                    {field.state.meta.errors[0]}
                  </p>
                ) : null}
              </div>
            )}
          </form.Field>

          <form.Field name="password">
            {(field) => (
              <div className="md:col-span-1">
                <label className="text-sm font-semibold text-slate-700">
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="Create a password"
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                />
                {field.state.meta.errors?.length ? (
                  <p className="mt-1 text-xs text-rose-500">
                    {field.state.meta.errors[0]}
                  </p>
                ) : null}
              </div>
            )}
          </form.Field>

          <form.Field name="role">
            {(field) => (
              <div className="md:col-span-1">
                <label className="text-sm font-semibold text-slate-700">
                  Role
                </label>
                <Select
                  value={field.state.value}
                  onValueChange={field.handleChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
                {field.state.meta.errors?.length ? (
                  <p className="mt-1 text-xs text-rose-500">
                    {field.state.meta.errors[0]}
                  </p>
                ) : null}
              </div>
            )}
          </form.Field>

          <div className="md:col-span-2 flex justify-end">
            <Button type="submit" className="rounded-full">
              Save user
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
