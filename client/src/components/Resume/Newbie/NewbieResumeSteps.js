import { withRouter } from 'react-router-dom';

import uuid from 'uuid/v4';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Editor from "../../Editor/Editor";
import DefaultResume from "../../../resume-data";
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Slider from '@material-ui/core/Slider';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import SearchIcon from '@material-ui/icons/Search';
import { toast } from 'react-toastify';

const useStyles = makeStyles(theme => ({
  section: {
    flex: '1 1 auto'
  },
  content: {
    width: '100%',
    marginTop: '80px',
    padding: theme.spacing(2),
    boxSizing: 'border-box',
    marginBottom: theme.spacing(3)
  },
  stepperDesktop: {
    marginBottom: theme.spacing(2)
  },
  stepperMobile: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(3, 0)
  },
  pageTitle: {
    fontWeight: 'bold',
  },
  pageDesciption: {
    color: '#808080',
    fontWeight: 'normal'
  },
  sectionTitleContainer: {
    margin: theme.spacing(2, 0),
    padding: '0',
    position: 'relative'
  },
  sectionTitleInline: {
    display: 'inline-block'
  },
  sectionTitleButtonContainer: {
    display: 'inline-block',
    float: 'right',
  },
  sectionTitleButton: {
    marginRight: '8px'
  },
  deleteButtonOutline: {
    borderColor: '#E91E63',
    color: '#E91E63'
  },
  divider: {
    margin: theme.spacing(3, 0)
  },
  fab: {
    float: 'right',
    margin: theme.spacing(1, 0),
    marginLeft: theme.spacing(1)
  },
  fabIcon: {
    marginRight: theme.spacing(1)
  },
  formContainer: {
    padding: '0'
  },
  gridContainerDesktop: {
    margin: theme.spacing(1, -1, 2)
  },
  gridContainerMobile: {
    margin: theme.spacing(2, -1, 3)
  },
  gridItem: {
    width: '100%'
  },
  itemInGrid: {
    width: '48%',
    marginRight: '2%'
  },
  itemEndInGrid: {
    width: '48%'
  },
  editor: {
    margin: '8px 0'
  },
  itemButtonSection: {
    margin: theme.spacing(2, 0, 5),
    textAlign: 'right',
    padding: '0'
  },
  deleteButton: {
    backgroundColor: '#E91E63',
    color: 'white'
  },
  slider: {
    width: '95%'
  },
  previewDivider: {
    margin: theme.spacing(3, 0)
  },
  previewSectionTitle: {
    color: '#0099FF'
  },
  previewItemTitle: {
    fontWeight: 'bold'
  },
  buttonSection: {
    textAlign: 'right',
    marginTop: theme.spacing(5),
    padding: '0'
  },
  backButton: {
    marginRight: theme.spacing(1)
  }
}));

function getStepTitles() {
  return [
    'Job Ad URL',
    'Objective',
    'Education',
    'Experience',
    'Skills',
    'Preview'
  ];
}

function getPageTitles(stepIndex) {
  switch (stepIndex) {
    case 0:
      return 'Job Ad URL';
    case 1:
      return 'Objective';
    case 2:
      return 'Education Background';
    case 3:
      return 'Working Experience';
    case 4:
      return 'Technical Skills';
    case 5:
      return 'Preview';
    default:
      return 'Out of step index';
  }
}

function getPageDescription(stepIndex) {
  switch (stepIndex) {
    case 0:
      return 'Enter the URL of the job advertisement.';
    case 1:
      return 'What is your professional goals in the job?';
    case 2:
      return 'What you have studied before?';
    case 3:
      return 'Where have you worked before?';
    case 4:
      return 'What kind of skills that you know?';
    case 5:
      return 'Please check whether there is any information incorrect.';
    default:
      return 'Out of step index';
  }
}

function getSkillMarks(minValue, maxValue, step) {
  var labelNum = maxValue - minValue;
  var markList = [];
  for (var i = 0; i <= labelNum; i += step) {
    markList[i] = {
      "value": minValue + i,
      "label": i.toString()
    };
  }
  return markList;
}

