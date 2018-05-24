var React = require('react');

import {Entity, Scene} from 'aframe-react';

class SelfieView extends React.Component {

  constructor(props) {
    super(props);
    console.log('Selve');
  }

  render() {
    return (
      <Scene embedded vr-mode-ui={{enabled: false}} >
        <a-assets>
          <video muted crossOrigin="true" autoPlay loop playsInline id="video1" src="https://s3.amazonaws.com/pioneerr/video1.mp4"></video>
          <video muted crossOrigin="true" autoPlay loop playsInline id="video2" src="https://s3.amazonaws.com/pioneerr/video2-2.mp4"></video>
          <video muted crossOrigin="true" autoPlay loop playsInline id="video3" src="https://s3.amazonaws.com/pioneerr/video3-2.mp4"></video>  
          <video muted crossOrigin="true" autoPlay loop playsInline id="video4" src="https://s3.amazonaws.com/pioneerr/video4-2.mp4"></video>
        </a-assets>
    
        <a-marker type="pattern" url='/assets/pattern-marker1.patt'>
          <a-video src="#video1" rotation="-90 0 0" position="0 0 0"></a-video>     
        </a-marker>
      
        <a-marker type="pattern" url='/assets/pattern-marker2.patt'>
          <a-video src="#video2" rotation="-90 0 0" position="0 0 0"></a-video>     
        </a-marker>

        <a-marker type="pattern" url='/assets/pattern-marker3.patt'>
          <a-video src="#video3" rotation="-90 0 0" position="0 0 0"></a-video>     
        </a-marker>

        <a-marker type="pattern" url='/assets/pattern-marker4.patt'>
          <a-video  src="#video4" rotation="-90 0 0" position="0 0 0"></a-video>     
        </a-marker>
      
        <a-entity camera></a-entity>
      </Scene>
    );
  }
}

export default SelfieView;
