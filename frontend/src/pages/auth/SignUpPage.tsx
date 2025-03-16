import { Link } from "react-router";
import SignupForm from "../../components/auth/SignupForm";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";

const SignupPage = () => {
  return (
    <div className="mx-auto m-5 flex w-full flex-col justify-center space-y-6 md:w-xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center font-semibold tracking-tight">
            Create an account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SignupForm />
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <span className="text-sm text-muted-foreground text-center">
            Already have an account?
          </span>
          <Link to="/login" className="w-full">
            <Button variant="outline" className="w-full">
              Login
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignupPage;
