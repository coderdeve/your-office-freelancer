import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import CircularProgress from '@mui/material/CircularProgress';
import theme from "./theme/theme";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import JobCard from "./components/Job/JobCard";
import NewJobModal from "./components/Job/NewJobModal";
import { firestore, app } from "./firebase/config";
import Button from "@mui/material/Button";
import CloseIcon from '@mui/icons-material/Close';
import ViewJobModal from "./components/Job/ViewJobModal";

export default () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customSearch, setCustomSearch] = useState(false);
  const [newJobModal, setNewJobModal] = useState(false);
  const [viewfreelancer, setViewfreelancer] = useState({});


  const fetchJobs = async () => {
    setCustomSearch(false);
    setLoading(true);
    const req = await firestore.collection("jobs").orderBy("postedOn", "desc").get();
    const tempJobs = req.docs.map((job) => ({ ...job.data(), id: job.id, postedOn: job.data().postedOn.toDate(), }));
    setJobs(tempJobs);
    setLoading(false);
  };

  const fetchJobsCustom = async (freelancerSearch) => {
    setLoading(true);
    setCustomSearch(true);
    const req = await firestore.collection("jobs").orderBy("postedOn", "desc").where("location", '==', freelancerSearch.location).where("type", '==', freelancerSearch.type).get();
    const tempJobs = req.docs.map((job) => ({ ...job.data(), id: job.id, postedOn: job.data().postedOn.toDate(), }));
    setJobs(tempJobs);
    setLoading(false);
  }

  const addFreelancer = async (freelancerDetails) => {
    await firestore.collection("jobs").add({
      ...freelancerDetails,
      postedOn: app.firestore.FieldValue.serverTimestamp(),
    });
    fetchJobs();
  };

  useEffect(() => {
    fetchJobs();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Header openNewJobModal={() => setNewJobModal(true)} />
      <NewJobModal closeModal={() => setNewJobModal(false)} newJobModal={newJobModal} addFreelancer={addFreelancer} />
      <ViewJobModal job={viewfreelancer} closeModal={() => setViewfreelancer({})} />
      <Box mb={3}>
        <Grid container justify="center">
          <Grid item xs={10}>
            <SearchBar fetchJobsCustom={fetchJobsCustom} />

            {loading ? (
              <Box display="flex" justifyContent="center"><CircularProgress /></Box>
            ) : (
              <>
                {customSearch && (
                  <Box my={2} display="flex" justifyContent="flex-end">
                    <Button onClick={fetchJobs}>
                      <CloseIcon size={20} />
                      بحث مخصص
                    </Button>
                  </Box>
                )}
                {jobs.map((job) => (
                  <JobCard open={()=> setViewfreelancer(job)} key={job.id} {...job} />
                ))}
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};