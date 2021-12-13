import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import FilledInput from '@mui/material/FilledInput';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';

const useStyles = makeStyles((theme) => ({
    skillChip: {
        margin: theme.spacing(0.5),
        padding: theme.spacing(0.75),
        fontSize: "14.5px",
        borderRadius: "5px",
        fontWeight: 600,
        border: `1px solid ${theme.palette.primary.main}`,
        color: "black",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: theme.palette.primary.main,
            color: "#fff",
        },
    },
    included: {
        backgroundColor: theme.palette.primary.main,
        color: "#fff",
    },
}));

const initState = {
    title: "",
    type: "عقد",
    freelancerName: "",
    freelancerUrl: "",
    location: "عن بعد",
    link: "",
    description: "",
    skills: [],
};

export default (props) => {
    const [loading, setLoading] = useState(false);
    const [freelancerDetails, setFreelancerDetails] = useState(initState);

    const handleChange = (e) => {
        // e.persist();
        setFreelancerDetails((oldState) => ({
            ...oldState,
            [e.target.name]: e.target.value,
        }));
    };

    const addRemoveSkill = (skill) =>
        freelancerDetails.skills.includes(skill)
            ? setFreelancerDetails((oldState) => ({
                ...oldState,
                skills: oldState.skills.filter((s) => s !== skill),
            }))
            : setFreelancerDetails((oldState) => ({
                ...oldState,
                skills: oldState.skills.concat(skill),
            }));

    const handleSubmit = async () => {
        for (const filled in freelancerDetails) {
            if (typeof freelancerDetails[filled] === "string" && !freelancerDetails[filled]) return;
        }
        if (!freelancerDetails.skills.length) return;
        setLoading(true);
        await props.addFreelancer(freelancerDetails);
        closeModal();
    };

    const closeModal = () => {
        setFreelancerDetails(initState);
        setLoading(false);
        props.closeModal();
    };

    const classes = useStyles();
    const skills = ["Bootstrap", "React.js", "flutter", "AWS", "Firebase", "Python", "MongoDB", "mysql",];

    return (
        <Dialog open={props.newJobModal} fullWidth>
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    اضافة فريلانسر
                    <IconButton onClick={closeModal}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <FilledInput onChange={handleChange} name="title" value={freelancerDetails.title} autoComplete="off" placeholder="اسم المشروع *" disableUnderline fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <Select onChange={handleChange} fullWidth name="type" value={freelancerDetails.type} disableUnderline variant="filled">
                            <MenuItem value="دوام كامل">دوام كامل</MenuItem>
                            <MenuItem value="دوام جزئي">دوام جزئي</MenuItem>
                            <MenuItem value="عقد">عقد</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput onChange={handleChange} name="freelancerName" value={freelancerDetails.freelancerName} autoComplete="off" placeholder="اسم الفريلانسر *" disableUnderline fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput onChange={handleChange} name="freelancerUrl" value={freelancerDetails.freelancerUrl} autoComplete="off" placeholder="بروفايل الفريلانسر *" disableUnderline fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <Select onChange={handleChange} fullWidth name="location" value={freelancerDetails.location} disableUnderline variant="filled">
                            <MenuItem value="عن بعد">عن بعد</MenuItem>
                            <MenuItem value=">مقر العميل">مقر العميل</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput onChange={handleChange} name="link" value={freelancerDetails.link} autoComplete="off" placeholder="رابط المشروع *" disableUnderline fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <FilledInput onChange={handleChange} name="description" value={freelancerDetails.description} autoComplete="off" placeholder="وصف المشروع *" disableUnderline fullWidth multiline rows={4} />
                    </Grid>
                </Grid>
                <Box mt={2}>
                    <Typography>المهارات*</Typography>
                    <Box display="flex">
                        {skills.map((skill) => (
                            <Box onClick={() => addRemoveSkill(skill)} className={`${classes.skillChip} ${freelancerDetails.skills.includes(skill) && classes.included}`} key={skill}>
                                {skill}
                            </Box>
                        ))}
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Box color="red" width="100%" display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="caption">* حقل مطلوب</Typography>
                    <Button onClick={handleSubmit} variant="contained" color="primary" disableElevation disabled={loading}>
                        {loading ? (
                            <CircularProgress color="primary" size={22} />
                        ) : (
                            "اضافة فريلانسر"
                        )}
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
};