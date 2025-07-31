import { auth, signOut } from "@/auth";
import { json } from "zod";
const settings = async () => {
  const session = await auth();
  return (
    <div>
      {JSON.stringify(session)}

      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button>Signout</button>
      </form>
    </div>
  );
};
export default settings;
