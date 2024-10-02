<template>
    <section class="doctor-video-feature">
      <div class="video-container">
        <video
          ref="videoPlayer"
          :src="currentVideo.src"
          :poster="currentVideo.poster"
          @ended="onVideoEnded"
          @timeupdate="onTimeUpdate"
          autoplay
          muted
          loop
          playsinline
        ></video>
        <div class="video-controls">
          <div class="progress-bar" @click="seek">
            <div class="progress" :style="{ width: `${progress}%` }"></div>
          </div>
          <div class="controls-wrapper">
            <button @click="togglePlay" class="control-button">
              <span class="material-icons">{{ isPlaying ? 'pause' : 'play_arrow' }}</span>
            </button>
            <button @click="toggleMute" class="control-button">
              <span class="material-icons">{{ isMuted ? 'volume_off' : 'volume_up' }}</span>
            </button>
            <div class="time-display">{{ currentTime }} / {{ duration }}</div>
            <button @click="toggleFullscreen" class="control-button">
              <span class="material-icons">fullscreen</span>
            </button>
          </div>
        </div>
      </div>
      <div class="video-info">
        <h2 class="video-title">{{ currentVideo.title }}</h2>
        <p class="doctor-name">{{ currentVideo.doctorName }}</p>
        <p class="video-description">{{ currentVideo.description }}</p>
      </div>
      <div class="video-navigation">
        <button @click="prevVideo" class="nav-button" :disabled="currentIndex === 0">
          <span class="material-icons">chevron_left</span>
        </button>
        <button @click="nextVideo" class="nav-button" :disabled="currentIndex === videos.length - 1">
          <span class="material-icons">chevron_right</span>
        </button>
      </div>
    </section>
  </template>
  
  <script>
  import { ref, onMounted, watch, computed } from 'vue';
  import featureVideo1 from '@/assets/videos/feature-video-1.mp4';
  import featureVideo2 from '@/assets/videos/feature-video-2.mp4';
  import featureVideo3 from '@/assets/videos/feature-video-3.mp4';
  
  export default {
    name: 'VideoFeature',
    setup() {
      const videoPlayer = ref(null);
      const isPlaying = ref(false);
      const isMuted = ref(true);
      const currentIndex = ref(0);
      const isLoading = ref(false);
      const progress = ref(0);
      const currentTime = ref('0:00');
      const duration = ref('0:00');
  
      const videos = [
        {
          src: featureVideo1,
          poster: '/images/doctor-interview-1-poster.jpg',
          title: 'PHARMAZINC Alkaline Vitamin C: How It Can Help Individuals on Maintenance Drugs',
          doctorName: 'Dr. Sunshine Quiroz, M.D.',
          description: 'In this video, Dr. Quiroz discusses the benefits of PHARMAZINC Alkaline Vitamin C for individuals on maintenance medications. She highlights how its gentle, antioxidant-rich formula reduces oxidative stress, supports immune function, and enhances nutrient absorption, making it a valuable complement to long-term drug use. Discover how PHARMAZINC can boost your health and vitality.'
        },
        {
          src: featureVideo2,
          poster: '/images/doctor-interview-2-poster.jpg',
          title: 'PHARMAZINC Alkaline Vitamin C: How It Can Help Diabetes',
          doctorName: 'Dr. Sunshine Quiroz, M.D.',
          description: 'In this video, Dr. Quiroz explains how PHARMAZINC Alkaline Vitamin C can benefit individuals with diabetes. She discusses its role in supporting healthy blood sugar levels, improving insulin sensitivity, and reducing oxidative stress—a common concern for diabetics. Discover how PHARMAZINC can support diabetes management and promote overall well-being.'
        },
        {
          src: featureVideo3,
          poster: '/images/doctor-interview-3-poster.jpg',
          title: 'PHARMAZINC Alkaline Vitamin C: A Solution for High Blood Pressure',
          doctorName: 'Dr. Sunshine Quiroz, M.D.',
          description: 'In this video, Dr. Quiroz explores the effects of PHARMAZINC Alkaline Vitamin C on high blood pressure. She discusses how this supplement may help regulate blood pressure levels, improve vascular health, and reduce inflammation. Learn how incorporating PHARMAZINC into your routine can contribute to better heart health and overall well-being.'
        }
      ];
  
      const currentVideo = computed(() => videos[currentIndex.value]);
  
      const togglePlay = () => {
        if (videoPlayer.value.paused) {
          videoPlayer.value.play().catch(error => {
            console.error('Error playing video:', error);
          });
        } else {
          videoPlayer.value.pause();
        }
      };
  
      const toggleMute = () => {
        videoPlayer.value.muted = !videoPlayer.value.muted;
        isMuted.value = videoPlayer.value.muted;
      };
  
      const nextVideo = () => {
        if (currentIndex.value < videos.length - 1) {
          currentIndex.value++;
        }
      };
  
      const prevVideo = () => {
        if (currentIndex.value > 0) {
          currentIndex.value--;
        }
      };
  
      const onVideoEnded = () => {
        if (currentIndex.value < videos.length - 1) {
          nextVideo();
        } else {
          currentIndex.value = 0; // Loop back to the first video
        }
      };
  
      const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
      };
  
      const onTimeUpdate = () => {
        const video = videoPlayer.value;
        progress.value = (video.currentTime / video.duration) * 100;
        currentTime.value = formatTime(video.currentTime);
        duration.value = formatTime(video.duration);
      };
  
      const seek = (event) => {
        const video = videoPlayer.value;
        const rect = event.target.getBoundingClientRect();
        const pos = (event.clientX - rect.left) / rect.width;
        video.currentTime = pos * video.duration;
      };
  
      const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
          videoPlayer.value.requestFullscreen().catch(err => {
            console.error(`Error attempting to enable full-screen mode: ${err.message}`);
          });
        } else {
          document.exitFullscreen();
        }
      };
  
      watch(currentIndex, (newIndex) => {
        isLoading.value = true;
        if (videoPlayer.value) {
          videoPlayer.value.load();
          isPlaying.value = false;
        }
      });
  
      onMounted(() => {
        if (videoPlayer.value) {
          videoPlayer.value.addEventListener('play', () => { isPlaying.value = true; });
          videoPlayer.value.addEventListener('pause', () => { isPlaying.value = false; });
          videoPlayer.value.addEventListener('loadeddata', () => { isLoading.value = false; });
          videoPlayer.value.addEventListener('error', (e) => {
            console.error('Video error:', e);
            isLoading.value = false;
          });
        }
      });
  
      return {
        videoPlayer,
        isPlaying,
        isMuted,
        isLoading,
        currentIndex,
        currentVideo,
        videos,
        togglePlay,
        toggleMute,
        nextVideo,
        prevVideo,
        onVideoEnded,
        progress,
        currentTime,
        duration,
        onTimeUpdate,
        seek,
        toggleFullscreen
      };
    }
  };
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
  
  .doctor-video-feature {
    background-color: #f5f5f5;
    padding: 3rem 2rem;
    font-family: 'Poppins', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
  
  .video-container {
    width: 100%;
    max-width: 800px;
    position: relative;
  }
  
  video {
    width: 100%;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .video-controls {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  
  .progress-bar {
    width: 100%;
    height: 5px;
    background-color: rgba(255, 255, 255, 0.3);
    cursor: pointer;
    margin-bottom: 10px;
  }
  
  .progress {
    height: 100%;
    background-color: #ffa500;
  }
  
  .controls-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .control-button {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    transition: color 0.3s ease;
  }
  
  .control-button:hover {
    color: #ffa500;
  }
  
  .time-display {
    color: white;
    font-size: 0.9rem;
  }
  
  .video-info {
    width: 100%;
    max-width: 800px;
  }
  
  .video-title {
    font-size: 1.8rem;
    color: #4a0e4e;
    margin-bottom: 0.5rem;
  }
  
  .doctor-name {
    font-size: 1.2rem;
    color: #ffa500;
    margin-bottom: 1rem;
  }
  
  .video-description {
    font-size: 1rem;
    color: #333;
    line-height: 1.6;
  }
  
  .video-navigation {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 800px;
  }
  
  .nav-button {
    background-color: #4a0e4e;
    color: white;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .nav-button:hover {
    background-color: #ffa500;
  }
  
  .nav-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    .doctor-video-feature {
      padding: 2rem 1rem;
    }
  
    .video-container, .video-info, .video-navigation {
      max-width: 100%;
    }
  }
  </style>