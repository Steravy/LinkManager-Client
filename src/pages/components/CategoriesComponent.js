import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function CategoriesComponent() {
  return (
    <>
      <Box my={"20px"}>
        <Typography variant="h5" sx={{ fontWeight: 400 }}>
          Categorias
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={3}>
            <Item alignItems="center">
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 2}}
                alignItems="center"
              >
                <OnlinePredictionIcon/>
                <Typography>
                  Tecnologia
                </Typography>
                
              </Stack>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item>Economia</Item>
          </Grid>
          <Grid item xs={3}>
            <Item>Historia</Item>
          </Grid>
          <Grid item xs={3}>
            <Item>Saude</Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
