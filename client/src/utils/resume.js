//import ls from './localstorage';

export const OBJECTIVE = 0;
export const EDUCATION = 1;
export const TECH_SKILLS = 2;
export const PROJECTS = 3;
export const EXPERIENCE = 4;
export const CERTIFICATION = 5;

export const defaultResumeOrder = [
  OBJECTIVE,
  EDUCATION, 
  EXPERIENCE, 
  TECH_SKILLS
];

export const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export const getPeriod = (obj) => {
  var startDate, endDate;
  if (obj.startDate) {
    startDate = monthShortNames[obj.startDate.getMonth()] + ' ' + obj.startDate.getFullYear()
  }
  if (obj.isPresent) {
    endDate = 'Present';
  } else {
    if (obj.endDate) {
      endDate = monthShortNames[obj.endDate.getMonth()] + ' ' + obj.endDate.getFullYear()
    }
  }
  return `${startDate} - ${endDate}`;
}

export const STORED_RESUME_KEY = 'resume-key-6';

export const saveResume = (resume) => {
  localStorage.setItem(STORED_RESUME_KEY, JSON.stringify(resume));
};

export const loadResume = () => JSON.parse(localStorage.getItem(STORED_RESUME_KEY));