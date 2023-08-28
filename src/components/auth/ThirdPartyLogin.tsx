import Spinner from "../icons/Spinner";
import { Button } from "../ui/button";
import Google from "../icons/Google";
import GitHub from "../icons/Github";

interface PropType {
  onGoogleSignIn: () => void;
  onGitHubSignIn: () => void;
}

function ThirdPartyLogin({ onGoogleSignIn, onGitHubSignIn }: PropType) {
  const status: string = "";
  return (
    <div className="flex justify-around pb-8">
      <Button className="w-32 bg-secondary" disabled={status === "loading"}>
        {status === "loading" ? (
          <Spinner className=" w-3.5 h-3.5 text-gray-200 dark:text-white fill-black" />
        ) : (
          <GitHub />
        )}
      </Button>
      <Button
        onClick={onGoogleSignIn}
        className="w-32 bg-secondary"
        disabled={status === "loading"}
      >
        {status === "loading" ? (
          <Spinner className=" w-3.5 h-3.5 text-gray-200 dark:text-white fill-black" />
        ) : (
          <Google />
        )}
      </Button>
    </div>
  );
}

export default ThirdPartyLogin;
