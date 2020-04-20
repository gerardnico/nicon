export default {
  title: 'computer process'
};

import gearMd from '../gallery/simple/process_computer/gear.md';
export const Gear = () => '<img src="simple/process_computer/gear.svg?sanitize=true" alt="Cash Register Icon" height="128px" width="128px" >';

Gear.story = {
  name: "Gear",
  parameters: {
    notes: { gearMd }
  }
};


export const Crash = () => '<img src="simple/process_computer/crash.jpg?" >';
Crash.story = {
  name: "Crash",
  parameters: {
    notes: 'A process that has crashed'
  }
};

