import React from 'react';

const connect = (Component, stores, getStateFromStores) => {
  return class Connect extends React.Component {
    constructor(props) {
      super(props);

      this.storeChanged = this.storeChanged.bind(this);
      this.state = getStateFromStores(this.props);

      stores.forEach(store => store.listen(this.storeChanged));
    }
    componentWillUnmount() {
      stores.forEach(store => store.unlisten(this.storeChanged));
    }
    storeChanged() {
      this.setState(getStateFromStores(this.stores));
    }
    render() {
      return <Component {...this.props} {...this.state} />;
    }
  };
};

export default connect;
