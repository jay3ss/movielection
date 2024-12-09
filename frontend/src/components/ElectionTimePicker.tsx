import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { IconButton, Dialog, DialogContent, Box } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const ElectionTimePicker = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<Dayjs | null>(dayjs("2022-04-17T15:30"));

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <IconButton onClick={handleOpen}>
          <AccessTimeIcon />
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <TimePicker
              label="Select Time"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
                handleClose(); // Close after selection
              }}
              views={["minutes"]}
              format="mm"
            />
          </DialogContent>
        </Dialog>
      </LocalizationProvider>
    </Box>
  );
};

export default ElectionTimePicker;
