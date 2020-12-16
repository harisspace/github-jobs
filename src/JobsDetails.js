import React, { useState } from 'react'
import { Badge, Card, Button, Collapse } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'

function JobsDetails({ job }) {
    const [open, setOpen] = useState(false);

    return (
        <Card className="mb-3">
            <Card.Body>
                <div className="d-flex justify-content-between">
                    <div>
                        <Card.Title>
                            {job.title} - <span className="text-muted font-weight-light">{job.company}</span>
                        </Card.Title>
                        <Card.Subtitle>
                            { new Date(job.created_at).toLocaleDateString() }
                        </Card.Subtitle>
                        <Badge variant="secondary" className="mr-2">{ job.type }</Badge>
                        <Badge variant="secondary">{ job.location }</Badge>
                        <div style={{ wordBreak: "break-all "}}>
                            <ReactMarkdown>{job.how_to_apply}</ReactMarkdown>
                        </div>
                    </div>
                    <img src={ job.company_logo } alt={ job.company } className="d-none d-md-block" height="50px" />
                </div>
                <Card.Text>
                    <Button variant="primary" onClick={ () => setOpen(!open) }>
                        {
                            open? "Hide Details" : "View Details"
                        }
                    </Button>
                </Card.Text>
                <Collapse in={open}>
                    <div className="mt-4">
                        <ReactMarkdown>{ job.description }</ReactMarkdown>
                    </div>
                </Collapse>
            </Card.Body>
        </Card>
    )
}

export default JobsDetails
