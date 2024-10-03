"use client";

import * as React from "react";
import {
  FormControl,
  InputLabel,
  Box,
  Typography,
  MenuItem,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const DefaultSelect: React.FC = () => {
  const [funcao, setFuncao] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setFuncao(event.target.value as string);
  };

  return (
    <>
      <Box>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Função</InputLabel>
          <Select
            labelId="level"
            id="level"
            value={funcao}
            label="Funcao"
            onChange={handleChange}
            sx={{
              "& fieldset": {
                border: "1px solid #D5D9E2",
                borderRadius: "7px",
              },
            }}
          >
            <MenuItem value="ADMINISTRADOR">Administrador</MenuItem>
            <MenuItem value="FUNCIONARIO">Funcionário</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  );
};

export default DefaultSelect;
