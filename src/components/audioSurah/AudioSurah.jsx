import React, { Component } from "react";
import { connect } from "react-redux";

import "react-h5-audio-player/lib/styles.css";
import "./AudioSurah.scss";
import Skeleton from "@material-ui/lab/Skeleton";
import { Hidden } from "@material-ui/core";
import AudioSurahMobile from "../audioSurahMobile/AudioSurahMobile";
import AudioSurahDesktop from "../audioSurahDesktop/AudioSurahDesktop";
const mapStateToProps = (state) => {
  return {
    items: state.surah.items,
    error: state.surah.error,
    loading: state.surah.loading,
  };
};

class AudioSurah extends Component {
  constructor() {
    super();
    this.state = {
      currentSurahIndex: 0,
    };
  }

  handleClickPrevious = (playlist) => {
    this.setState((prevState) => ({
      currentSurahIndex:
        prevState.currentSurahIndex === 0
          ? playlist.length - 1
          : prevState.currentSurahIndex - 1,
    }));
  };

  handleClickNext = (playlist) => {
    this.setState((prevState) => ({
      currentSurahIndex:
        prevState.currentSurahIndex < playlist.length - 1
          ? prevState.currentSurahIndex + 1
          : 0,
    }));
  };

  handleEnded = (playlist) => {
    if (this.state.currentSurahIndex < playlist.length - 1) {
      this.setState((prevState) => ({
        currentSurahIndex:
          prevState.currentSurahIndex < playlist.length - 1
            ? prevState.currentSurahIndex + 1
            : 0,
      }));
    }
  };

  render() {
    const { items, loading, error } = this.props;
    const { currentSurahIndex } = this.state;
    if (error) return <h1>oops something went wrong</h1>;
    if (loading) return <Skeleton />;
    const surah = items[0];
    const playlist = surah.ayahs;

    return (
      <div id="audio-player">
        {/* Tablet and Laptop Size */}
        <AudioSurahDesktop
          handleClickPrevious={this.handleClickPrevious}
          handleClickNext={this.handleClickNext}
          handleEnded={this.handleEnded}
          surah={surah}
          playlist={playlist}
          currentSurahIndex={currentSurahIndex}
        />
        {/* Mobile Size */}
        <AudioSurahMobile
          handleClickPrevious={this.handleClickPrevious}
          handleClickNext={this.handleClickNext}
          handleEnded={this.handleEnded}
          surah={surah}
          playlist={playlist}
          currentSurahIndex={currentSurahIndex}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(AudioSurah);
