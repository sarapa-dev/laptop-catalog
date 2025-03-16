import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { useNavigate } from "react-router";
import { LoginData, loginSchema } from "@/lib/validations/auth";

const LoginForm = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: loginMutation, isPending } = useMutation({
    mutationFn: (data: LoginData) => {
      return axiosInstance.post("/user/login", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Logged in successfully");
      navigate("/");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Something went wrong");
    },
  });

  function onSubmit(data: LoginData) {
    loginMutation(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? <Loader className="mr-2 size-4 animate-spin" /> : null}
          {isPending ? "Logging in..." : "Login"}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
