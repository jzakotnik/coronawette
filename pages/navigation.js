import Button from "@mui/material/Button";
import ShareIcon from "@mui/icons-material/Share";
import { Typography, Grid, Box } from "@mui/material";

export default function Navigation({ calculate }) {
  //console.log("Size of window: ", height, width);
  return (
    <Box
      sx={{
        width: "100%",

        backgroundColor: "primary.dark",
        "&:hover": {
          backgroundColor: "primary.main",
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        spacing={0}
        sx={{ paddingLeft: 0, paddingRight: 0 }}
      >
        <Grid item xs={6} sx={{ paddingLeft: 0, paddingRight: 0 }}>
          <Typography variant="h6" component="h6" color="common.white">
            Bist Du einer von 80 Millionen (Virologen)?
          </Typography>
        </Grid>

        <Grid
          item
          xs={6}
          sx={{ paddingLeft: 0, paddingRight: 0 }}
          justifyContent="right"
        >
          <Button
            variant="contained"
            startIcon={<ShareIcon />}
            onClick={() => {
              calculate();
            }}
          >
            Share
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
