import { base, filename } from 'paths.macro';
import { generateStory } from './story_generator';


test('generate: example with a literal path (given)', () => {
    
    let groupTitle = "simple/process business"
    const galleryDir = "galleryTest/";
    let dir = galleryDir+groupTitle.replace(" ","_")+"/";
    let script = generateStory(dir)
    let expected = 
`import { base, filename } from 'paths.macro';

export default {
    title: "${groupTitle}"
};

export const cash_register = () => '<img src="galleryTest/simple/process_business/cash_register.svg" alt="cash register" >";
import markdowncash_register from '../galleryTest/simple/process_business/cash_register.md;
cash_register.story = {
  name: "cash_register",
  parameters: {
    notes: { markdowncash_register }
  }
};

export const r = () => '<img src="galleryTest/simple/process_business/r.jpg" alt="r" >";
`
    expect(script).toBe(expected);

});