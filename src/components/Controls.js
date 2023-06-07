import { useState, useEffect, useRef, useCallback } from "react";
import { IoMdVolumeHigh, IoMdVolumeLow, IoMdVolumeOff} from "react-icons/io";

import {
    IoPlayBackSharp,
    IoPlayForwardSharp,
    IoPlaySkipBackSharp,
    IoPlaySkipForwardSharp,
    IoPlaySharp,
    IoPauseSharp,
  } from 'react-icons/io5';
import { tracks } from "../data/tracks";

const Controls = ({ audioRef,
     progressBarRef,
      duration, 
      setTimeProgress, 
      tracks, 
      trackIndex, 
      setTrackIndex, 
      setCurrentTrack }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const [volume, setVolume] = useState(60);
    const [muteVolume, setMuteVolume] = useState(false);

    const togglePlayPause = () => {
        setIsPlaying((prev) => !prev);
      };

    const playAnimationRef = useRef();

    const repeat = useCallback(() => {
        const currentTime = audioRef.current.currentTime;
        setTimeProgress(currentTime);
        progressBarRef.current.value = currentTime;
        progressBarRef.current.style.setProperty('--range-progress',
        `${(progressBarRef.current.value / duration) * 100}%`)

        playAnimationRef.current = requestAnimationFrame(repeat);
    },[audioRef, progressBarRef, duration, setTimeProgress]);

    useEffect(() => {
        if(isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
            playAnimationRef.current = requestAnimationFrame(repeat);
        }
    },[isPlaying, audioRef, repeat]);

    const handlePrevious = () => {
        if(trackIndex === 0) {
            let lastTrackIndex = tracks.length - 1;
            setTrackIndex(lastTrackIndex);
            setCurrentTrack(tracks[lastTrackIndex]);
        } else {
            setTrackIndex((prev) => prev - 1);
            setCurrentTrack(tracks[trackIndex - 1])
        }
    }

    const skipBackward = () => {
        audioRef.current.currentTime -= 15; 
    }

    const skipForward = () => {
        audioRef.current.currentTime += 15;
    }

    const handleNext = () => {
        if(trackIndex >= tracks.length - 1) {
            setTrackIndex(0);
            setCurrentTrack(tracks[0]);
        } else {
            setTrackIndex((prev) => prev + 1);
            setCurrentTrack(tracks[trackIndex + 1])
        }
    }

    useEffect(() => {
        if(audioRef) {
            audioRef.current.volume = volume / 100;
            audioRef.current.muted = muteVolume;
        }
    },[volume, audioRef])

    return (
        <div className="controls-wrapper">
            <div className="controls">
                <button onClick={handlePrevious}>
                    <IoPlaySkipBackSharp />
                </button>
                <button onClick={skipBackward}>
                    <IoPlayBackSharp />
                </button>

                <button onClick={togglePlayPause}>
                    {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
                </button>
                <button onClick={skipForward}>
                    <IoPlayForwardSharp />
                </button>
                <button onClick={handleNext}>
                    <IoPlaySkipForwardSharp />
                </button>
            </div>

            <div className="volume">
                <button onClick={() => setMuteVolume((prev) => !prev)}>
                    {muteVolume || volume < 5 ? (
                        <IoMdVolumeOff />) : volume < 40 ? 
                        (<IoMdVolumeLow />) : (<IoMdVolumeHigh />)
                    }
                </button>
                <input 
                type="range" 
                min={0} 
                max={100}
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                style={{ background : `linear-gradient(to right, #f50 ${volume}%, #ccc ${volume}%)`}} />
            </div>
        </div>
    )
}

export default Controls;