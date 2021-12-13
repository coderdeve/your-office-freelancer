import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default (props) => (
    <Box py={10} pr={10} bgcolor="secondary.main" color="black">
        <Grid container justify="center">
            <Grid item xs={10}>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="h4">قائمة الفريلانسر</Typography>
                    <Button onClick={props.openNewJobModal} variant="contained" color="primary" disableElevation>اضافة فريلانسر</Button>
                </Box>
            </Grid>
        </Grid>
    </Box>
);
