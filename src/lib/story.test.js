import { base, filename } from 'paths.macro';
import { toStoryHierarchy, generate } from './story';

test('toStoryHiearchy: Example of usage with the paths macro import', () => {
    // stories is added because this is the base
    expect(toStoryHierarchy("stories"+base, filename)).toBe('src/lib/story');
});

test('toStoryHiearchy: example with a literal path (given)', () => {
    // manual real path
    expect(toStoryHierarchy('stories/sales/', 'icons.stories.js')).toBe('sales/icons');
});

test('toStoryHiearchy: example with only a directory path', () => {
    // manual real path
    expect(toStoryHierarchy('stories/sales_process/')).toBe('sales process');
});

test('generate: example with a literal path (given)', () => {
    
    let groupTitle = "simple/process business"
    const galleryDir = "galleryTest/";
    let dir = galleryDir+groupTitle.replace(" ","_")+"/";
    let script = generate(dir)
    let expected = 
`import { base, filename } from 'paths.macro';

export default {
    title: "${groupTitle}"
};

export const cash_register = () => '<img src="galleryTest/simple/process_business/cash_register.svg" alt="cash register" >";
export const r = () => '<img src="galleryTest/simple/process_business/r.jpg" alt="r" >";
`
    expect(script).toBe(expected);

});