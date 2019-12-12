const pageHooksHash = {
  onLoad: 'created',
  onReady: 'mounted',
  onUnload: 'destroyed'
};
const Page = pageOptions => {
  const options = {};
  for (let key in pageOptions) {
    const item = pageOptions[key];
    switch (key) {
      case 'data':
      case 'components':
        options[key] = item;
        break;

      default:
        if (pageHooksHash[key]) {
          options[pageHooksHash[key]] = item;
        } else if (typeof item === 'function') {
          !options.methods
            ? (options.methods = { [key]: item })
            : (options.methods[key] = item);
        }
        break;
    }
  }
  return options;
};

export default Page;
