import React, { useState, useEffect } from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
import axios from 'axios';

const Mp3Recorder = new MicRecorder({ bitRate: 128});
const SongFinder: React.FC = () => {

  const [isRecording, setIsRecording] = useState(false);
  const [blobURL, setBlobURL] = useState('');
  const [isBlocked, setIsBlocked] = useState(false);

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
  });

  const start = () => {
    if (isBlocked) {
      // console.log('Permission Denied');
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
        const blobURL = URL.createObjectURL(blob);

        const wavfromblob = new File([blob], 'incomingaudioclip.wav');
        // console.log(wavfromblob);
        setBlobURL(blobURL);
        setIsRecording(false);
        sendAudioFile(wavfromblob)
      })
      .catch((e) => console.log(e));
  };


  const sendAudioFile = (file) => {
    // console.log(blobURL);
    const formData = new FormData();
    formData.append('audio-file', file);

    const config = { responseType: 'blob' };
    axios.get(blobURL, config).then(response => {
      let audioFile = new File([response.data], 'audiofile');
      // console.log(audioFile);
      return axios.post('/songs', {
        'blob': audioFile,
      },
      {
        headers: {'Content-Type': audioFile.type}
      })
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    });
    // return axios.get('/songs', {
    //   params: {
    //     formData: formData

    //   }
    // })
    //   .then((data) => console.log(data))
    //   .catch((error) => console.error(error));
  };





  return (
    <div>
      <div>Hello SongFinder</div>
      <button onClick={start} disabled={isRecording}>RECORD</button>
      <button onClick={stop} disabled={!isRecording}>STOP</button>
      <audio src={blobURL} controls="controls"/>
      {/* <button onClick={() => sendAudioFile(blobURL)}>SEND TO API</button> */}
    </div>
  );
};

export default SongFinder;
