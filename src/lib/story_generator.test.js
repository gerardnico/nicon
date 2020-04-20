
import { generateStoryScript, traverseGallery, getFiles } from './story_generator';


test('generate: example with a literal path (given)', () => {

  const galleryDir = "galleryTest\\"; // windows style
  let dir = galleryDir + "simple\\process_business"; // windows style

  let groupTitle = "simple/process business";
  let script = generateStoryScript(dir)
  let expected =
    `export default {
    title: "${groupTitle}"
};

export const story_cash_register_10x20 = () => '<img src="simple/process_business/cash-register-10x20.svg" alt="cash register 10x20" >';
import markdown_story_cash_register_10x20 from '../galleryTest/simple/process_business/cash-register-10x20.md';
story_cash_register_10x20.story = {
  name: "cash register 10x20",
  parameters: {
    notes: { markdown_story_cash_register_10x20 }
  }
};

export const story_r = () => '<img src="simple/process_business/r.jpg" alt="r" >';
`
  expect(script).toBe(expected);

});


test('getFiles', () => {
  let files = getFiles('./galleryTest');
  expect(files).toEqual([]);
  files = getFiles('./galleryTest/simple/process_business');
  expect(files.length).toBe(3);
});

