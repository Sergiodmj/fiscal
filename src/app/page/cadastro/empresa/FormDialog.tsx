"use client";

import React from "react";
import {
  Card,
  Typography,
  Button,
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle,
  Dialog,
  TextField,
  Tooltip,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { format } from "date-fns";

export default function FormDialog(user: any) {
  const [open, setOpen] = React.useState(false);
  const { data: session } = useSession();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function Renovar(data: any) {
    const jwt = session?.user.token;
    const url = `https://erp.sitesdahora.com.br/api/enterprise-validate/${user.user.id}`;
    console.log(url);
    const options = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    };
    fetch(url, options);
    window.location.reload();

    // console.log(response)
  }

  return (
    <>
      <Tooltip title="RENOVAR">
        <Button onClick={handleClickOpen}>
          <span className="material-symbols-outlined">add</span>
        </Button>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const data = Object.fromEntries((formData as any).entries());
            Renovar(data);
            // console.log(data);
            handleClose();
          },
        }}
      >
        <DialogTitle>Renovar Empresa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ensira a nova data de vencimento
          </DialogContentText>
          <TextField
            required
            autoFocus
            margin="dense"
            id="validade"
            name="validade"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type="submit">Renovar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
