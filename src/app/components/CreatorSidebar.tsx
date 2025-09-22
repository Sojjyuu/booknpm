"use client";
import { Box, Avatar, Typography, Stack, Link as MuiLink, Divider } from "@mui/material";
import { Facebook, Instagram } from "@mui/icons-material";

export default function CreatorSidebar() {
  return (
    <Box
      sx={{
        width: { xs: "100%", md: 280 },
        bgcolor: "background.paper",
        p: 3,
        borderRadius: 3,
        boxShadow: 3,
        textAlign: "center",
      }}
    >
      <Avatar
        src="/maririn.jpg"      // ใส่รูปโปรไฟล์ของคุณ
        alt="Creator"
        sx={{ width: 120, height: 120, mx: "auto", mb: 2, border: "4px solid #2196f3" }}
      />
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        About Me
      </Typography>
      <Typography variant="body1">
        <strong>Student ID:</strong> 663450172-5
      </Typography>
      <Typography variant="body1">
        <strong>Email:</strong>{" "}
        <MuiLink href="mailto:Kirati.su@kkumail.com">
          Kirati.su@kkumail.com
        </MuiLink>
      </Typography>
      <Typography variant="body1">
        <strong>Major:</strong> CIS (Computer Information Science)
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Stack direction="row" spacing={2} justifyContent="center">
        <MuiLink href="https://facebook.com/yourprofile" target="_blank">
          <Facebook fontSize="large" color="primary" />
        </MuiLink>
        <MuiLink href="https://instagram.com/yourprofile" target="_blank">
          <Instagram fontSize="large" sx={{ color: "#e4405f" }} />
        </MuiLink>
      </Stack>
    </Box>
  );
}
