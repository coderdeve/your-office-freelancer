import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@mui/styles";
import CircularProgress from '@mui/material/CircularProgress';

const useStyles = makeStyles({
    wrapper: {
        backgroundColor: "#fff",
        display: "flex",
        boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
        borderRadius: "5px",
        "& > *": {
            flex: 1,
            height: "45px",
            margin: "8px",
        },
    },
});

export default (props) => {
    const [loading, setLoading] = useState(false);
    const [freelancerSearch, setFreelancerSearch] = useState({
        type: "عقد",
        location: "عن بعد",
    });

    const handleChange = (e) => {
        // e.persist();
        setFreelancerSearch((oldState) => ({
            ...oldState,
            [e.target.name]: e.target.value,
        }));
    };

    const search = async () => {
        setLoading(true);
        await props.fetchJobsCustom(freelancerSearch);
        setLoading(false);
    }

    const classes = useStyles();
    return (
        <Box p={2} mt={-5} mb={2} className={classes.wrapper}>
            <Select onChange={handleChange} value={freelancerSearch.type} name="type" disableUnderline variant="filled">
                <MenuItem value="دوام كامل">دوام كامل</MenuItem>
                <MenuItem value="دوام جزئي">دوام جزئي</MenuItem>
                <MenuItem value="عقد">عقد</MenuItem>
            </Select>
            <Select onChange={handleChange} value={freelancerSearch.location} name="location" disableUnderline variant="filled">
                <MenuItem value="عن بعد">عن بعد</MenuItem>
                <MenuItem value="مقر العميل">مقر العميل</MenuItem>
            </Select>
            <Button disabled={loading} variant="contained" color="primary" disableElevation onClick={search}>
                {loading ? (
                    <CircularProgress color="primary" size={22} />
                ) : (
                    "فلتر"
                )}
            </Button>
        </Box>
    );
};