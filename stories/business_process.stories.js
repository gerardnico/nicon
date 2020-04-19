import { base, filename } from 'paths.macro';
import { toStoryHierarchy } from '../src/lib/story';

export default {
  title: toStoryHierarchy(base,filename)
};

import markdown from '../images/simple/process_business/cash_register.md';
export const CashRegister = () => '<img src="simple/process_business/cash_register.svg?sanitize=true" alt="Cash Register Icon" height="128px" width="128px" >';

CashRegister.story = {
  name: "Cash Register",
  parameters: {
    notes: { markdown }
  }
};
