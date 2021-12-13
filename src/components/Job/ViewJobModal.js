import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { format } from "date-fns";

const useStyles = makeStyles((theme) => ({
    info: {
        "& > *": {
            margin: "4px",
        },
    },
    skillChip: {
        margin: theme.spacing(0.5),
        padding: theme.spacing(0.75),
        fontSize: "14.5px",
        borderRadius: "5px",
        fontWeight: 600,
        backgroundColor: theme.palette.primary.main,
        color: "black",
    },
}));

export default (props) => {
    const classes = useStyles();

    return (
        <Dialog open={!!Object.keys(props.job).length} fullWidth>
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    {props.job.title} @ {props.job.freelancerName}
                    <IconButton onClick={props.closeModal}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Box>
                    <Box className={classes.info} display="flex">
                        <Typography variant="caption">تمت الاضافة في:</Typography>
                        <Typography variant="body2">
                            {props.job.postedOn && format(props.job.postedOn, "dd/MM/yyy HH:MM")}
                        </Typography>
                    </Box>
                    <Box className={classes.info} display="flex">
                        <Typography variant="caption">اسم المشروع:</Typography>
                        <Typography variant="body2">{props.job.type}</Typography>
                    </Box>
                    <Box className={classes.info} display="flex">
                        <Typography variant="caption">مكان المشروع:</Typography>
                        <Typography variant="body2">{props.job.location}</Typography>
                    </Box>
                    <Box className={classes.info} display="flex">
                        <Typography variant="caption">وصف المشروع:</Typography>
                        <Typography variant="body2">{props.job.description}</Typography>
                    </Box>
                    <Box className={classes.info} display="flex">
                        <Typography variant="caption">اسم الفريلانسر:</Typography>
                        <Typography variant="body2">{props.job.freelancerName}</Typography>
                    </Box>
                    <Box className={classes.info} display="flex">
                        <Typography variant="caption">بروفايل الفريلانسر:</Typography>
                        <Typography variant="body2">{props.job.freelancerUrl}</Typography>
                    </Box>
                    <Box mr={0.5}>
                        <Typography variant="caption">المهارات:</Typography>
                        <Grid container alignItems="center">
                            {props.job.skills && props.job.skills.map((skill) => (
                                <Grid item key={skill} className={classes.skillChip}>
                                    {skill}
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" component="a" href={props.job.link} target="_blank">موافق</Button>
            </DialogActions>
        </Dialog>
    );
};