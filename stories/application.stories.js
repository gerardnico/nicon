export default {
    title: "simple/application"
};

export const story_database = () => '<img src="simple/application/database.svg" alt="database" >';

export const story_excel = () => '<img src="simple/application/excel.svg" alt="excel" >';
import markdown_story_excel from '../gallery/simple/application/excel.md';
story_excel.story = {
  name: "excel",
  parameters: {
    notes: { markdown_story_excel }
  }
};

export const story_hadoop = () => '<img src="simple/application/hadoop.jpg" alt="hadoop" >';

export const story_hive = () => '<img src="simple/application/hive.jpg" alt="hive" >';

export const story_linux = () => '<img src="simple/application/linux.jpg" alt="linux" >';

export const story_spark = () => '<img src="simple/application/spark.jpg" alt="spark" >';
