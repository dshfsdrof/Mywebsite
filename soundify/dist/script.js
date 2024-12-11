new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
                {
          name: "PAYAL SONG ",
          artist: "YO YO HONEY SINGH | NORA FATEHI | PARADOX",
          cover: "https://iili.io/2VAwRl1.md.jpg",
          source: "https://audio.jukehost.co.uk/UPXGsybv2AWvN1QS9gK7NRJz3M11WygE",
          url: "https://youtu.be/a-PAcmi5Kas?si=7nvewhGHgTbE0zWd",
          favorited: false
        },
        {
          name: "52 Bars",
          artist: "Karan Aujla",
          cover: "https://iili.io/2VAy62S.md.jpg",
          source: "https://audio.jukehost.co.uk/7dc17ykTBngjoXYSnyhGOWMfRG8zwOWs",
          url: "https://youtu.be/4DfVxVeqk2o?si=BSn8Fw68bVU2RggV",
          favorited: false
        },
        {
          name: "Ishq Wala Love",
          artist: "Alia Bhatt, Sidharth Malhotra, Varun Dhawan",
          cover: "https://iili.io/2VRFkSR.md.jpg",
          source: "https://audio.jukehost.co.uk/SIQP9pVSvFRTIlB5frehIUXlNLX2QSNS",
          url: "https://youtu.be/N2cPyl83tkQ?si=skk2pFQshvJ1brty",
          favorited: true
        },

        {
          name: "Suno Na Sangemarmar",
          artist: "Jackky Bhagnani, Neha Sharma",
          cover: "https://iili.io/2VRneln.jpg",
          source: "https://audio.jukehost.co.uk/T5dRl9CNaBbS2UqEyryxhZnW1b6HDH1h",
          url: "https://youtube.com/watch?v=83pr5QLz6Bc",
          favorited: false
        },

        {
          name: "Dheere Dheere Se Meri Zindagi",
          artist: "Yo Yo Honey Singh",
          cover: "https://iili.io/2VRGlfe.jpg",
          source: "https://audio.jukehost.co.uk/ZjwC1oreiF2QfoVz53M3h4EksSJSbxeb",
          url: "https://youtu.be/nCD2hj6zJEc?si=lQiWlxW07baBu3mu",
          favorited: false
        },
        {
          name: "Hasti Rahe Tu",
          artist: "Paradox",
          cover: "https://iili.io/2VRYJTX.md.jpg",
          source: "https://audio.jukehost.co.uk/cPQEE0x1wQ9NYjmDmGbwPOFXIdXOxkUp",
          url: "https://youtu.be/UyoDdroSXXs?si=NlgxslmpT590hxqN",
          favorited: true
        },
        {
          name: "Jalebi Baby",
          cover: "https://iili.io/2VRN0HF.md.jpg",
          source: "https://audio.jukehost.co.uk/rSwca08Q4dggug0kjK2cfMtXVi2PMqv1",
          url: "https://youtu.be/IFtwhMK64H8?si=bbeDn8Jl2dg4R2P8",
          favorited: false
        },
        {
          name: "No Love",
          artist: "Shubh",
          cover: "https://iili.io/2VR4sCF.md.jpg",
          source: "https://audio.jukehost.co.uk/oAwMBKqmcvTUTpSBjNaPTQMxM2Y7zxHY",
          url: "https://youtu.be/6RrEQJNZwPQ?si=OoAC-QCFoWmTIalb",
          favorited: true
        },
        {
          name: "One Love",
          artist: "Shubh",
          cover: "https://iili.io/2VRbnus.jpg",
          source: "https://audio.jukehost.co.uk/U38SCJS1G7Ah3rSDdDcf3ol5U6alCxLs",
          url: "https://www.youtube.com/watch?v=MBdVXkSdhwU&ab_channel=HYBELABELS",
          favorited: false
        },
        {
          name: "Jaam par Jaam peene se Kya fayda",
          artist: "Nusrat Fateh Ali Khan Sahab",
          cover: "https://iili.io/2V5KbSf.jpg",
          source: "https://audio.jukehost.co.uk/JftD5DQF4tEYONGiUrE61IH3R4SoL2vc",
          url: "https://youtu.be/wiNm_hnj_9c?si=Ewf_4YB-gBqpmHhQ",
          favorited: false
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});