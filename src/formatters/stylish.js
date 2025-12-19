import _ from 'lodash';

const indent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return String(value);
  }
  const lines = Object.entries(value).map(
    ([key, val]) => `${indent(depth + 1)}  ${key}: ${stringify(val, depth + 1)}`,
  );
  return `{\n${lines.join('\n')}\n${indent(depth)}  }`;
};

const stylish = (diff) => {
  const iter = (tree, depth) => {
    const lines = tree.map((node) => {
      const { key, type, value, value1, value2, children } = node;
      switch (type) {
        case 'added':
          return `${indent(depth)}+ ${key}: ${stringify(value, depth)}`;
        case 'deleted':
          return `${indent(depth)}- ${key}: ${stringify(value, depth)}`;
        case 'changed':
          return [
            `${indent(depth)}- ${key}: ${stringify(value1, depth)}`,
            `${indent(depth)}+ ${key}: ${stringify(value2, depth)}`,
          ].join('\n');
        case 'unchanged':
          return `${indent(depth)}  ${key}: ${stringify(value, depth)}`;
        case 'nested':
          return `${indent(depth)}  ${key}: {\n${iter(children, depth + 1).join('\n')}\n${indent(depth)}  }`;
        default:
          throw new Error(`Unknown type: ${type}`);
      }
    });
    return lines;
  };
  return `{\n${iter(diff, 1).join('\n')}\n}`;
};

export default stylish;
