var React = require('react');


import Recorder from './recorder.jsx'

class SelfieApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      display:  props.display || 'record'
    }
  }

  render() {
    const { display } = this.state;
    const { token } = this.props;
    return <Recorder token={token} />
  }

}


export default SelfieApp

