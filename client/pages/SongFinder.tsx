import React, { useState, useEffect } from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
import axios from 'axios';

const Mp3Recorder = new MicRecorder({ bitRate: 128});
const SongFinder: React.FC = () => {

  const [isRecording, setIsRecording] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [previewSource, setPreviewSource] = useState();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({audio: true}, 
      () => {
        // console.log('Permission Granted');
        setIsBlocked(true);
      },
      () => {
        // console.log("Permission Denied");
        setIsBlocked(false);
      });


    if (previewSource && isRecording === false) {
      axios.post('/songs', {
        data: previewSource,
      })
        .then((data) => console.log('SUCCESS', data))
        .catch((err) => console.error(err));
    }

  });

  const start = () => {
    if (isBlocked) {
      console.log('Permission Denied');
    } else {
      Mp3Recorder.start()
        .then(() => {
          setIsRecording(true);
        })
        .catch((e) => console.error(e));
    }
  };

  const stop = () => {
    Mp3Recorder.stop().getMp3()
      .then(([buffer, blob]) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = async () => {
          setPreviewSource(reader.result);
        };
        setIsRecording(false);
      })
      .catch((e) => console.log(e));
  };






  return (
    <div>
      <div>Hello SongFinder</div>
      <button onClick={start} disabled={isRecording}>RECORD</button>
      <button onClick={stop} disabled={!isRecording}>STOP</button>
      <audio src={previewSource} controls="controls"/>
    </div>
  );
};

export default SongFinder;
