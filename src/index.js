import fs from 'fs';
import path from 'path';
import process from 'process';
import parse from './parsers.js';
import buildDiff from './buildDiff.js';
import formatDiff from './formatters/index.js';

const getData = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  return fs.readFileSync(fullPath, 'utf-8');
};

const getExtension = (filepath) => path.extname(filepath).slice(1);

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  
  const ext1 = getExtension(filepath1);
  const ext2 = getExtension(filepath2);
  
  const obj1 = parse(data1, ext1);
  const obj2 = parse(data2, ext2);
  
  const diff = buildDiff(obj1, obj2);
  return formatDiff(diff, format);
};

export default genDiff;
