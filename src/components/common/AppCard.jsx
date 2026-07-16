import { Card } from "@mui/material";

const AppCard = ({ children, sx = {}, ...props }) => {
  return (
    <Card
      elevation={0}
      sx={{
        p: 3,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        backgroundColor: "background.paper",
        ...sx,
      }}
      {...props}
    >
      {children}
    </Card>
  );
};

export default AppCard;