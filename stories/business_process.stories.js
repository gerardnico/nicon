import { base, filename } from 'paths.macro';
import { toStoryHierarchy } from '../src/lib/story';

export default {
  title: toStoryHierarchy(base,filename)
};

import cashRegisterMd from '../gallery/simple/process_business/cash_register.md';
export const CashRegister = () => '<img src="simple/process_business/cash_register.svg?sanitize=true" alt="Cash Register Icon" height="128px" width="128px" >';

CashRegister.story = {
  name: "Cash Register",
  parameters: {
    notes: { cashRegisterMd }
  }
};

import scaleMd from '../gallery/simple/process_business/scale.md';

export const Scale = () => '<img src="simple/process_business/scale.svg?sanitize=true" alt="Scale" height="128px" width="128px" >';
Scale.story = {
  name: "Scale",
  parameters: {
    notes: scaleMd
  }
};
export const Trolley = () => '<img src="simple/process_business/trolley.svg?sanitize=true" alt="Trolley" height="128px" width="128px" >';
export const Warehouse = () => '<img src="simple/process_business/warehouse.svg?sanitize=true" alt="Warehouse" height="128px" width="128px" >';
