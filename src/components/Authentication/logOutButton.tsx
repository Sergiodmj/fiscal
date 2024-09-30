import { Button } from "@mui/material";
import { signOut, useSession } from "next-auth/react";

export default function LogoutButton() {
  const { data: session } = useSession();
  const jwt = session?.user.token;
  const url = "https://erp.sitesdahora.com.br/api/logout";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };

  function Logout() {
    fetch(url, options)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        signOut();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <Button onClick={Logout} className="sidebar-menu-link">
      <i className="material-symbols-outlined">logout</i>
      <span className="title">Logout</span>
    </Button>
  );
}
