type Environment = {
  NODE_ENV: `production` | `development` | `staging`;
  SERVER_API: string;
};

const env = (() => {
  const reactPrefix = 'REACT_APP_';
  return Object.entries(process.env)
    .map(([k, v]) => ({ [k.replace(reactPrefix, '')]: v }))
    .reduce((acc, item) => ({ ...acc, ...item }), {}) as Environment;
})();

console.log('ENV:', env);

export default env;
