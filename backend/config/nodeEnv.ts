type NodeEnv = 'development' | 'test' | 'production';
const nodeEnv = ((): 'development' | 'test' | 'production' => {
  if (process.env.IS_OFFLINE) {
    return 'development';
  }
  if (process.env.NODE_ENV === 'test') {
    return 'test';
  }
  if (process.env.NODE_ENV === 'production') {
    return 'production';
  }
  return 'development';
})();

export { NodeEnv, nodeEnv };
