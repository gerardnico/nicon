import { base, filename } from 'paths.macro';
import { toStoryHierarchy } from './story';

test('Example of usage with the paths macro import', () => {
    // stories is added because this is the base
    expect(toStoryHierarchy("/stories"+base, filename)).toBe('src/lib/story');
});

test('path', () => {
    // manual real path
    expect(toStoryHierarchy('/stories/sales/','icons.stories.js')).toBe('sales/icons');
});