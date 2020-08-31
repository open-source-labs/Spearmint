module.exports = {
  verbose: true,
  require: jest.fn(),
  match: jest.fn(),
  app: jest.fn(),
  remote: {
    app: {
      getPath: jest.fn(),
    },
  },
  dialog: jest.fn(),
};
