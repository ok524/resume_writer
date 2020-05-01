export const TOGGLE_TOOLBAR = 'TOGGLE_TOOLBAR';
export const toggleToolbar = () => ({
  type: TOGGLE_TOOLBAR,
});

export const CHANGE_FONT = 'CHANGE_FONT';
export const changeFont = font => ({
  type: CHANGE_FONT,
  font,
});

export const CHANGE_TEMPLATE = 'CHANGE_TEMPLATE';
export const changeTemplate = template => ({
  type: CHANGE_TEMPLATE,
  template
});

export const CHANGE_RESUME_ORDER = 'CHANGE_RESUME_ORDER';
export const changeResumeOrder = order => ({
  type: CHANGE_RESUME_ORDER,
  order,
});

export const CHANGE_PAPER_SIZE = 'CHANGE_PAPER_SIZE';
export const changePaperSize = paperSize => ({
  type: CHANGE_PAPER_SIZE,
  paperSize,
});

export const NEW_RESUME = 'NEW_RESUME';
export const newResume = () => ({
  type: NEW_RESUME,
});

export const UPDATE_RESUME = 'UPDATE_RESUME';
export const updateResume = (resume) => ({
  type: UPDATE_RESUME,
  resume
});