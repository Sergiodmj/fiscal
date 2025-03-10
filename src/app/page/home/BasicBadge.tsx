"use client";

import React from "react";
import { Badge, Card, Typography } from "@mui/material";

interface Badge {
  nome: string;
  icon: string;
}

export default function BasicBadge(props: Badge) {
  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "7px",
          mb: "25px",
          padding: { xs: "18px", sm: "20px", lg: "25px" },
        }}
        className="rmui-card"
      >
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: "16px", md: "18px" },
            fontWeight: 700,
            mb: "25px",
          }}
          className="text-black"
        >
          {props.nome}
        </Typography>

          <i className="material-symbols-outlined">{props.icon}</i>
      </Card>
    </>
  );
}
