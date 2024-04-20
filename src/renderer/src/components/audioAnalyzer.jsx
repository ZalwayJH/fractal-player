function audioAnalyzer(song) {
  const audioctx = new AudioContext();
  const analyzer = audioctx.createAnalyser();
  const source = audioctx.createMediaStreamSource(song);
  source.connect(analyzer);
  analyzer.connect(distortion);
  distortion.connect(audioctx.destination);
  analyzer.fftSize = 2048;
  const bufferLength = analyzer.frequencyBinCount;
  const dataArray = Uint8Array(bufferLength);
  return analyzer.getByteTimeDomainData(dataArray);
}

export default audioAnalyzer;
