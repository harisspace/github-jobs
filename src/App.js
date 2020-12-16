import React, { useState } from 'react';
import useFetchJobs from './useFetchJobs'
import { Container } from 'react-bootstrap'
import JobDetails from './JobsDetails'

function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const { jobs, loading, error } = useFetchJobs(params, page)

  return (
    <Container className="my-3">
      <h1 className="mb-4">Github Jobs</h1>
      { loading && <h1>loading...</h1>}
      { error && <h1>error, try refreshing</h1>}
      {
        jobs.map(job => {
          return (
            <JobDetails key={job.id} job={job} />
          )
        })
      }
    </Container>
  );
}

export default App;
