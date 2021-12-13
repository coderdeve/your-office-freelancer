import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { differenceInHours } from "date-fns";


const useStyles = makeStyles((theme) => ({
    wrapper: {
        border: "1px solid #e8e8e8",
        cursor: "pointer",
        transition: "0.3s",
        "&:hover": {
            boxShadow: "0px 5px 25px rgba(0, 0, 0, 0.1)",
            borderRight: "6px solid #5a26f5",
        },
    },
    freelancerName: {
        fontSize: "13.5px",
        backgroundColor: theme.palette.primary.main,
        padding: theme.spacing(0.75),
        borderRadius: "5px",
        display: "inline-block",
        fontWeight: 600,
    },
    skillChip: {
        margin: theme.spacing(0.5),
        padding: theme.spacing(0.75),
        fontSize: "14.5px",
        borderRadius: "5px",
        fontWeight: 600,
        backgroundColor: theme.palette.secondary.main,
        color: "black",
    },
}));

export default (props) => {
    const classes = useStyles();
    return (
        <Box p={2} pr={5} className={classes.wrapper}>
            <Grid container alignItems="center">
                <Grid item xs>
                    <Typography variant="subtitle1">{props.title}</Typography>
                    <Typography className={classes.freelancerName} variant="subtitle1">{props.freelancerName}</Typography>
                </Grid>
                <Grid item container xs>
                    {props.skills.map((skill) => (
                        <Grid key={skill} className={classes.skillChip} item>
                            {skill}
                        </Grid>
                    ))}
                </Grid>
                <Grid item container direction="column" alignItems="flex-end" xs>
                    <Grid item>
                        <Typography variant="caption">
                            {differenceInHours(Date.now(), props.postedOn)} ساعة مضت | {props.type} | {props.location}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Box mt={2}>
                            <Button onClick={props.open} variant="outlined">تحقق</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};