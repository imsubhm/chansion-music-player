import React, { useState, useRef, useEffect } from "react";
import "./audioPlayer.css";
import Controls from "./controls";
import ProgressCircle from "./progressCircle";
import WaveAnimation from "./waveAnimation";

export default function AudioPLayer({
  currentTrack,
  currentIndex,
  setCurrentIndex,
  total,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [circleSize, setCircleSize] = useState(600);

  let audioSrc = total[currentIndex]?.track.preview_url;

  const audioRef = useRef(new Audio(total[0]?.track.preview_url));

  const intervalRef = useRef();

  const isReady = useRef(false);

  const { duration } = audioRef.current;

  const currentPercentage = duration ? (trackProgress / duration) * 100 : 0;

  const startTimer = () => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        handleNext();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  useEffect(() => {
    if (audioRef.current.src) {
      if (isPlaying) {
        audioRef.current.play();
        startTimer();
      } else {
        clearInterval(intervalRef.current);
        audioRef.current.pause();
      }
    } else {
      if (isPlaying) {
        audioRef.current = new Audio(audioSrc);
        audioRef.current.play();
        startTimer();
      } else {
        clearInterval(intervalRef.current);
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(audioSrc);

    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      isReady.current = true;
    }
  }, [currentIndex]);

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  const handleNext = () => {
    if (currentIndex < total.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else setCurrentIndex(0);
  };

  const handlePrev = () => {
    if (currentIndex - 1 < 0) setCurrentIndex(total.length - 1);
    else setCurrentIndex(currentIndex - 1);
  };

  const addZero = (n) => {
    return n > 9 ? "" + n : "0" + n;
  };
  const artists = [];
  currentTrack?.album?.artists.forEach((artist) => {
    artists.push(artist.name);
  });

  const getInitialSize = (width) => {
    if (width < 300) {
      return 150;
    } else if (width >= 300 && width < 420) {
      return 200;
    } else if (width >= 420 && width < 550) {
      return 250;
    } else if (width >= 550 && width < 680) {
      return 300;
    } else if (width >= 680 && width < 795) {
      return 400;
    } else if (width >= 795 && width < 953) {
      return 450;
    } else if (width >= 953 && width < 1295) {
      return 500;
    } else {
      return 600;
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);

      const newSize = getInitialSize(width);
      setCircleSize(newSize);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="player-body flex">
      <div className="player-top-body">
        <ProgressCircle
          percentage={currentPercentage}
          isPlaying={true}
          image={currentTrack?.album?.images[0]?.url}
          size={circleSize}
          color="#C96850"
        />
        <div className="player-down-body flex">
          <p className="song-title">{currentTrack?.name}</p>
          <p className="song-artist">{artists.join(" | ")}</p>
          <div className="player-right-bottom flex">
            <div className="song-duration flex">
              <p className="duration">0:{addZero(Math.round(trackProgress))}</p>
              <WaveAnimation isPlaying={isPlaying} />
              <p className="duration">0:30</p>
            </div>
            <Controls
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              handleNext={handleNext}
              handlePrev={handlePrev}
              total={total}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
