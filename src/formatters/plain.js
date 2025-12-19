import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : String(value);
};

const plain = (diff) => {
  const iter = (tree, path) => {
    const lines = tree
      .filter(({ type }) => type !== 'unchanged')
      .map((node) => {
        const { key, type, value, value1, value2, children } = node;
        const currentPath = path ? `${path}.${key}` : key;
        switch (type) {
          case 'added':
            return `Property '${currentPath}' was added with value: ${stringify(value)}`;
          case 'deleted':
            return `Property '${currentPath}' was removed`;
          case 'changed':
            return `Property '${currentPath}' was updated. From ${stringify(value1)} to ${stringify(value2)}`;
          case 'nested':
            return iter(children, currentPath);
          default:
            throw new Error(`Unknown type: ${type}`);
        }
      });
    return lines.join('\n');
  };
  return iter(diff, '');
};

export default plain;
