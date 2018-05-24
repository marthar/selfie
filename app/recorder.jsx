var $ = require('jquery');
var React = require('react');

const { createLocalVideoTrack, connect } = require('twilio-video');

class Recorder extends React.Component {

  constructor(props) {
    super(props);
    this.state = { display: "loading" };

    this.videoContainer = React.createRef();
  }

  componentDidMount() {
    createLocalVideoTrack().then(track => {
      console.log("Mounted");
      this.setState({ localTrack: track, display: "waiting" })
      this.videoContainer.current.appendChild(track.attach());
    });
  }

  clickRecord = () => {
    this.setState({ display: "connecting" });
    connect(this.props.token, {
      name:'tester',
      tracks: [ this.state.localTrack ]
      }).then((room) => {
        this.setState({ room: room, display: "recording" });
        setTimeout(this.stopRecording,5500);
      }, function(error) {
        console.error('Unable to connect to Room: ' +  error.message);
      });
  }

  stopRecording = () => {
    this.state.room.disconnect();
    this.setState({ display: "uploading" });
    setTimeout(() => {
    $.post('/selfie', { sid: this.state.room.sid },function() {
      document.location = '/show'
    });
    },1000);
  }

  recordButton = () => {
    if(this.state.display == "waiting") {
      return <button className='recorder__record' onClick={this.clickRecord} >Go</button>
    } else if(this.state.display == "connecting") {
      return <button className='recorder__connecting'>Connecting..</button>
    } else if(this.state.display == "recording") {
      return <div className='recorder__recording'></div>
    } else if(this.state.display == "uploading") {
      return <div className='recorder__uploading'>Uploading...</div>
    }
  }

  render() {
    return <div className='recorder'>
      <div className='recorder__header'>Selfie</div>
      <div className='recorder__preview' ref={this.videoContainer}></div>
      <div className='recorder__buttons'>
        {this.recordButton()}
      </div>
      <div className='recorder__message'>
        Press GO to record a 5 second moving selfie.
      </div>
    </div>
  }
}

export default Recorder;
