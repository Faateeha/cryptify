import MenuItem from "@mui/material/MenuItem";

import Select from "@mui/material/Select";

export default function SelectDays({ days, handleDaysChange }) {
  return (
    <div className="flex space-x-1 items-center">
      <p>Price change in</p>

      <Select
        sx={{
          height: "2.5rem",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
          "& .MuiSelect-root": {
            color: "white",
          },
          "&:hover": {
            "&& fieldset": { borderColor: "white" },
          },
        }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={days}
        color="white"
        label="Days"
        onChange={handleDaysChange}
      >
        <MenuItem value={7}>7 days</MenuItem>
        <MenuItem value={30}>30 days</MenuItem>
        <MenuItem value={60}>60 days</MenuItem>
        <MenuItem value={90}>90 days</MenuItem>
        <MenuItem value={120}>120 days</MenuItem>
      </Select>
    </div>
  );
}
