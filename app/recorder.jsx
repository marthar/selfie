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
      return <div className='recorder__buttons'  onClick={this.clickRecord}>
        <button className='recorder__record' >Record</button>
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
        {this.renderSVG()}
        <div>Uploading...</div></div>
    } else if(display == "noconnect") {
      return <div className='recorder__noconnect'>
        Oops, is your phone up to date?
        Selfie only works with Safari on iOS 11 or Chrome on Android.
      </div>
    }
  }

  renderSVG() {
    return <svg version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 360 360" >
      <g>
        <rect x="68.4" y="68.4" className="st0" width="223.2" height="223.2"/>
        </g>    

        <g className="selfie1">
          <rect x="68.4" y="68.4" className="st0" width="223.2" height="223.2"/>
          <g>
            <rect x="191.1" y="206.8" className="st1" width="13.2" height="13.2"/>
            <rect x="177.9" y="219.9" className="st1" width="13.2" height="13.2"/>
            <rect x="164.7" y="206.8" className="st1" width="13.2" height="13.2"/>
            <rect x="191.1" y="219.9" className="st1" width="13.2" height="13.2"/>
            <rect x="177.9" y="206.8" className="st1" width="13.2" height="13.2"/>
            <rect x="206.5" y="126.9" className="st1" width="13.2" height="13.2"/>
            <rect x="127.1" y="127.6" className="st1" width="13.2" height="13.2"/>
            <rect x="206.5" y="140.1" className="st1" width="13.2" height="13.2"/>
            <rect x="219.7" y="140.1" className="st1" width="13.2" height="13.2"/>
            <rect x="179.9" y="180.4" className="st1" width="13.2" height="13.2"/>
            <rect x="127.1" y="140.8" className="st1" width="13.2" height="13.2"/>
            <rect x="140.3" y="140.8" className="st1" width="13.2" height="13.2"/>
            <rect x="166.7" y="167.1" className="st1" width="13.2" height="13.2"/>
          </g>
          </g>
          <g className="selfie2">
            <rect x="68.4" y="68.4" className="st2" width="223.2" height="223.2"/>
            <g>
              <rect x="207" y="153" className="st1" width="13.5" height="13.5"/>
              <rect x="193.5" y="139.5" className="st1" width="13.5" height="13.5"/>
              <rect x="193.5" y="220.5" className="st1" width="13.5" height="13.5"/>
              <rect x="153" y="220.5" className="st1" width="13.5" height="13.5"/>
              <rect x="166.5" y="193.5" className="st1" width="13.5" height="13.5"/>
              <rect x="180" y="193.5" className="st1" width="13.5" height="13.5"/>
              <rect x="166.5" y="220.5" className="st1" width="13.5" height="13.5"/>
              <rect x="207" y="139.5" className="st1" width="13.5" height="13.5"/>
              <rect x="207" y="220.5" className="st1" width="13.5" height="13.5"/>
              <rect x="220.5" y="139.5" className="st1" width="13.5" height="13.5"/>
              <rect x="166.5" y="180" className="st1" width="13.5" height="13.5"/>
              <rect x="180" y="180" className="st1" width="13.5" height="13.5"/>
              <rect x="139.5" y="139.5" className="st1" width="13.5" height="13.5"/>
              <rect x="139.5" y="153" className="st1" width="13.5" height="13.5"/>
              <rect x="126" y="139.5" className="st1" width="13.5" height="13.5"/>
              <rect x="153" y="139.5" className="st1" width="13.5" height="13.5"/>
              <rect x="139.5" y="126" className="st1" width="13.5" height="13.5"/>
              <rect x="126" y="126" className="st1" width="13.5" height="13.5"/>
              <rect x="153" y="126" className="st1" width="13.5" height="13.5"/>
              <rect x="166.5" y="166.5" className="st1" width="13.5" height="13.5"/>
              <rect x="180" y="220.5" className="st1" width="13.5" height="13.5"/>
              <rect x="220.5" y="207" className="st1" width="13.5" height="13.5"/>
              <rect x="220.5" y="220.5" className="st1" width="13.5" height="13.5"/>
              <rect x="193.5" y="126" className="st1" width="13.5" height="13.5"/>
              <rect x="207" y="126" className="st1" width="13.5" height="13.5"/>
              <rect x="220.5" y="126" className="st1" width="13.5" height="13.5"/>
            </g>
            </g>
            <g className="selfie3">
              <rect x="68.4" y="68.4" className="st2" width="223.2" height="223.2"/>
              <g>
                <rect x="190.4" y="147.4" className="st1" width="13.6" height="13.6"/>
                <rect x="122.4" y="201.8" className="st1" width="13.6" height="13.6"/>
                <rect x="217.5" y="188.2" className="st1" width="13.6" height="13.6"/>
                <rect x="149.6" y="215.4" className="st1" width="13.6" height="13.6"/>
                <rect x="136" y="215.4" className="st1" width="13.6" height="13.6"/>
                <rect x="163.2" y="215.4" className="st1" width="13.6" height="13.6"/>
                <rect x="203.9" y="201.8" className="st1" width="13.6" height="13.6"/>
                <rect x="203.9" y="215.4" className="st1" width="13.6" height="13.6"/>
                <rect x="217.5" y="201.8" className="st1" width="13.6" height="13.6"/>
                <rect x="217.5" y="147.4" className="st1" width="13.6" height="13.6"/>
                <rect x="203.9" y="147.4" className="st1" width="13.6" height="13.6"/>
                <rect x="133.8" y="147.4" className="st1" width="13.6" height="13.6"/>
                <rect x="136" y="201.8" className="st1" width="13.6" height="13.6"/>
                <rect x="176.8" y="215.4" className="st1" width="13.6" height="13.6"/>
                <rect x="190.4" y="215.4" className="st1" width="13.6" height="13.6"/>
                <rect x="133.8" y="133.8" className="st1" width="13.6" height="13.6"/>
                <rect x="147.4" y="133.8" className="st1" width="13.6" height="13.6"/>
                <rect x="147.4" y="147.4" className="st1" width="13.6" height="13.6"/>
                <rect x="122.4" y="188.2" className="st1" width="13.6" height="13.6"/>
              </g>
              </g>
              <g className="selfie4">
                <rect x="68.4" y="68.4" className="st2" width="223.2" height="223.2"/>
                <g>
                  <rect x="193.6" y="139.2" className="st1" width="13.6" height="13.6"/>
                  <rect x="193.6" y="125.6" className="st1" width="13.6" height="13.6"/>
                  <rect x="139.2" y="125.6" className="st1" width="13.6" height="13.6"/>
                  <rect x="193.6" y="207.2" className="st1" width="13.6" height="13.6"/>
                  <rect x="180" y="220.8" className="st1" width="13.6" height="13.6"/>
                  <rect x="180" y="193.6" className="st1" width="13.6" height="13.6"/>
                  <rect x="166.4" y="220.8" className="st1" width="13.6" height="13.6"/>
                  <rect x="166.4" y="193.6" className="st1" width="13.6" height="13.6"/>
                  <rect x="152.8" y="193.6" className="st1" width="13.6" height="13.6"/>
                  <rect x="207.2" y="139.2" className="st1" width="13.6" height="13.6"/>
                  <rect x="207.2" y="125.6" className="st1" width="13.6" height="13.6"/>
                  <rect x="193.6" y="193.6" className="st1" width="13.6" height="13.6"/>
                  <rect x="193.6" y="220.8" className="st1" width="13.6" height="13.6"/>
                  <rect x="152.8" y="207.2" className="st1" width="13.6" height="13.6"/>
                  <rect x="139.2" y="139.2" className="st1" width="13.6" height="13.6"/>
                  <rect x="152.8" y="139.2" className="st1" width="13.6" height="13.6"/>
                  <rect x="152.8" y="125.6" className="st1" width="13.6" height="13.6"/>
                  <rect x="152.8" y="220.8" className="st1" width="13.6" height="13.6"/>
                  <rect x="180" y="166.4" className="st1" width="13.6" height="13.6"/>
                  <rect x="166.4" y="166.4" className="st1" width="13.6" height="13.6"/>
                </g>
                </g>
                </svg>
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
