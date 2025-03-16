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
import { Input } from "../ui/input";
import { useNavigate } from "react-router";
import { SignupData, signupSchema } from "@/lib/validations/auth";

const SignupForm = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const form = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const { mutate: signupMutation, isPending } = useMutation({
    mutationFn: (data: SignupData) => {
      return axiosInstance.post("/user/register", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Account created successfully");
      navigate("/");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Something went wrong");
    },
  });

  function onSubmit(data: SignupData) {
    signupMutation(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" type="email" {...field} />
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
                <Input type="password" placeholder="Create a password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? <Loader className="mr-2 size-4 animate-spin" /> : null}
          {isPending ? "Creating account..." : "Sign up"}
        </Button>
      </form>
    </Form>
  );
};

export default SignupForm;