const NewbieResumeSteps = ({ history, location, dispatch, auth, resume, match }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState((match.params.step) ? (parseInt(match.params.step.slice(4)) - 1) : 1);
  const [resumeId, setResumeId] = React.useState(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [recordAddNum, setRecordAddNum] = React.useState(0);
  const steps = getStepTitles();
  const isMobile = useMediaQuery('(max-width: 600px)');
  const marks = getSkillMarks(0, 10, 1);

  const fetchNewResume = () => {
    return fetch(process.env.REACT_APP_WEB_API_URL + '/resume', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token}`
      },
      body: JSON.stringify(resumeData)
    }).then(response => response.json())
      .then(response => response['id']);
  }

  const fetchUpdateResume = () => {
    return fetch(`${process.env.REACT_APP_WEB_API_URL}/resume?id=${resumeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token}`
      },
      body: JSON.stringify(resumeData)
    }).then(response => response.json())
  }

  const fetchGetJobAdsSummary = url => {
    toast.info('Analyzing Job Ads...', { autoClose: false });
    return fetch(`${process.env.REACT_APP_WEB_API_URL}/jobAdsAnalyzer?url=${url}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${auth.token}`
      }
    }).then(res => res.json())
      .then(jobAdsData => {
        toast.dismiss()
        if (!jobAdsData['message']) {
          setShowJobAdsSummary(true);
          setJobAdsData(jobAdsData);
        } else {
          toast.error('The url is not supported.', { autoClose: true });
        }
      })

  }

  useEffect(() => {
    if (match.params.step) {
      setActiveStep(parseInt(match.params.step.slice(4)) - 1);
    } else {
      setActiveStep(1);
    }
  }, [match.params.step]);

  useEffect(() => {
    if (match.params.resumeId) {
      setResumeId(match.params.resumeId);
      fetch(`${process.env.REACT_APP_WEB_API_URL}/resume?id=${match.params.resumeId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${auth.token}`
        }
      }).then(res => res.json())
        .then(res => JSON.parse(res['resume']))
        .then((resume) => {
          ['education', 'experience'].forEach(function (section, index) {
            resume[section].forEach(function (item, index) {
              ['startDate', 'endDate'].forEach(function (col, index) {
                if (item[col] && item[col].$date) {
                  item[col] = new Date(parseInt(item[col].$date))
                }
              })
            })
          })

          var newResumeData = { ...resume };
          setResumeData(newResumeData);
        });
    }
  }, [match.params.resumeId, auth.token])

  const handleNext = () => {
    saveResume();
    var newActiveStep = Math.min(activeStep + 1, 5);
    if (newActiveStep === 5) {
      history.push(`/builder/${resumeId}`)
    } else {
      if (!resumeId) {
        fetchNewResume().then(id => {
          setResumeId(id);
          history.push(`/resume/${id}/edit/step${newActiveStep + 1}`);
        });
      } else {
        history.push(`/resume/${resumeId}/edit/step${newActiveStep + 1}`);
      }

    }
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    saveResume();
    var newActiveStep = Math.max(activeStep - 1, 0);
    if (resumeId) {
      history.push(`/resume/${resumeId}/edit/step${newActiveStep + 1}`);
    } else {
      history.push(`/resume/edit/step${newActiveStep + 1}`);
    }

    setActiveStep(newActiveStep);
  };

  const [resumeData, setResumeData] = React.useState(resume);
  const [jobAdsData, setJobAdsData] = React.useState({});
  const [showJobAdsSummary, setShowJobAdsSummary] = React.useState(false);

  const defaultEducationItem = DefaultResume.education[0];
  const defaultExperienceItem = DefaultResume.experience[0];
  const defaultSkillItem = { name: null, level: 5 };

  const updateResumeValues = (section, name, value, idx) => {
    //const { name, value } = e.target;
    var newResumeData = { ...resumeData };
    if (idx !== undefined) {
      newResumeData[section][idx][name] = value;
      if (name === 'isPresent') {
        newResumeData[section][idx]['endDate'] = null;
      }
    } else {
      newResumeData[section][name] = value;
    }
    setResumeData(newResumeData);
    //setHeader(newHeader);
  }

  const addEducation = (nItem) => {
    var newResumeData = { ...resumeData };
    for (var i = 0; i < nItem; i++) {
      newResumeData.education.push(JSON.parse(JSON.stringify(defaultEducationItem)));
    }
    setResumeData(newResumeData);
  };

  const removeEducation = (i) => {
    var newResumeData = { ...resumeData };
    if (newResumeData.education.length > 1) {
      newResumeData.education.splice(i, 1);
      setResumeData(newResumeData);
    }
  };

  const addExperience = (nItem) => {
    var newResumeData = { ...resumeData };
    for (var i = 0; i < nItem; i++) {
      newResumeData.experience.push(JSON.parse(JSON.stringify(defaultExperienceItem)));
    }
    setResumeData(newResumeData);
  };

  const removeExperience = (i) => {
    var newResumeData = { ...resumeData };
    if (newResumeData.experience.length > 1) {
      newResumeData.experience.splice(i, 1);
      setResumeData(newResumeData);
    }
  };

  const addAchievement = (i) => {
    var newResumeData = { ...resumeData };
    newResumeData.experience[i].achievements.push('');
    setResumeData(newResumeData);
  }

  const updateAchievement = (workIdx, achievementIdx, value) => {
    if (resumeData.experience[workIdx]) {
      var newResumeData = { ...resumeData };
      newResumeData.experience[workIdx].achievements[achievementIdx] = value;
      setResumeData(newResumeData);
    }
  }

  const removeAchievement = (i) => {
    var newResumeData = { ...resumeData };
    if (newResumeData.experience[i].achievements.length > 1) {
      newResumeData.experience[i].achievements.pop();
      setResumeData(newResumeData);
    }
  }

  const addSkill = (i) => {
    var newResumeData = { ...resumeData };
    newResumeData.technicalSkills[i].keywords.push(JSON.parse(JSON.stringify(defaultSkillItem)));
    setResumeData(newResumeData);
  };

  const removeSkill = (i) => {
    var newResumeData = { ...resumeData };
    if (newResumeData.technicalSkills[i].keywords.length > 1) {
      newResumeData.technicalSkills[i].keywords.pop();
      setResumeData(newResumeData);
    }
  };

  const updateSkillName = (e, categoryIdx, keywordIdx) => {
    var newResumeData = { ...resumeData };
    newResumeData.technicalSkills[categoryIdx].keywords[keywordIdx][e.target.name] = e.target.value;
    setResumeData(newResumeData);
  };

  const updateSkillLevel = (categoryIdx, keywordIdx, level) => {
    var newResumeData = { ...resumeData };
    newResumeData.technicalSkills[categoryIdx].keywords[keywordIdx].level = level;
    setResumeData(newResumeData);
  }

  const saveResume = () => {
    if (resumeId) {
      fetchUpdateResume()
    }

  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  }

  const handleDialogDismiss = () => {
    setRecordAddNum(0);
    setDialogOpen(false);
  }

  const updateRecordAddNum = (e) => {
    setRecordAddNum(e.target.value);
  }

  const addRecordItems = () => {
    switch (activeStep) {
      case 2:
        addEducation(recordAddNum);
        break;
      case 3:
        addExperience(recordAddNum);
        break;
      default:
        break;
    }
    handleDialogDismiss();
  }

  return (
    <div className={classes.section}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Container className={classes.content} maxWidth="md">
          <Dialog open={dialogOpen} maxWidth="sm" aria-labelledby="dialog-title-add-records">
            <DialogTitle id="dialog-title-add-records">Add {getPageTitles(activeStep)} Records</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Enter the number of {getPageTitles(activeStep).toLowerCase()} records you want to add.
              </DialogContentText>
              <TextField autoFocus type="number" margin="normal" variant="outlined" value={recordAddNum} fullWidth onChange={(e) => updateRecordAddNum(e)} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogDismiss}>Cancel</Button>
              <Button onClick={addRecordItems} color="primary">Add</Button>
            </DialogActions>
          </Dialog>

          {/* activeStep={activeStep - 1} is to skip the "Job URL" step */}
          <Stepper className={isMobile ? classes.stepperMobile : classes.stepperDesktop} activeStep={activeStep - 1} alternativeLabel>
            {steps.map((label, idx) => (
              (idx == 0)
              ? null
              : <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Typography className={classes.pageTitle} variant="h4" align="center" gutterBottom>{getPageTitles(activeStep)}</Typography>
          <Typography className={classes.pageDesciption} variant="h6" align="center" gutterBottom>{getPageDescription(activeStep)}</Typography>
          <form fullwidth="true" autoComplete="off">
            {activeStep === 0 ? (null &&
              <div>
                <Grid container spacing={3} justify="space-between" alignItems="center">
                  <Grid item lg={10} xs={10}>
                    <TextField type="url" name="link" label="Job Ad URL" margin="normal" variant="outlined" value={resumeData.jobAds.link || ''} onChange={(e) => updateResumeValues("jobAds", e.target.name, e.target.value)} fullWidth />
                  </Grid>
                  <Grid item lg={2} xs={2}>
                    <Button variant="outlined" startIcon={<SearchIcon />} color="primary" className={classes.sectionTitleButton} onClick={() => fetchGetJobAdsSummary(resumeData.jobAds.link)}>Analyze</Button>
                  </Grid>
                </Grid>
                <TableContainer style={{ display: showJobAdsSummary ? 'block' : 'none' }}>
                  <Table aria-label="simple table">
                    <TableBody>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Job Title
                        </TableCell>
                        <TableCell align="left">
                          {(Object.keys(jobAdsData).length !== 0) ? jobAdsData.summary['job_title'] : ''}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Job Skills
                        </TableCell>
                        <TableCell align="left">
                          {(Object.keys(jobAdsData).length !== 0) ? jobAdsData.summary['job_skills'].join(', ') : ''}
                        </TableCell>
                      </TableRow>
                      {['Industry Knowledge', 'Tools & Technologies', 'Language'].map((area, i) => (
                        <TableRow key={i}>
                          <TableCell component="th" scope="row">
                            {area}
                          </TableCell>
                          <TableCell align="left">
                            {(Object.keys(jobAdsData).length !== 0) && area in jobAdsData.requirements ? Object.keys(jobAdsData.requirements[area]).join(', ') : ''}
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Development Languages
                        </TableCell>
                        <TableCell align="left">
                          {(Object.keys(jobAdsData).length !== 0) ? jobAdsData.requirements['Development Languages'].join(', ') : ''}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Job Description
                        </TableCell>
                        <TableCell align="left">
                          {(Object.keys(jobAdsData).length !== 0) ? jobAdsData.summary['job_description'].toString().split('\n').map((item, i) => {
                            return <p key={i}>{item}</p>;
                          }) : ''}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            ) : activeStep === 1 ?
                <Editor id={uuid()} name="objective" label="objective" height="200" value={resumeData.objectives.objective || ''} onChange={(newValue) => updateResumeValues("objectives", 'objective', newValue)} />
                : activeStep === 2 ? (
                  <div>
                    <Fab variant="extended" color="primary" className={classes.fab} onClick={handleDialogOpen}>
                      <AddIcon className={classes.fabIcon} />
                      Add Multiple Records
                      </Fab>
                    <Fab variant="extended" color="primary" className={classes.fab} onClick={() => addEducation(1)}>
                      <AddIcon className={classes.fabIcon} />
                                Add Education Background
                            </Fab>
                    {resumeData.education.map((item, index) => (
                      <Container fullwidth="true" className={classes.formContainer} key={index}>
                        <input type="hidden" name="index" value={index} />
                        <TextField key="institutionName" type="text" name="institutionName" label="Institution Name" margin="normal" variant="outlined" value={item.institutionName || ''} onChange={(e) => updateResumeValues('education', e.target.name, e.target.value, index)} required fullWidth />
                        <Grid container spacing={2} align="center" justify="center" alignItems="center" className={isMobile ? classes.gridContainerMobile : classes.gridContainerDesktop}>
                          <Grid item lg={2} xs={12}>
                            <Typography variant="h6" align="left">
                              Study Period
                            </Typography>
                          </Grid>
                          <Grid item lg={2} xs={12}>
                            <FormControlLabel
                              control={
                                <Checkbox checked={item.isPresent || false} name="isPresent" color="primary" onChange={(e) => updateResumeValues('education', e.target.name, e.target.checked, index)} />
                              }
                              label="Present"
                            />
                          </Grid>
                          <Grid item lg={4} xs={12} className={classes.gridItem}>
                            <KeyboardDatePicker
                              value={item.startDate || null}
                              views={['year', 'month']}
                              label="Admission Date"
                              format="MMMM yyyy"
                              onChange={(date) => updateResumeValues('education', 'startDate', date, index)}
                            />
                          </Grid>
                          <Grid item lg={4} xs={12} className={classes.gridItem}>
                            <KeyboardDatePicker
                              value={item.endDate || null}
                              views={['year', 'month']}
                              label="Graduation Date"
                              format="MMMM yyyy"
                              disabled={item.isPresent}
                              onChange={(date) => updateResumeValues('education', 'endDate', date, index)}
                            />
                          </Grid>
                        </Grid>
                        <FormControl variant="filled" fullWidth>
                          <InputLabel id="education-level-label">
                            Education Level
                          </InputLabel>
                          <Select labelId="education-level-label" name="educationLevel" value={item.educationLevel || ''} onChange={(e) => updateResumeValues('education', e.target.name, e.target.value, index)}>
                            <MenuItem value="Secondary School">Secondary School</MenuItem>
                            <MenuItem value="Foundation Diploma">Foundation Diploma</MenuItem>
                            <MenuItem value="Higher Diploma">Higher Diploma</MenuItem>
                            <MenuItem value="GED">GED</MenuItem>
                            <MenuItem value="Associate of Arts">Associate of Arts</MenuItem>
                            <MenuItem value="Associate of Science">Associate of Science</MenuItem>
                            <MenuItem value="Associate of Applied Science">Associate of Applied Science</MenuItem>
                            <MenuItem value="Bachelor of Arts">Bachelor of Arts</MenuItem>
                            <MenuItem value="Bachelor of Education">Bachelor of Education</MenuItem>
                            <MenuItem value="Bachelor of Science">Bachelor of Science</MenuItem>
                            <MenuItem value="BBA">BBA</MenuItem>
                            <MenuItem value="Master of Arts">Master of Arts</MenuItem>
                            <MenuItem value="Master of Science">Master of Science</MenuItem>
                            <MenuItem value="MBA">MBA</MenuItem>
                            <MenuItem value="J.D.">J.D.</MenuItem>
                            <MenuItem value="M.D.">M.D.</MenuItem>
                            <MenuItem value="Ph.D.">Ph.D.</MenuItem>
                          </Select>
                        </FormControl>
                        <TextField key="speciality" name="speciality" type="text" variant="outlined" label="Speciality" margin="normal" multiline rows="4" value={item.speciality || ''} onChange={(e) => updateResumeValues('education', e.target.name, e.target.value, index)} fullWidth />
                        <Container className={classes.itemButtonSection} fullwidth="true">
                          <Button className={classes.deleteButton} variant="contained" startIcon={<DeleteIcon />} onClick={() => removeEducation(index)}>Delete Education Background</Button>
                        </Container>
                      </Container>
                    ))}
                  </div>
                ) : activeStep === 3 ? (
                  <div>
                    <Fab variant="extended" color="primary" className={classes.fab} onClick={handleDialogOpen}>
                      <AddIcon className={classes.fabIcon} />
                      Add Multiple Records
                    </Fab>
                    <Fab variant="extended" color="primary" className={classes.fab} onClick={() => addExperience(1)}>
                      <AddIcon className={classes.fabIcon} />
                      Add Working Experience
                    </Fab>
                    {resumeData.experience.map((work, index) => (
                      <Container fullwidth="true" className={classes.formContainer} key={index}>
                        <TextField name="position" type="text" variant="outlined" label="Job Title" margin="normal" value={work.position || ''} onChange={(e) => updateResumeValues('experience', e.target.name, e.target.value, index)} required fullWidth />
                        <TextField name="company" type="text" variant="outlined" label="Company Name" margin="normal" value={work.company || ''} onChange={(e) => updateResumeValues('experience', e.target.name, e.target.value, index)} required fullWidth />
                        <Grid container spacing={2} align="center" justify="center" alignItems="center" className={isMobile ? classes.gridContainerMobile : classes.gridContainerDesktop}>
                          <Grid item lg={2} xs={12}>
                            <Typography variant="h6" align="left">
                              Working Period
                            </Typography>
                          </Grid>
                          <Grid item lg={2} xs={12}>
                            <FormControlLabel
                              control={
                                <Checkbox checked={work.isPresent || false} name="isPresent" color="primary" onChange={(e) => updateResumeValues('experience', e.target.name, e.target.checked, index)} />
                              }
                              label="Present"
                            />
                          </Grid>
                          <Grid item lg={4} xs={12} className={classes.gridItem}>
                            <KeyboardDatePicker
                              value={work.startDate || null}
                              views={['year', 'month']}
                              label="Start Date"
                              format="MMMM yyyy"
                              onChange={(date) => updateResumeValues('experience', 'startDate', date, index)}
                            />
                          </Grid>
                          <Grid item lg={4} xs={12} className={classes.gridItem}>
                            <KeyboardDatePicker
                              value={work.endDate || null}
                              views={['year', 'month']}
                              label="Start Date"
                              format="MMMM yyyy"
                              disabled={work.isPresent}
                              onChange={(date) => updateResumeValues('experience', 'endDate', date, index)}
                            />
                          </Grid>
                        </Grid>
                        <Divider variant="fullWidth" className={classes.divider} />
                        <Container className={classes.sectionTitleContainer}>
                          <Typography variant="h6" align="left" className={classes.sectionTitleInline} gutterBottom>
                            Achievements
                          </Typography>
                          <div className={classes.sectionTitleButtonContainer}>
                            <Button variant="outlined" startIcon={<AddIcon />} color="primary" className={classes.sectionTitleButton} onClick={() => addAchievement(index)}>Add</Button>
                            <Button variant="outlined" startIcon={<DeleteIcon />} className={classes.deleteButtonOutline} onClick={() => removeAchievement(index)}>Delete</Button>
                          </div>
                        </Container>
                        {work.achievements.map((achievement, achievementIdx) => (
                          <div className={classes.editor}>
                            <Editor key={achievementIdx} id={uuid()} name="achievement" label={"Achievement " + (achievementIdx + 1)} height="100" value={achievement || ''} onChange={(newValue) => updateAchievement(index, achievementIdx, newValue)} />
                          </div>
                        ))}
                        <Container className={classes.itemButtonSection} fullwidth="true">
                          <Button className={classes.deleteButton} variant="contained" startIcon={<DeleteIcon />} onClick={() => removeExperience(index)}>Delete Working Experience</Button>
                        </Container>
                      </Container>
                    ))}
                  </div>
                ) : activeStep === 4 ? (
                  <div>
                    {resumeData.technicalSkills.map((categorizedSkill, categoryIdx) => (
                      <Container key={categoryIdx} fullwidth="true" className={classes.formContainer}>
                        <Container className={classes.sectionTitleContainer}>
                          <Typography variant="h6" align="left" className={classes.sectionTitleInline} gutterBottom>
                            {categorizedSkill.category}
                          </Typography>
                          <div className={classes.sectionTitleButtonContainer}>
                            <Button variant="outlined" startIcon={<AddIcon />} color="primary" className={classes.sectionTitleButton} onClick={() => addSkill(categoryIdx)}>Add</Button>
                            <Button variant="outlined" startIcon={<DeleteIcon />} className={classes.deleteButtonOutline} onClick={() => removeSkill(categoryIdx)}>Delete</Button>
                          </div>
                        </Container>
                        <Grid container spacing={2} justify="center" alignItems="center" className={isMobile ? classes.gridContainerMobile : classes.gridContainerDesktop}>
                          {categorizedSkill.keywords.map((keyword, keywordIdx) => (
                            <Grid key={keywordIdx} container justify="space-between" alignItems="center" className={isMobile ? classes.gridContainerMobile : classes.gridContainerDesktop}>
                              <Grid item lg={6} xs={12} className={classes.gridItem}>
                                <TextField type="text" name="name" label="Technical Skill" variant="outlined" value={keyword.name || ''} onChange={(e) => updateSkillName(e, categoryIdx, keywordIdx)} fullWidth />
                              </Grid>
                              <Grid item lg={5} xs={12} className={classes.gridItem}>
                                <Slider name="marks" step={1} marks={marks} value={keyword.level} valueLabelDisplay="auto" min={0} max={10} onChangeCommitted={(e, level) => updateSkillLevel(categoryIdx, keywordIdx, level)} />
                              </Grid>
                            </Grid>
                          ))}
                        </Grid>
                      </Container>
                    ))}
                  </div>
                ) : activeStep === 5 ? (
                  <Container fullwidth="true">
                    <Typography variant="h6" align="left" className={classes.previewSectionTitle} gutterBottom>
                      Basic Information
                    </Typography>
                    <Grid container spacing={2} justify="space-between" alignItems="center" className={isMobile ? classes.gridContainerMobile : classes.gridContainerDesktop}>
                      <Grid item lg={3} xs={12} className={classes.gridItem}>
                        <Typography variant="body1" align="left" className={classes.previewItemTitle}>
                          Job Ad URL
                        </Typography>
                      </Grid>
                      <Grid item lg={9} xs={12} className={classes.gridItem}>
                        <Typography variant="body1" align="left">
                          {(resumeData.jobAds.link === "" || resumeData.jobAds.link === null) ? <em>Not Specified</em> : resumeData.jobAds.link}
                        </Typography>
                      </Grid>
                      <Grid item lg={3} xs={12} className={classes.gridItem}>
                        <Typography variant="body1" align="left" className={classes.previewItemTitle}>
                          Objective
                        </Typography>
                      </Grid>
                      <Grid item lg={9} xs={12} className={classes.gridItem}>
                        <Typography variant="body1" align="left">
                          {(resumeData.header.objective === "" || resumeData.header.objective === null) ? <em>Not Specified</em> : resumeData.header.objective}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Divider variant="fullWidth" className={classes.previewDivider} />
                    <Typography variant="h6" align="left" className={classes.previewSectionTitle} gutterBottom>
                      Education Background
                            </Typography>
                    {(resumeData.education).map((item, index) => (
                      <Grid key={index} container spacing={2} justify="space-between" alignItems="center" className={isMobile ? classes.gridContainerMobile : classes.gridContainerDesktop}>
                        <Grid item lg={3} xs={12} className={classes.gridItem}>
                          <Typography variant="body1" align="left" className={classes.previewItemTitle}>
                            Institution Name
                          </Typography>
                        </Grid>
                        <Grid item lg={9} xs={12} className={classes.gridItem}>
                          <Typography variant="body1" align="left">
                            {item.institutionName}
                          </Typography>
                        </Grid>
                        <Grid item lg={3} xs={12} className={classes.gridItem}>
                          <Typography variant="body1" align="left" className={classes.previewItemTitle}>
                            Study Period
                          </Typography>
                        </Grid>
                        <Grid item lg={9} xs={12} className={classes.gridItem}>
                          <Typography variant="body1" align="left">
                            {item.startMonth}/{item.startYear} - {item.endMonth === '0' ? "Present" : item.endMonth + "/" + item.endYear}
                          </Typography>
                        </Grid>
                        <Grid item lg={3} xs={12} className={classes.gridItem}>
                          <Typography variant="body1" align="left" className={classes.previewItemTitle}>
                            Education Level
                          </Typography>
                        </Grid>
                        <Grid item lg={9} xs={12} className={classes.gridItem}>
                          <Typography variant="body1" align="left">
                            {item.educationLevel}
                          </Typography>
                        </Grid>
                        <Grid item lg={3} xs={12} className={classes.gridItem}>
                          <Typography variant="body1" align="left" className={classes.previewItemTitle}>
                            Speciality
                          </Typography>
                        </Grid>
                        <Grid item lg={9} xs={12} className={classes.gridItem}>
                          <Typography variant="body1" align="left">
                            {item.speciality}
                          </Typography>
                        </Grid>
                      </Grid>
                    ))}
                    <Divider variant="fullWidth" className={classes.previewDivider} />
                    <Typography variant="h6" align="left" className={classes.previewSectionTitle} gutterBottom>
                      Working Experience
                    </Typography>
                    {(resumeData.experience).map((item, index) => (
                      <Grid key={index} container spacing={2} justify="space-between" alignItems="center" className={isMobile ? classes.gridContainerMobile : classes.gridContainerDesktop}>
                        <Grid item lg={3} xs={12} className={classes.gridItem}>
                          <Typography variant="body1" align="left" className={classes.previewItemTitle}>
                            Job Title
                          </Typography>
                        </Grid>
                        <Grid item lg={9} xs={12} className={classes.gridItem}>
                          <Typography variant="body1" align="left">
                            {item.position}
                          </Typography>
                        </Grid>
                        <Grid item lg={3} xs={12} className={classes.gridItem}>
                          <Typography variant="body1" align="left" className={classes.previewItemTitle}>
                            Company Name
                          </Typography>
                        </Grid>
                        <Grid item lg={9} xs={12} className={classes.gridItem}>
                          <Typography variant="body1" align="left">
                            {item.company}
                          </Typography>
                        </Grid>
                        <Grid item lg={3} xs={12} className={classes.gridItem}>
                          <Typography variant="body1" align="left" className={classes.previewItemTitle}>
                            Working Period
                                        </Typography>
                        </Grid>
                        <Grid item lg={9} xs={12} className={classes.gridItem}>
                          <Typography variant="body1" align="left">
                            {item.startMonth}/{item.startYear} - {item.endMonth === '0' ? "Present" : item.endMonth + "/" + item.endYear}
                          </Typography>
                        </Grid>
                        <Grid item lg={3} xs={12} className={classes.gridItem}>
                          <Typography variant="body1" align="left" className={classes.previewItemTitle}>
                            Key Competences
                          </Typography>
                        </Grid>
                        <Grid item lg={9} xs={12} className={classes.gridItem}>
                          <Typography variant="body1" align="left">
                            {item.keyCompetences}
                          </Typography>
                        </Grid>
                        <Grid item lg={3} xs={12} className={classes.gridItem}>
                          <Typography variant="body1" align="left" className={classes.previewItemTitle}>
                            Achievements
                          </Typography>
                        </Grid>
                        <Grid item lg={9} xs={12} className={classes.gridItem}>
                          <Typography variant="body1" align="left">
                            {item.achievements}
                          </Typography>
                        </Grid>
                      </Grid>
                    ))}
                    <Divider variant="fullWidth" className={classes.previewDivider} />
                    <Typography variant="h6" align="left" className={classes.previewSectionTitle} gutterBottom>
                      Technical Skills
                    </Typography>
                    {(resumeData.technicalSkills).map((categorizedSkill, index) => (
                      <Grid key={index} container spacing={2} justify="space-between" alignItems="center" className={isMobile ? classes.gridContainerMobile : classes.gridContainerDesktop}>
                        <Grid item lg={3} xs={12} className={classes.gridItem}>
                          <Typography variant="body1" align="left" className={classes.previewItemTitle}>
                            Skill Name
                          </Typography>
                        </Grid>
                        <Grid item lg={9} xs={12} className={classes.gridItem}>
                          <Typography variant="body1" align="left">
                            {categorizedSkill.category}
                          </Typography>
                        </Grid>
                        <Grid item lg={3} xs={12} className={classes.gridItem}>
                          <Typography variant="body1" align="left" className={classes.previewItemTitle}>
                            Marks
                          </Typography>
                        </Grid>
                        <Grid item lg={9} xs={12} className={classes.gridItem}>
                          <Typography variant="body1" align="left">
                            {0}
                          </Typography>
                        </Grid>
                      </Grid>
                    ))}
                  </Container>
                ) : 'Out of index'}
          </form>
          <Container className={classes.buttonSection}>
            <Button className={classes.backButton} onClick={handleBack} disabled={activeStep < 2} size="large">Back</Button>
            <Button onClick={handleNext} size="large" variant="contained" color="primary">
              {activeStep < 4 ? 'Next' : 'Preview'}
            </Button>
          </Container>
        </Container>
      </MuiPickersUtilsProvider>
    </div>
  )
};

const mapStateToProps = state => ({
  auth: state.auth,
  resume: state.resume
});

export default connect(mapStateToProps)(withRouter(NewbieResumeSteps));