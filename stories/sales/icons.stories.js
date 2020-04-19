import { base, filename } from 'paths.macro';
import markdown from './icons.md';
//import { to } from '../';

// console.log(`${base}`)
export default {
  title: `${filename}`
};


export const CashRegister = () => '<img src="icons/cash_register.svg?sanitize=true" alt="Cash Register Icon" height="128px" width="128px" >';

CashRegister.story = {
  name: "Cash Register",
  parameters: {
    notes: {
      'Introduction': markdown ,
      'Design Notes': 'design'
    },
  }
};
