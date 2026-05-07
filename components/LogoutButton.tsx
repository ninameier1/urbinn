import { signOut } from "@/auth";

import Button from "./Button";

export default function LogoutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/login" });
      }}
    >
      <Button variant="secondary" type="submit">Log out →</Button>
    </form>
  );
}