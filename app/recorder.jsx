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
      this.setState({ localTrack: track, display: "waiting" })
      this.videoContainer.current.appendChild(track.attach());
    }, error => {
      this.setState({ display: "noconnect" })
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
    var {display} = this.state;
 
    if(display == "waiting") {
      return <div className='recorder__buttons'>
        <button className='recorder__record' onClick={this.clickRecord} >Record</button>
          <div className='recorder__message'>
          a five second selfie video
        </div>
      </div>
    } else if(display == "connecting") {
      return <div className='recorder__buttons'>
          <button className='recorder__connecting'>Connecting</button>
      </div>
    } else if(display == "recording") {
      return <div className='recorder__recording'></div>
    } else if(display == "uploading") {
      return <div className='recorder__uploading'>
          <img className='recorder__animation' src="/assets/selfie1.svg"/>
          Uploading...</div>
    } else if(display == "noconnect") {
      return <div className='recorder__noconnect'>
        Can't connect to the camera. 
        Make sure you are using Safari on iOS or Chrome on Android.
      </div>
    }
  }

  render() {
    return <div className='recorder'>
      <div className='recorder__header'>Selfie</div>
      <div className='recorder__preview' ref={this.videoContainer}></div>
      {this.recordButton()}
    </div>
  }
}

export default Recorder;
