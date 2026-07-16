import {
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";


const ActionButtons = ({
  onView,
  onEdit,
  showEdit = true,
}) => {
  return (
    <Stack
      direction="row"
      spacing={0.5}
      sx={{ justifyContent: "center" }}
    >
      <Tooltip title="View">
        <IconButton
          size="small"
          color="primary"
          onClick={onView}
        >
          <VisibilityOutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      {showEdit && (
        <Tooltip title="Edit">
          <IconButton
            size="small"
            color="warning"
            onClick={onEdit}
          >
            <EditOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
    </Stack>
  );
};

export default ActionButtons;