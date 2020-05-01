import {
  CHANGE_FONT,
  CHANGE_TEMPLATE,
  CHANGE_RESUME_ORDER,
  CHANGE_PAPER_SIZE
} from '../../../action/builder';

import { paperSizes } from '../../../utils/pageSizes';
import { defaultResumeOrder } from '../../../utils/resume';

const initialState = {
  font: 'Serif',
  order: defaultResumeOrder,
  autoSave: false,
  paperSize: paperSizes[0],
  template: 'Template-1'
};

const changeFont = (state, action) => ({
  ...state,
  font: action.font,
});

const changeTemplate = (state, action) => ({
  ...state,
  template: action.template,
});

const changeResumeOrder = (state, action) => ({
  ...state,
  order: action.order,
});

const choosePaperSize = (state, paperSize) => ({
  ...state,
  paperSize,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_FONT:
      return changeFont(state, action);
    case CHANGE_TEMPLATE:
      return changeTemplate(state, action);
    case CHANGE_RESUME_ORDER:
      return changeResumeOrder(state, action);
    case CHANGE_PAPER_SIZE:
      return choosePaperSize(state, action.paperSize);
    default:
      return state;
  }
};