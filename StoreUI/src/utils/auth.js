import { signOut } from "next-auth/react";
// import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
export function LogoutUser() {
  try {
    signOut({ redirect: true, callbackUrl: "/" })
    toast.success("Logout successful!");
    // setTimeout(() => , 500);
  } catch (error) {}
  // try {
  //   const router = useRouter();
  //   router.push("/");
  // } catch (error) {
  //   window.location.replace('/');
  // }
}
