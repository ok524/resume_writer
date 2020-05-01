import { withRouter } from 'react-router-dom';

import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import WorkIcon from '@material-ui/icons/Work';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import StyleIcon from '@material-ui/icons/Style';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

const useStyles = makeStyles(theme => ({
    content: {
        backgroundImage: "url('/assets/images/background-01.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundAttachment: "scroll",
        padding: theme.spacing(8, 0)
    },
    typography: {
        color: 'white'
    },
    gridContainer: {
        marginTop: theme.spacing(4)
    },
    step: {
        display: 'inline',
        marginTop: theme.spacing(2)
    },
    stepNumber: {
        display: 'inline-block',
        width: '30px',
        height: '30px',
        backgroundColor: '#0099FF',
        borderRadius: '30px',
        color: 'white',
        marginRight: '10px',
        lineHeight: '30px'
    },
    icon: {
        display: 'block',
        fontSize: '64px'
    }
}));

const Workflow = ({history}) => {

    const classes = useStyles();

    return (
        <div className={classes.content}>
            <Container maxWidth="lg">
                <Typography className={classes.subTitle} variant="h4" align="center" gutterBottom>
                    Build Your Resume in 4 Simple Steps
                </Typography>
                <Grid container className={classes.gridContainer} spacing={6} align="center" justify="center">
                    <Grid item>
                        <WorkIcon className={classes.icon} />
                        <Typography className={classes.stepNumber} variant="subtitle1" gutterBottom>1</Typography>
                        <Typography className={classes.step} variant="subtitle1" gutterBottom>
                            Enter Job Ad Information
                        </Typography>
                    </Grid>
                    <Grid item>
                        <AssignmentIndIcon className={classes.icon} />
                        <Typography className={classes.stepNumber} variant="subtitle1" gutterBottom>2</Typography>
                        <Typography className={classes.step} variant="subtitle1" align="left" gutterBottom>
                            Fill In Your Information
                        </Typography>
                    </Grid>
                    <Grid item>
                        <StyleIcon className={classes.icon} />
                        <Typography className={classes.stepNumber} variant="subtitle1" gutterBottom>3</Typography>
                        <Typography className={classes.step} variant="subtitle1" align="left" gutterBottom>
                            Choose Resume Template
                        </Typography>
                    </Grid>
                    <Grid item>
                        <CloudDownloadIcon className={classes.icon} />
                        <Typography className={classes.stepNumber} variant="subtitle1" gutterBottom>4</Typography>
                        <Typography className={classes.step} variant="subtitle1" align="left" gutterBottom>
                            Download Your Resume
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default withRouter(Workflow);