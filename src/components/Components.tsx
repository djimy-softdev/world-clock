import React from "react";
import { TimezoneType, GetTZParams } from "./../lib/timezone_service";
import Clock from "react-live-clock";
import {
  Grid,
  Box,
  Button,
  TextField,
  Typography,
  Divider,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";

import { Controller, useFormContext } from "react-hook-form";

type InputTextFieldType = {
  label: string;
  name: string;
  rules: {
    required: boolean;
    min: object;
    max: object;
  };
};

export const InputTextField: React.FC<InputTextFieldType> = (props) => {
  const { control } = useFormContext();

  const opts: Object = {
    id: "standard-basic",
    label: props.label,
    variant: "standard",
  };

  return (
    <div className="MuiGrid-item">
      <Controller
        name={props.name}
        control={control}
        rules={props.rules as any}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            {...opts}
            type="number"
            onChange={onChange}
            value={(value || "").trim()}
            error={!!error}
            helperText={error?.message}
          />
        )}
      />
    </div>
  );
};

export const SubmitButton: React.FC<{ onClick: any }> = ({ onClick }) => {
  return (
    <div
      className="MuiGrid-item"
      style={{ display: "flex", alignItems: "center" }}
    >
      <div style={{ display: "flex", alignItems: "baseline" }}>
        <Button color="primary" variant="contained" onClick={onClick}>
          Display Time
        </Button>
      </div>
    </div>
  );
};

// TIME CARD
type TimeCardProps = TimezoneType & GetTZParams;

export const TimeCard: React.FC<TimeCardProps> = ({
  countryCode,
  countryName,
  regionName,
  cityName,
  zoneName,
  lat,
  long,
}) => {
  return (
    <Card sx={{ minWidth: 275, marginTop: "40px" }}>
      <CardContent>
        <Box
          sx={{
            width: "100%",
            bgcolor: "background.paper",
          }}
        >
          <Box sx={{ my: 3, mx: 2 }}>
            <Grid container alignItems="center">
              <Grid item xs>
                <Typography gutterBottom variant="h4" component="div">
                  {countryName}
                </Typography>
              </Grid>
              <Grid item>
                <Typography gutterBottom variant="h6" component="div">
                  <Avatar>{countryCode}</Avatar>
                </Typography>
              </Grid>
            </Grid>
            <Typography color="text.secondary" variant="body2">
              {`${cityName}, ${regionName}`}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {`(${lat}, ${long})`}
            </Typography>
          </Box>
          <Divider variant="middle" />
          <Box sx={{ m: 1 }}>
            <Typography gutterBottom variant="h6">
              <Clock format={"ddd, MMM Do YYYY"} timezone={zoneName} />
            </Typography>
            <Typography gutterBottom variant="h4">
              <Clock format={"HH:mm:ss"} ticking={true} timezone={zoneName} />
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
