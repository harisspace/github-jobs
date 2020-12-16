import React, { useState } from 'react';
import useFetchJobs from './useFetchJobs'
import { Container } from 'react-bootstrap'

function App() {
  const [params, setParamas] = useState({});
  const [page, setPage] = useState(1);
  const { jobs, loading, error } = useFetchJobs(params, page)

  return (
    <Container>
      { loading && <h1>loading...</h1>}
      { error && <h1>error, try refreshing</h1>}
      <h1>{ jobs.length }</h1>
    </Container>
  );
}

export default App;
