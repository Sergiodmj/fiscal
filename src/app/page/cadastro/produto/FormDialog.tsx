"use client";

import React, { useState } from "react";
import {
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
import { Flip, toast } from "react-toastify";

export default function FormDialog(data: any) {
  const [open, setOpen] = React.useState(false);
  const { data: session } = useSession();
  const [pVenda, setPVenda] = useState<string>("");
  const [pVendaNumerico, setPVendaNumerico] = useState("");
  const jwt = session?.user.token;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: any) => {
    const rawValue = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    const formattedValue = new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(rawValue / 100); // Divida por 100 para lidar com valores decimais

    setPVenda(formattedValue);

    // Convertendo para formato numérico: substituindo vírgulas por pontos
    setPVendaNumerico(formattedValue.replace(/\./g, "").replace(",", ".")); // Converte para número
  };

  async function Alterar() {
    const url = `https://erp.sitesdahora.com.br/api/product-edit-price/${data.data.id}`;
    console.log(url);
    const options = {
      method: "PUT",
      body: JSON.stringify({
        price_sale: pVendaNumerico,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    };

    const result = async () => {
      const response = await fetch(url, options);
      const message = await response.json();
      if (message.success === true) {
        toast.success(`${message.message}`, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Flip,
        });
      } else {
        toast.error(`${message.message}`, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Flip,
        });
      }
    };

    result();
  }

  return (
    <>
      <Tooltip title="ALTERAR PREÇOS">
        <Button onClick={handleClickOpen}>
          <span className="material-symbols-outlined">currency_exchange</span>
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
            Alterar();
            // console.log(data);
            handleClose();
          },
        }}
      >
        <DialogTitle>Alterar Preços</DialogTitle>
        <DialogContent>
          <DialogContentText>Preço de venda</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            type="text"
            fullWidth
            variant="standard"
            name="price_sale"
            value={pVenda}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type="submit">Alterar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
