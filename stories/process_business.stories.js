export default {
    title: "simple/process business"
};

export const story_cash_register = () => '<img src="simple/process_business/cash_register.svg" alt="cash register" >';
import markdown_story_cash_register from '../gallery/simple/process_business/cash_register.md';
story_cash_register.story = {
        "name": "cash register",
        "parameters": {
            "notes": { markdown_story_cash_register }
        }
    };

export const story_scale = () => '<img src="simple/process_business/scale.svg" alt="scale" >';
import markdown_story_scale from '../gallery/simple/process_business/scale.md';
story_scale.story = {
        "name": "scale",
        "parameters": {
            "notes": { markdown_story_scale }
        }
    };

export const story_trolley = () => '<img src="simple/process_business/trolley.svg" alt="trolley" >';
story_trolley.story = {
        "name": "trolley"
};

export const story_warehouse = () => '<img src="simple/process_business/warehouse.svg" alt="warehouse" >';
story_warehouse.story = {
        "name": "warehouse"
};

