import React, { useState } from "react";
import { useQuery } from "react-query";
import { useForm, FormProvider } from "react-hook-form";
import { Grid, Box, Container, LinearProgress, Divider } from "@mui/material";

import {
  TimeCard,
  InputTextField,
  SubmitButton,
} from "./components/Components";

import {
  TimezoneType,
  TimezoneService,
  GetTZParams,
} from "./lib/timezone_service";

const defaultTZParams: GetTZParams = {
  long: Infinity,
  lat: Infinity,
};

const App: React.FC = () => {
  const formMethods = useForm<GetTZParams>();
  const [searchParams, setSearchParams] = useState<GetTZParams>(
    defaultTZParams
  );

  const cacheKey = TimezoneService.queryStringFromParams(searchParams);
  const validParams = TimezoneService.isValidTZParams(searchParams);
  const queryOpts = { enabled: validParams };

  const { isLoading, error, isError, data } = useQuery<TimezoneType, Error>(
    ["tz", cacheKey],
    () => TimezoneService.getTZ(searchParams),
    queryOpts
  );

  const onSubmitHandler = formMethods.handleSubmit((values: GetTZParams) => {
    setSearchParams(values);
  });

  const timeCardData = Object.assign({}, searchParams, data);
  const shouldDisplayCard = !isError && !isLoading && validParams;

  const latRules = {
    required: true,
    min: { value: -90, message: "-90 <= Latitude >= 90" },
    max: { value: 90, message: "-90 <= Latitude >= 90" },
  };

  const longRules = {
    required: true,
    min: { value: -180, message: "-180 <= Latitude >= 180" },
    max: { value: 180, message: "-180 <= Latitude >= 180" },
  };

  // TODO: Add title
  return (
    <React.Fragment>
      {isLoading && <LinearProgress />}

      <Box component="span" sx={{ p: 2 }}>
        <Container maxWidth="sm">
          <Divider sx={{ fontSize: "xx-large" }}>World Clock</Divider>
          <FormProvider {...formMethods}>
            <Grid container spacing={3} style={{ margin: "0" }}>
              <InputTextField label="Latitude" name="lat" rules={latRules} />
              <InputTextField label="Longitude" name="long" rules={longRules} />
              <SubmitButton onClick={onSubmitHandler} />
            </Grid>

            {isError && <p>{"An error has occurred: " + error?.message}</p>}
            {shouldDisplayCard && <TimeCard {...timeCardData} />}
          </FormProvider>
        </Container>
      </Box>
    </React.Fragment>
  );
};

export default App;
