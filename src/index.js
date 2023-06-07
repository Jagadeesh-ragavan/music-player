import React from "react";
import ReactDOM from "react-dom/client";
import AudioPlayer from "./components/AudioPlayer";

import './styles/index.css';
import './styles/customize-progress-bar.css';

const el = document.getElementById('root');
const root = ReactDOM.createRoot(el);

root.render(<AudioPlayer />);