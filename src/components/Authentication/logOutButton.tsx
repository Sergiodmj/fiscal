import { Button } from "@mui/material";
import { useSession } from "next-auth/react";

export default function LogoutButton() {
    const { data: session } = useSession();

    const url = "https://la.sitesdahora.com.br/api/logout";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${jwt}`,
      },
    }; 
    return (
      <Button className="sidebar-menu-link">
        <i className="material-symbols-outlined">logout</i>
        <span className="title">Logout</span>
      </Button>
    );
}