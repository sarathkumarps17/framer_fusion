"use client";

import Spinner from "../icons/Spinner";
import { Button } from "../ui/button";
import Google from "../icons/Google";
import GitHub from "../icons/Github";
import { motion } from "framer-motion";

interface PropType {
  gitHubInStatus?: "error" | "success" | "loading" | "idle";
  googleSignInStatus?: "error" | "success" | "loading" | "idle";
  onGoogleSignIn?: () => void;
  onGitHubSignIn?: () => void;
}

function ThirdPartyLogin({
  onGoogleSignIn,
  googleSignInStatus,
  gitHubInStatus,
}: PropType) {
  const isGoogleSignInLoading =
    googleSignInStatus === "loading" || googleSignInStatus === "success";
  const isGitHubSignInLoading =
    gitHubInStatus === "loading" || gitHubInStatus === "success";
  return (
    <div className="flex justify-around pb-8">
      <motion.div whileTap={{ scale: 0.95 }}>
        <Button className="w-32 bg-secondary" disabled={isGitHubSignInLoading}>
          {isGitHubSignInLoading ? (
            <Spinner className=" w-3.5 h-3.5 text-gray-200 dark:text-white fill-black" />
          ) : (
            <GitHub />
          )}
        </Button>
      </motion.div>
      <motion.div whileTap={{ scale: 0.95 }}>
        <Button
          onClick={onGoogleSignIn}
          className="w-32 bg-secondary"
          disabled={isGoogleSignInLoading}
        >
          {isGoogleSignInLoading ? (
            <Spinner className=" w-3.5 h-3.5 text-gray-200 dark:text-white fill-black" />
          ) : (
            <Google />
          )}
        </Button>
      </motion.div>
    </div>
  );
}

export default ThirdPartyLogin;
