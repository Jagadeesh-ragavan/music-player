// audio files
import world from '../data/world.mp3'
import top from '../data/dbang-world.mp3';
import cinematic from '../data/cinematic.mp3';
import forest from '../data/forest-lullaby.mp3';

// audio thumbnails
import lexin from './lexin.jpeg';
import jackson from './jackson.jpeg';
import trinix from './trinix.jpeg';

export const tracks = [
  {
    title: 'Michael Jackson – We Are The World',
    src: world,
    author: 'Michael Jackson',
    thumbnail: jackson,
  },
  {
    title: 'D’banj -Top Of The World',
    src: top,
    author: 'Dbanj',
    thumbnail: trinix,
  },
  {
    title: 'Cinematic Time Lapse',
    src: cinematic,
    author: 'Lexin Music',
    thumbnail: lexin,
  },
  {
    title: 'Forest Lullaby',
    src: forest,
    author: 'Lesfm',
  },
];