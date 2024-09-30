import { getServerSession } from "next-auth";
import { auth as authOptions } from "@/app/libs/auth-config";

import TextualInputs from "./TextualInputs";
import { redirect } from "next/navigation";

export default async function NovaEmpresa() {
  const seesion = await getServerSession(authOptions);
  if (!seesion) {
    redirect("/");
  }
  if (seesion?.user.permission != "SUPER_ADMIN") {
    redirect("/page/unauthorized");
  }
  return (
    <>
      <TextualInputs />
    </>
  );
}
