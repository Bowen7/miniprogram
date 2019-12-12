const componentHooksHash = {
  created: 'created',
  attached: 'beforeMount',
  ready: 'mounted',
  detached: 'destroyed'
};
const Component = comOptions => {
  const options = {};
  for (let key in comOptions) {
    const item = comOptions[key];
    switch (key) {
      case 'data':
      case 'methods':
      case 'components':
        options[key] = item;
        break;
      case 'properties':
        for (let propKey in item) {
          if ({}.toString.call(item[propKey]) === '[object Object]') {
            if (item[propKey].value) {
              item[propKey].default = item[propKey].value;
              delete item[propKey].value;
            }
          }
        }
        options.props = item;
        break;

      default:
        if (componentHooksHash[key]) {
          options[componentHooksHash[key]] = item;
        }
        break;
    }
  }
  return options;
};
export default Component;
