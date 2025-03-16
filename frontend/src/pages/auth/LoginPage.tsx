import { Link } from "react-router";
import LoginForm from "../../components/auth/LoginForm";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";

const LoginPage = () => {
  return (
    <div className="mx-auto m-5 flex w-full flex-col justify-center space-y-6 md:w-md">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center font-semibold tracking-tight">
            Welcome back
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <span className="text-sm text-muted-foreground text-center">Don't have an account?</span>
          <Link to="/signup" className="w-full">
            <Button variant="outline" className="w-full">
              Create an account
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
