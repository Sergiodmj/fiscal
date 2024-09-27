import { Box, Typography, Link } from "@mui/material";
import Image from "next/image";
 
export default function Unauthorized() {
  return (
    <>
      <Box
        className="not-found-area"
        sx={{
          py: { xs: "50px", md: "70px", lg: "120px" },
        }}
      >
        <Box className="not-found-content text-center ml-auto mr-auto">
          <Box mb="20px">
           
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontSize: "21px",
              fontWeight: "700",
              mb: "13px",
              lineHeight: "1.4",
            }}
          >
            Usuário não autorizado
          </Typography>

          <Link
            href="/page/home"
            sx={{
              bgcolor: "primary.main",
              textTransform: "capitalize",
              borderRadius: "6px",
              fontWeight: "500",
              fontSize: "16px",
              padding: "12px 23px",
              color: "#fff !important",
              boxShadow: "none",
              display: "inline-block",
            }}
          >
            Back to Home
          </Link>
        </Box>
      </Box>
    </>
  );
}