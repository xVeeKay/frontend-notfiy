import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

const AppAlert = ({ type = "info", title, message }) => {
  if (!message) return null; // 👈 important

  return (
    <Stack sx={{ width: "100%" }} spacing={2} mb={2}>
      <Alert severity={type}>
        {title && <AlertTitle>{title}</AlertTitle>}
        {message}
      </Alert>
    </Stack>
  );
};

export default AppAlert;
