import React from 'react'
import Svg, { Circle, G, Path, Rect } from 'react-native-svg'

interface Props {
  size: number
  fill?: string
  disabled?: boolean
}

const Logo: React.FC<Props> = ({ size }: Props) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 299.32 263.32">
      <G>
        <G fill="#fff">
          <Path d="M250.25 160.45q-.42-4.59-.82-9-.93-4.48-1.8-8.74c-.45-2.87-1.65-5.41-2.4-8a45 45 0 00-2.83-7.32l-3.09-6.65-3.54-5.84c-2.08-3.84-4.88-6.79-7-9.71a88.13 88.13 0 00-11.72-11.79l-4.52-3.77 4.26 4.05a88 88 0 0110.85 12.43c1.88 3 4.42 6 6.21 10l3.07 5.88 2.58 6.65a43.34 43.34 0 012.26 7.21c.55 2.53 1.56 5.06 1.79 7.76l1.17 8.2q.12 4.4.24 9a90.62 90.62 0 01-8.32 36.91 92.31 92.31 0 01-26 32.54 88.38 88.38 0 01-40.09 17.24c-14.74 2-30.33.83-44.08-4.84-7-2.47-13.35-6.48-19.39-10.6a88.29 88.29 0 01-15.65-15.16 83.66 83.66 0 01-17-37.67l-.52-4.63a32.28 32.28 0 01-.43-4.92l-.1-5.62v-1.92.45l.06-.61.22-2.41.41-4.76c.2-1.56.58-3.1.85-4.63a59 59 0 012.25-8.91 78 78 0 0116.59-29.15A76.62 76.62 0 01115.92 95c7.45-3.65 14.26-6.17 20.12-7.1a52 52 0 017.24-1.11c1.07-.1 1.82-.2 2.92-.34 7.57-.92 17.74 4.48 27.44 6a5.12 5.12 0 0110.19-.32 16.43 16.43 0 002.69-1c13.17-6.42 17.7-8.63 24-9.52s8.52-6.86 8.52-12.61-2.21-11.73-8.52-12.61-10.84-3.1-24-9.52a20.4 20.4 0 00-2.64-1 5.16 5.16 0 01-10.29-.34c-8 1.65-16 6.71-25.88 7.38-1 .06-2 .16-3.2.26s-3 .46-4.7.73a82.06 82.06 0 00-11.5 2.48c-8.18 2-17.66 6-27.66 11.89A106.79 106.79 0 0052 134.34a82.82 82.82 0 00-2.2 11.95c-.22 2-.55 4.08-.68 6.14s-.1 4.14-.15 6.23l-.06 3.13v2.1l.12 1.4.46 5.6a59.24 59.24 0 00.91 6.34c.41 2.22.82 4.44 1.23 6.68a105.35 105.35 0 0024.48 46.14 107.91 107.91 0 0020.42 17.27c7.67 4.6 15.65 8.84 24.27 11.31 17 5.66 35.25 5.87 52.11 2.4a98.61 98.61 0 0070.89-60.28 96.89 96.89 0 006.45-40.3z" />
          <Path d="M299.32 126.71l-1.18-4.59c-.87-3-1.65-7.48-3.71-12.86-1-2.7-1.9-5.75-3.2-9l-4.59-10.23c-1.81-3.56-4-7.23-6.12-11.16-2.35-3.81-5-7.68-7.73-11.78-6-7.75-12.76-16-21.26-23.38-8.2-7.68-18.06-14.35-28.62-20.42s-22.53-10.51-34.83-14a165.31 165.31 0 00-38.32-4.87 165.14 165.14 0 00-38.52 4.87c-12.3 3.48-24.22 7.88-34.83 14S56 36.09 47.8 43.76c-8.5 7.35-15.25 15.63-21.26 23.37-2.7 4.1-5.39 8-7.74 11.78-2.14 3.93-4.31 7.6-6.12 11.16L8.09 100.3c-1.3 3.21-2.22 6.27-3.2 9-2.07 5.39-2.84 9.88-3.71 12.85L0 126.71s.33-1.61.94-4.64S2.16 114.5 4.06 109c.88-2.75 1.69-5.87 2.88-9.15s2.72-6.75 4.23-10.5c1.69-3.67 3.73-7.46 5.76-11.53 2.23-4 4.91-7.92 7.55-12.16 5.91-8 12.6-16.6 21.1-24.32a144.11 144.11 0 0128.93-21.41c10.84-6.33 23-11 35.66-14.62A168.74 168.74 0 01149.56 0a168.34 168.34 0 0139.58 5.31C201.77 9 214 13.6 224.81 19.94a144 144 0 0128.92 21.41c8.5 7.72 15.19 16.31 21.11 24.32 2.63 4.24 5.31 8.21 7.54 12.16 2 4.07 4.07 7.86 5.77 11.53 1.51 3.75 2.92 7.26 4.23 10.5s2 6.41 2.88 9.17c1.9 5.49 2.38 10 3.11 13z" />
          <Circle cx={158.61} cy={161.02} r={30.07} />
        </G>
      </G>
    </Svg>
  )
}

const CleanLogo: React.FC<Props> = ({ size, fill = '#fff' }: Props) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 650 650" fill="none">
      <Path
        d="M649.732 342.975c-.834-9.133-1.648-18.086-2.442-26.86a8330.539 8330.539 0 01-5.362-26.085c-1.34-8.565-4.915-16.145-7.149-23.875a134.493 134.493 0 00-8.429-21.847l-9.204-19.846-10.544-17.43c-6.196-11.46-14.536-20.264-20.851-28.979a262.791 262.791 0 00-34.91-35.187s-8.996-16.446-13.463-11.251c-4.463 5.189 12.689 12.087 12.689 12.087 11.908 11.324 32.318 37.097 32.318 37.097s13.166 17.907 18.498 29.845l9.144 17.548 7.685 19.847a129.593 129.593 0 016.732 21.518c1.638 7.551 4.646 15.101 5.331 23.159l3.485 24.473c.239 8.755.477 17.708.715 26.86-.433 38.057-13.879 75.594-29.783 110.157a275.408 275.408 0 01-77.445 97.114 262.987 262.987 0 01-119.414 51.453c-43.905 5.969-135.353 2.477-176.309-14.445-20.851-7.372-39.765-19.339-57.756-31.635a263.285 263.285 0 01-46.616-45.245 249.913 249.913 0 01-50.637-112.425l-1.549-13.818a96.52 96.52 0 01-1.28-14.683l-.299-16.773v-5.73 1.343l.18-1.821.655-7.192 1.22-14.207c.597-4.655 1.728-9.251 2.533-13.818a176.365 176.365 0 016.702-26.591 232.898 232.898 0 0149.415-86.997 228.274 228.274 0 0166.007-51.094c22.191-10.894 42.476-18.415 59.931-21.19a154.56 154.56 0 0121.565-3.313c3.187-.298 5.421-.597 8.698-1.015 22.548-2.745 52.841 13.371 81.734 17.907a15.296 15.296 0 014.605-10.018 15.234 15.234 0 0120.524-.646 15.288 15.288 0 015.223 9.709 48.904 48.904 0 008.013-2.984c39.229-19.161 52.722-25.756 71.487-28.412 18.766-2.657 25.379-20.474 25.379-37.635 0-17.16-6.583-35.007-25.379-37.634C462.584 29.785 449.091 23.16 409.892 4a60.672 60.672 0 00-7.864-2.984 15.404 15.404 0 01-5.179 10.033 15.35 15.35 0 01-20.964-.694A15.413 15.413 0 01371.378 0c-23.829 4.924-47.658 20.026-77.087 22.025-2.979.18-5.958.478-9.532.776-3.575.299-8.936 1.373-14 2.179a244 244 0 00-34.254 7.402c-24.366 5.968-52.603 17.906-82.39 35.485a318.32 318.32 0 00-92.11 84.091A318.995 318.995 0 009.204 265.05a247.628 247.628 0 00-6.553 35.665c-.655 5.969-1.638 12.176-2.025 18.324-.388 6.148-.298 12.356-.447 18.594L0 346.974v6.267l.357 4.179 1.37 16.713a177.114 177.114 0 002.711 18.921c1.221 6.626 2.443 13.251 3.664 19.937a314.615 314.615 0 0072.917 137.703 321.635 321.635 0 0060.824 51.542c22.846 13.728 46.616 26.382 72.292 33.754 50.637 16.892 150.008 17.519 200.228 7.163a293.507 293.507 0 00128.089-63.427 294.292 294.292 0 0083.067-116.477c14.854-38.27 26.405-79.271 24.213-120.274z"
        fill={fill}
      />
      <Path
        d="M352.548 452.486c49.456 0 89.548-40.179 89.548-89.743 0-49.564-40.092-89.743-89.548-89.743S263 313.179 263 362.743c0 49.564 40.092 89.743 89.548 89.743z"
        fill={fill}
      />
    </Svg>
  )
}

const Cross: React.FC<Props> = ({ size }: Props) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <Path
        d="M8.41 7l4.3-4.29a1.004 1.004 0 10-1.42-1.42L7 5.59l-4.29-4.3a1.004 1.004 0 00-1.42 1.42L5.59 7l-4.3 4.29a1 1 0 00.325 1.639 1 1 0 001.095-.219L7 8.41l4.29 4.3a1.002 1.002 0 001.639-.325 1 1 0 00-.219-1.095L8.41 7z"
        fill="#fff"
      />
    </Svg>
  )
}

const Wallet: React.FC<Props> = ({ size }: Props) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 18" fill="none">
      <Path
        d="M17 4h-1V3a3 3 0 00-3-3H3a3 3 0 00-3 3v12a3 3 0 003 3h14a3 3 0 003-3V7a3 3 0 00-3-3zM3 2h10a1 1 0 011 1v1H3a1 1 0 010-2zm15 10h-1a1 1 0 010-2h1v2zm0-4h-1a3 3 0 000 6h1v1a1 1 0 01-1 1H3a1 1 0 01-1-1V5.83A3 3 0 003 6h14a1 1 0 011 1v1z"
        fill="#fff"
      />
    </Svg>
  )
}

const History: React.FC<Props> = ({ size }: Props) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M10 0a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm3.1-7.37L11 9.42V5a1 1 0 00-2 0v5.12a.65.65 0 00.05.2c.02.06.047.116.08.17.027.057.06.11.1.16l.16.13.09.09 2.6 1.5a1 1 0 00.5.13 1 1 0 00.5-1.87h.02z"
        fill="#fff"
      />
    </Svg>
  )
}

const Settings: React.FC<Props> = ({ size }: Props) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M19.32 7.55l-1.89-.63.89-1.78A1 1 0 0018.13 4L16 1.87a1 1 0 00-1.15-.19l-1.78.89-.63-1.89A1 1 0 0011.5 0h-3a1 1 0 00-.95.68l-.63 1.89-1.78-.89A1 1 0 004 1.87L1.87 4a1 1 0 00-.19 1.15l.89 1.78-1.89.63A1 1 0 000 8.5v3a1 1 0 00.68.95l1.89.63-.89 1.78A1 1 0 001.87 16L4 18.13a1 1 0 001.15.19l1.78-.89.63 1.89a1 1 0 00.95.68h3a1 1 0 00.95-.68l.63-1.89 1.78.89a1 1 0 001.13-.19L18.13 16a1 1 0 00.19-1.15l-.89-1.78 1.89-.63a1 1 0 00.68-.94v-3a1 1 0 00-.68-.95zM18 10.78l-1.2.4A2 2 0 0015.64 14l.57 1.14-1.1 1.1-1.11-.6a2 2 0 00-2.79 1.16l-.4 1.2H9.22l-.4-1.2A2 2 0 006 15.64l-1.14.57-1.1-1.1.6-1.11a2 2 0 00-1.16-2.82l-1.2-.4V9.22l1.2-.4A2 2 0 004.36 6l-.57-1.11 1.1-1.1L6 4.36A2 2 0 008.82 3.2l.4-1.2h1.56l.4 1.2A2 2 0 0014 4.36l1.14-.57 1.1 1.1-.6 1.11a2 2 0 001.16 2.79l1.2.4v1.59zM10 6a4 4 0 100 8 4 4 0 000-8zm0 6a2 2 0 110-4 2 2 0 010 4z"
        fill="#fff"
      />
    </Svg>
  )
}

const Waves: React.FC<Props> = ({ size }: Props) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 21 13" fill="none" style={{ marginTop: 2 }}>
      <Path
        d="M.76 2.063c.196.058.384.138.56.24a4 4 0 004.1 0 2.6 2.6 0 012.56 0 4.15 4.15 0 004.12 0 2.6 2.6 0 012.56 0 4.25 4.25 0 002.08.56 3.88 3.88 0 002-.56c.176-.102.364-.182.56-.24a1 1 0 10-.56-1.92 4.45 4.45 0 00-1 .45 2.08 2.08 0 01-2.1 0 4.64 4.64 0 00-4.54 0 2.11 2.11 0 01-2.12 0 4.64 4.64 0 00-4.54 0 2.08 2.08 0 01-2.1 0 4.45 4.45 0 00-1-.45 1 1 0 10-.56 1.92H.76zm18 8.08c-.35.108-.687.26-1 .45a2.08 2.08 0 01-2.1 0 4.64 4.64 0 00-4.54 0 2.11 2.11 0 01-2.12 0 4.64 4.64 0 00-4.54 0 2.08 2.08 0 01-2.1 0 4.448 4.448 0 00-1-.45.999.999 0 10-.56 1.92c.196.058.384.138.56.24a4 4 0 004.1 0 2.6 2.6 0 012.56 0 4.15 4.15 0 004.12 0 2.6 2.6 0 012.56 0 4.25 4.25 0 002.08.56 3.88 3.88 0 002-.56c.176-.102.364-.182.56-.24a1 1 0 00-.56-1.92h-.02zm0-5a4.45 4.45 0 00-1 .45 2.08 2.08 0 01-2.1 0 4.64 4.64 0 00-4.54 0 2.11 2.11 0 01-2.12 0 4.64 4.64 0 00-4.54 0 2.08 2.08 0 01-2.1 0 4.45 4.45 0 00-1-.45 1 1 0 00-1.32.68 1 1 0 00.68 1.24c.196.058.384.138.56.24a4 4 0 004.1 0 2.6 2.6 0 012.56 0 4.15 4.15 0 004.12 0 2.6 2.6 0 012.56 0 4.25 4.25 0 002.08.56 3.88 3.88 0 002-.56c.176-.102.364-.182.56-.24a1 1 0 10-.56-1.92h.06z"
        fill="#fff"
      />
    </Svg>
  )
}

const Email: React.FC<Props> = ({ size }: Props) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path
        d="M8 .5a7.5 7.5 0 103.75 13.995.751.751 0 10-.75-1.297A6 6 0 1114 8v.563a1.313 1.313 0 01-2.625 0V5.374a.75.75 0 00-.75-.75.75.75 0 00-.75.593A3.337 3.337 0 008 4.625a3.375 3.375 0 102.475 5.625A2.805 2.805 0 0015.5 8.562V8A7.5 7.5 0 008 .5zm0 9.375a1.875 1.875 0 110-3.75 1.875 1.875 0 010 3.75z"
        fill="#fff"
      />
    </Svg>
  )
}

const Key: React.FC<Props> = ({ size }: Props) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path
        d="M15.283 3.897L14.216 2.84l1.066-1.057A.753.753 0 0014.216.718L6.313 8.623a3.75 3.75 0 101.065 1.065l3.66-3.668 1.057 1.065a.75.75 0 00.532.218.75.75 0 00.533-1.283L12.095 5l1.065-1.065L14.217 5a.75.75 0 00.533.218.75.75 0 00.533-.218.751.751 0 000-1.103zM4.25 14a2.25 2.25 0 110-4.5 2.25 2.25 0 010 4.5z"
        fill="#fff"
      />
    </Svg>
  )
}

const User: React.FC<Props> = ({ size }: Props) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 14 14">
      <Path
        d="M9.473 7.473a4 4 0 10-4.946 0A6.667 6.667 0 00.38 12.927a.67.67 0 101.333.146 5.333 5.333 0 0110.6 0 .667.667 0 00.667.594h.073a.667.667 0 00.587-.734 6.667 6.667 0 00-4.167-5.46zM7 7a2.667 2.667 0 110-5.333A2.667 2.667 0 017 7z"
        fill="#fff"
      />
    </Svg>
  )
}

const Users: React.FC<Props> = ({ size }: Props) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 14">
      <Path
        d="M9.225 7.165a3.69 3.69 0 001.275-2.79 3.75 3.75 0 00-7.5 0 3.69 3.69 0 001.275 2.79 6 6 0 00-3.525 5.46.75.75 0 101.5 0 4.5 4.5 0 119 0 .75.75 0 101.5 0 6 6 0 00-3.525-5.46zm-2.475-.54a2.25 2.25 0 110-4.5 2.25 2.25 0 010 4.5zm7.305.24A3.75 3.75 0 0011.25.625a.75.75 0 100 1.5 2.25 2.25 0 012.25 2.25 2.25 2.25 0 01-1.125 1.942.75.75 0 00-.037 1.276l.292.194.097.053a5.25 5.25 0 013 4.785.75.75 0 101.5 0 6.75 6.75 0 00-3.172-5.76z"
        fill="#fff"
      />
    </Svg>
  )
}

const Money: React.FC<Props> = ({ size, fill = '#fff' }: Props) => {
  const RATIO = 18 / 12
  return (
    <Svg width={size} height={size / RATIO} viewBox="0 0 18 12">
      <Path
        d="M4.5 5.25a.75.75 0 100 1.5.75.75 0 000-1.5zm9 0a.75.75 0 100 1.5.75.75 0 000-1.5zM15 .75H3A2.25 2.25 0 00.75 3v6A2.25 2.25 0 003 11.25h12A2.25 2.25 0 0017.25 9V3A2.25 2.25 0 0015 .75zM15.75 9a.75.75 0 01-.75.75H3A.75.75 0 012.25 9V3A.75.75 0 013 2.25h12a.75.75 0 01.75.75v6zM9 3.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zm0 3a.75.75 0 110-1.5.75.75 0 010 1.5z"
        fill={fill}
      />
    </Svg>
  )
}

const Search: React.FC<Props> = ({ size, fill = '#fff' }: Props) => {
  const RATIO = 13 / 12
  return (
    <Svg width={size} height={size / RATIO} viewBox="0 0 13 12">
      <Path
        d="M11.84 10.988L9.614 8.78a5.401 5.401 0 10-.834.834l2.208 2.208a.599.599 0 00.853 0 .6.6 0 000-.834zM5.414 9.614a4.2 4.2 0 110-8.401 4.2 4.2 0 010 8.401z"
        fill={fill}
      />
    </Svg>
  )
}

const MoneySend: React.FC<Props> = ({ size, fill = '#fff' }: Props) => {
  const RATIO = 20 / 18
  return (
    <Svg width={size} height={size / RATIO} viewBox="0 0 20 18" fill="none">
      <Path
        d="M8.6 3.552l.49-.525V6.22a.88.88 0 00.267.629.92.92 0 001.286 0 .88.88 0 00.266-.629V3.027l.491.49a.907.907 0 00.656.299.927.927 0 00.671-.264.89.89 0 00.27-.631.873.873 0 00-.27-.632L10.645.253a.913.913 0 00-.3-.186.928.928 0 00-.69 0 .912.912 0 00-.3.186l-2.082 2a.908.908 0 000 1.299.95.95 0 001.327 0zM10 8.887c-.54 0-1.067.156-1.515.45-.449.292-.798.709-1.005 1.196a2.613 2.613 0 00-.155 1.541c.105.518.365.993.747 1.366.38.373.867.627 1.396.73.529.103 1.077.05 1.576-.152a2.715 2.715 0 001.224-.982 2.626 2.626 0 00-.34-3.368A2.759 2.759 0 0010 8.887zm0 3.556a.924.924 0 01-.505-.15.894.894 0 01-.335-.399.871.871 0 01.197-.969.928.928 0 01.99-.193.905.905 0 01.409.328.876.876 0 01-.113 1.123.92.92 0 01-.643.26zm-6.364-.889c0 .176.054.348.154.494.1.146.241.26.408.327a.928.928 0 00.99-.192.87.87 0 00.197-.969.894.894 0 00-.334-.4.924.924 0 00-1.148.111.88.88 0 00-.267.629zm12.728 0a.876.876 0 00-.154-.494.905.905 0 00-.408-.327.928.928 0 00-.99.192.87.87 0 00-.197.969.894.894 0 00.335.4.923.923 0 001.147-.111.88.88 0 00.267-.629zm.909-6.224h-3.637a.92.92 0 00-.643.26.88.88 0 000 1.258.92.92 0 00.643.26h3.637a.92.92 0 01.643.26.88.88 0 01.266.63v7.112a.88.88 0 01-.266.63.92.92 0 01-.643.26H2.727a.92.92 0 01-.643-.26.88.88 0 01-.266-.63V7.998a.88.88 0 01.266-.63.92.92 0 01.643-.26h3.637a.92.92 0 00.642-.26.88.88 0 000-1.257.92.92 0 00-.642-.26H2.727c-.723 0-1.417.28-1.928.78A2.638 2.638 0 000 7.998v7.112c0 .708.287 1.386.799 1.887.511.5 1.205.78 1.928.78h14.546c.723 0 1.417-.28 1.928-.78.512-.5.799-1.18.799-1.887V7.998c0-.708-.287-1.386-.799-1.887a2.759 2.759 0 00-1.928-.78z"
        fill={fill}
      />
    </Svg>
  )
}

const Chat: React.FC<Props> = ({ size, fill = '#fff' }: Props) => {
  const RATIO = 16 / 17
  return (
    <Svg width={size} height={size / RATIO} viewBox="0 0 16 17" fill="none">
      <Path
        d="M11.352 2.568a.884.884 0 001.209-.331.89.89 0 011.003-.423.889.889 0 01.66.87.898.898 0 01-.26.633.886.886 0 01-.63.262.886.886 0 00-.628.262.898.898 0 000 1.265.886.886 0 00.629.262c.468 0 .927-.124 1.333-.36a2.697 2.697 0 00-.002-4.649 2.654 2.654 0 00-3.643.983.899.899 0 00.329 1.226zm3.823 6.38a.885.885 0 00-.656.177.896.896 0 00-.34.592 6.276 6.276 0 01-2.056 3.924A6.2 6.2 0 018 15.211H3.03l.578-.582a.898.898 0 000-1.262 6.276 6.276 0 01-1.696-3.203 6.3 6.3 0 01.355-3.611A6.255 6.255 0 014.55 3.745 6.196 6.196 0 018 2.685a.886.886 0 00.629-.263A.898.898 0 008 .895a7.965 7.965 0 00-4.245 1.247A8.036 8.036 0 00.817 5.468a8.098 8.098 0 00.96 8.499L.257 15.47a.896.896 0 00-.187.975.893.893 0 00.817.555H8c1.948 0 3.83-.715 5.292-2.011a8.068 8.068 0 002.648-5.03.901.901 0 00-.435-.899.886.886 0 00-.33-.113zm-1.503-2.622a.884.884 0 00-.515-.063l-.16.054-.16.08-.134.117a.898.898 0 00-.186.286.756.756 0 00-.072.358.899.899 0 00.063.349.894.894 0 00.485.48.886.886 0 00.97-.196.898.898 0 00.26-.633.755.755 0 00-.07-.34.954.954 0 00-.48-.483v-.01z"
        fill={fill}
      />
    </Svg>
  )
}

const List: React.FC<Props> = ({ size }: Props) => {
  const RATIO = 16 / 10
  return (
    <Svg width={size} height={size / RATIO} viewBox="0 0 16 10">
      <Path
        d="M1.782 8.217a.75.75 0 00-.247-.157.75.75 0 00-.57 0 .75.75 0 00-.248.157.75.75 0 00-.157.248.75.75 0 00.157.818c.073.066.157.119.248.157a.705.705 0 00.57 0 .862.862 0 00.247-.157.75.75 0 00.158-.818.75.75 0 00-.158-.248zM4.25 2h10.5a.75.75 0 100-1.5H4.25a.75.75 0 000 1.5zM1.782 4.468a.75.75 0 00-.817-.158.862.862 0 00-.248.158.75.75 0 00-.157.247.705.705 0 000 .57c.038.09.091.175.157.247.073.067.157.12.248.158a.705.705 0 00.57 0 .862.862 0 00.247-.158.862.862 0 00.158-.247.705.705 0 000-.57.75.75 0 00-.158-.247zM14.75 4.25H4.25a.75.75 0 000 1.5h10.5a.75.75 0 100-1.5zM1.782.718A.75.75 0 001.535.56a.75.75 0 00-.818.157.863.863 0 00-.157.248.705.705 0 000 .57c.038.09.091.175.157.248.073.066.157.119.248.157a.75.75 0 00.817-.157.862.862 0 00.158-.248.705.705 0 000-.57.862.862 0 00-.158-.247zM14.75 8H4.25a.75.75 0 000 1.5h10.5a.75.75 0 100-1.5z"
        fill="#fff"
      />
    </Svg>
  )
}

const Telegram: React.FC<Props> = ({ size }: Props) => {
  const RATIO = 16 / 14
  return (
    <Svg width={size} height={size / RATIO} viewBox="0 0 16 14">
      <Path
        d="M.283 6.714L3.969 8.09l1.427 4.59c.092.293.451.402.69.207l2.055-1.675a.613.613 0 01.747-.021l3.707 2.69a.434.434 0 00.68-.262L15.991.56a.435.435 0 00-.582-.494L.279 5.9a.435.435 0 00.004.813zm4.883.644l7.206-4.438c.13-.08.262.096.151.199L6.577 8.646a1.233 1.233 0 00-.382.738l-.203 1.501c-.027.2-.308.22-.364.026L4.85 8.174a.725.725 0 01.317-.816z"
        fill="#fff"
      />
    </Svg>
  )
}

const Savings: React.FC<Props> = ({ size }: Props) => {
  const RATIO = 16 / 14
  return (
    <Svg width={size} height={size / RATIO} viewBox="0 0 16 14">
      <Path
        d="M14.915 7a2.25 2.25 0 00.585-1.5 2.25 2.25 0 00-2.25-2.25H9.365a2.25 2.25 0 00-2.115-3h-4.5A2.25 2.25 0 00.5 2.5 2.25 2.25 0 001.085 4a2.25 2.25 0 000 3 2.25 2.25 0 000 3A2.25 2.25 0 00.5 11.5a2.25 2.25 0 002.25 2.25h10.5A2.25 2.25 0 0014.915 10a2.25 2.25 0 000-3zM7.25 12.25h-4.5a.75.75 0 110-1.5h4.5a.75.75 0 110 1.5zm0-3h-4.5a.75.75 0 010-1.5h4.5a.75.75 0 010 1.5zm0-3h-4.5a.75.75 0 010-1.5h4.5a.75.75 0 010 1.5zm0-3h-4.5a.75.75 0 010-1.5h4.5a.75.75 0 010 1.5zm6.518 8.783a.697.697 0 01-.518.217H9.365c.18-.484.18-1.016 0-1.5h3.885a.75.75 0 01.75.75.75.75 0 01-.232.533zm0-3a.697.697 0 01-.518.217H9.365c.18-.484.18-1.016 0-1.5h3.885a.75.75 0 01.75.75.75.75 0 01-.232.533zm0-3a.697.697 0 01-.518.217H9.365c.18-.484.18-1.016 0-1.5h3.885a.75.75 0 01.75.75.75.75 0 01-.232.532z"
        fill="#fff"
      />
    </Svg>
  )
}

const Copy: React.FC<Props> = ({ size }: Props) => {
  const RATIO = 18 / 20
  return (
    <Svg width={size} height={size / RATIO} viewBox="0 0 18 20">
      <Path
        d="M17.25 7.195a1.199 1.199 0 00-.055-.248v-.082a.982.982 0 00-.174-.257l-5.5-5.5a.98.98 0 00-.257-.174.293.293 0 00-.082 0 .807.807 0 00-.303-.1H7.167a2.75 2.75 0 00-2.75 2.75V4.5H3.5A2.75 2.75 0 00.75 7.25v9.167a2.75 2.75 0 002.75 2.75h7.333a2.75 2.75 0 002.75-2.75V15.5h.917a2.75 2.75 0 002.75-2.75v-5.5-.055zm-5.5-3.236l2.374 2.374h-1.457a.917.917 0 01-.917-.916V3.959zm0 12.458a.917.917 0 01-.917.916H3.5a.917.917 0 01-.917-.916V7.25a.917.917 0 01.917-.917h.917v6.417a2.75 2.75 0 002.75 2.75h4.583v.917zm3.667-3.667a.917.917 0 01-.917.917H7.167a.917.917 0 01-.917-.917V3.583a.917.917 0 01.917-.916h2.75v2.75a2.75 2.75 0 002.75 2.75h2.75v4.583z"
        fill="#fff"
      />
    </Svg>
  )
}

const Reinvest: React.FC<Props> = ({ size }: Props) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16">
      <Path
        d="M13.932 10.633h-3.397a.75.75 0 100 1.5h1.8A6 6 0 012 8 .75.75 0 00.5 8a7.5 7.5 0 0012.66 5.422v1.328a.75.75 0 101.5 0v-3.375a.75.75 0 00-.728-.742zM8 .5a7.5 7.5 0 00-5.16 2.078V1.25a.75.75 0 00-1.5 0v3.375a.75.75 0 00.75.75h3.375a.75.75 0 000-1.5h-1.8A6 6 0 0114 8a.75.75 0 101.5 0A7.5 7.5 0 008 .5z"
        fill="#fff"
      />
    </Svg>
  )
}

const CoinsSelect: React.FC<Props> = ({ size, fill = '#fff' }: Props) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16">
      <Path
        d="M8 0a8 8 0 100 16A8 8 0 008 0zm0 14.546a6.545 6.545 0 110-13.09 6.545 6.545 0 010 13.09z"
        fill={fill}
      />
      <Circle cx={8} cy={8} r={3.35} stroke={fill} strokeWidth={1.3} />
      <Rect x={7} y={7} width={2} height={2} rx={1} fill={fill} />
    </Svg>
  )
}

const Filter: React.FC<Props> = ({ size }: Props) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18">
      <Path
        d="M12.183 15.667H16.5a.833.833 0 100-1.667h-4.317a2.5 2.5 0 00-4.7 0H1.5a.833.833 0 100 1.667h5.983a2.5 2.5 0 004.7 0zM9 14.833a.833.833 0 111.666 0 .833.833 0 01-1.666 0zm-1.817-5H16.5a.833.833 0 100-1.666H7.183a2.5 2.5 0 00-4.7 0H1.5a.833.833 0 100 1.666h.983a2.5 2.5 0 004.7 0zM4 9a.833.833 0 111.667 0A.833.833 0 014 9zm9.85-5h2.65a.833.833 0 100-1.667h-2.65a2.5 2.5 0 00-4.7 0H1.5A.833.833 0 101.5 4h7.65a2.5 2.5 0 004.7 0zm-3.183-.833a.834.834 0 111.667 0 .834.834 0 01-1.667 0z"
        fill="#fff"
      />
    </Svg>
  )
}

interface ArrowProps extends Props {
  direction: 'left' | 'right'
}

const Arrow: React.FC<ArrowProps> = ({ size, direction }: ArrowProps) => {
  const RATIO = 14 / 8

  const rotate = direction === 'left' ? '0deg' : '180deg'
  return (
    <Svg width={size} height={size / RATIO} viewBox="0 0 14 8" style={{ transform: [{ rotate }] }}>
      <Path
        d="M13.453 3.453H1.871l1.919-1.91A.547.547 0 103.018.77L.161 3.612a.547.547 0 000 .775l2.857 2.844a.547.547 0 00.772-.775l-1.919-1.91h11.582a.547.547 0 100-1.093z"
        fill="#fff"
      />
    </Svg>
  )
}

const ArrowInCircle: React.FC<ArrowProps> = ({ size, direction }: ArrowProps) => {
  const RATIO = 21 / 16

  const rotate = direction === 'left' ? '0deg' : '180deg'
  return (
    <Svg
      width={size}
      height={size / RATIO}
      viewBox="0 0 21 16"
      style={{ transform: [{ rotate }, { translateX: 2 }] }}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.445 14.652A8 8 0 1115.746 6h-1.514a6.545 6.545 0 100 4h1.514a8 8 0 01-3.301 4.652z"
        fill="#fff"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.3 8a2.7 2.7 0 014.514-2h1.65a4 4 0 100 4h-1.65A2.7 2.7 0 015.3 8z"
        fill="#fff"
      />
      <Rect x={9} y={9} width={2} height={2} rx={1} transform="rotate(-180 9 9)" fill="#fff" />
      <Path
        d="M7.547 8.547h11.582l-1.919 1.91a.547.547 0 10.772.774l2.857-2.843a.547.547 0 000-.775l-2.857-2.844a.547.547 0 00-.772.775l1.918 1.91H7.547a.547.547 0 100 1.093z"
        fill="#fff"
      />
    </Svg>
  )
}

const Chevron: React.FC<ArrowProps> = ({ size, direction }: ArrowProps) => {
  const RATIO = 10 / 15

  const rotate = direction === 'left' ? '180deg' : '0deg'
  return (
    <Svg width={size} height={size / RATIO} viewBox="0 0 10 15" style={{ transform: [{ rotate }] }}>
      <Path
        d="M5.947 8l-4.72 4.72A1.333 1.333 0 103.12 14.6l5.653-5.653a1.333 1.333 0 000-1.894L3.12 1.333a1.333 1.333 0 00-.947-.386 1.333 1.333 0 00-.946.386 1.333 1.333 0 000 1.88L5.947 8z"
        fill="#fff"
      />
    </Svg>
  )
}

const Percent: React.FC<Props> = ({ size }: Props) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 13 13">
      <Path
        d="M2.822 5.068a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5zm0-3a.75.75 0 110 1.5.75.75 0 010-1.5zm6.363 4.864a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zm0 3a.75.75 0 110-1.5.75.75 0 010 1.5zM11.783.22a.75.75 0 00-1.06 0l-10.5 10.5a.75.75 0 101.06 1.06l10.5-10.5a.749.749 0 000-1.06z"
        fill="#fff"
      />
    </Svg>
  )
}

const Structure: React.FC<Props> = ({ size }: Props) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16">
      <Path
        d="M14.667 10h-1.334V8a.667.667 0 00-.666-.667h-4V6H10a.667.667 0 00.667-.667v-4A.667.667 0 0010 .667H6a.667.667 0 00-.667.666v4A.667.667 0 006 6h1.333v1.333h-4A.667.667 0 002.667 8v2H1.333a.667.667 0 00-.666.667v4a.667.667 0 00.666.666h4A.666.666 0 006 14.667v-4A.667.667 0 005.333 10H4V8.667h8V10h-1.333a.667.667 0 00-.667.667v4a.666.666 0 00.667.666h4a.667.667 0 00.666-.666v-4a.667.667 0 00-.666-.667zm-10 1.333V14H2v-2.667h2.667zm2-6.666V2h2.666v2.667H6.667zM14 14h-2.667v-2.667H14V14z"
        fill="#fff"
      />
    </Svg>
  )
}

const Calendar: React.FC<Props> = ({ size }: Props) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 14 14">
      <Path
        d="M11.667 1.667h-1.334V1A.667.667 0 109 1v.667H5V1a.667.667 0 00-1.333 0v.667H2.333a2 2 0 00-2 2v8a2 2 0 002 2h9.334a2 2 0 002-2v-8a2 2 0 00-2-2zm.666 10a.667.667 0 01-.666.666H2.333a.667.667 0 01-.666-.666V7h10.666v4.667zm0-6H1.667v-2A.667.667 0 012.333 3h1.334v.667a.667.667 0 101.333 0V3h4v.667a.667.667 0 001.333 0V3h1.334a.667.667 0 01.666.667v2z"
        fill="#fff"
      />
    </Svg>
  )
}

const TouchIcon: React.FC<Props> = ({ size, fill = '#fff' }: Props) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 30 30">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M.684 18.489a.392.392 0 01-.386-.311A14.464 14.464 0 011.644 8.56c.1-.19.336-.266.53-.169.193.098.27.331.17.522a13.703 13.703 0 00-1.275 9.112.387.387 0 01-.385.464zM3.201 7.194a.396.396 0 01-.231-.074.383.383 0 01-.086-.541c2.21-2.98 5.453-5.024 9.133-5.754a15.052 15.052 0 019.547 1.212.385.385 0 01.18.518.397.397 0 01-.526.177 14.26 14.26 0 00-9.046-1.147 14.17 14.17 0 00-8.652 5.45.395.395 0 01-.319.16zM29.267 12.819a.392.392 0 01-.385-.311c-.722-3.524-2.766-6.601-5.756-8.665a.384.384 0 01-.096-.54.398.398 0 01.549-.094c3.155 2.178 5.313 5.426 6.075 9.146a.388.388 0 01-.387.464z"
        fill={fill}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M29.563 15.942h-.008a.39.39 0 01-.386-.395c.02-1.016-.074-2.04-.28-3.041a.388.388 0 01.309-.456.393.393 0 01.463.303c.217 1.057.316 2.136.296 3.21a.39.39 0 01-.394.38zM.831 19.1a.393.393 0 01-.382-.295 15.262 15.262 0 01-.143-.628.388.388 0 01.308-.456.393.393 0 01.464.302c.04.194.085.395.136.596a.387.387 0 01-.383.48zM11.212 29.513a.396.396 0 01-.26-.096.383.383 0 01-.036-.547 15.838 15.838 0 003.42-6.221c.674-2.395.76-4.853.258-7.307a.387.387 0 01.308-.456.393.393 0 01.463.303 16.099 16.099 0 01-.27 7.666 16.613 16.613 0 01-3.587 6.526.396.396 0 01-.296.132z"
        fill={fill}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.327 28.878a.396.396 0 01-.275-.11.383.383 0 01-.007-.548 13.936 13.936 0 003.078-4.697c.079-.2.307-.297.51-.22a.385.385 0 01.223.502A14.706 14.706 0 019.61 28.76a.395.395 0 01-.282.117z"
        fill={fill}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.253 29.9a.396.396 0 01-.242-.082.383.383 0 01-.068-.544c3.216-4.049 4.469-9.256 3.438-14.286l-.027-.13a1.408 1.408 0 00-.582-.77 1.447 1.447 0 00-1.08-.21 1.422 1.422 0 00-1.152 1.476l.04.19c.409 2 .398 4.017-.033 5.996a.394.394 0 01-.467.297.388.388 0 01-.303-.46c.382-1.751.416-3.535.102-5.307l-.008.001-.077-.372c-.242-1.184.54-2.341 1.742-2.58a2.24 2.24 0 011.672.323c.495.323.833.818.95 1.39l.07.339-.01.003c.954 5.146-.37 10.44-3.655 14.577a.396.396 0 01-.31.149zM7.605 28.028a.396.396 0 01-.288-.122.383.383 0 01.019-.548c2.928-2.695 4.355-6.629 3.82-10.524a.389.389 0 01.337-.436.393.393 0 01.443.332c.57 4.143-.948 8.328-4.062 11.194a.396.396 0 01-.269.104z"
        fill={fill}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.952 18.809a.39.39 0 01-.393-.387 19.19 19.19 0 00-.392-3.789l-.03-.15a3.185 3.185 0 00-1.357-1.888 3.28 3.28 0 00-2.448-.473 3.232 3.232 0 00-2.548 2.49.393.393 0 01-.466.3.388.388 0 01-.304-.459 4.012 4.012 0 013.163-3.09 4.072 4.072 0 013.039.586 3.953 3.953 0 011.727 2.53l.063.31-.005.003c.226 1.2.342 2.42.345 3.628a.39.39 0 01-.393.389zM15.442 29.991a.396.396 0 01-.222-.067.383.383 0 01-.103-.539 19.237 19.237 0 003.316-8.733.392.392 0 01.436-.341.389.389 0 01.347.429 20.006 20.006 0 01-3.45 9.083.395.395 0 01-.324.168z"
        fill={fill}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.049 26.994a.396.396 0 01-.298-.133.383.383 0 01.04-.547 10.44 10.44 0 003.058-4.418c.586-1.639.741-3.401.454-5.12H9.3l-.076-.369a5.659 5.659 0 01.865-4.336 5.834 5.834 0 013.728-2.464 5.972 5.972 0 011.618-.098.39.39 0 01.362.416.392.392 0 01-.423.356 5.167 5.167 0 00-1.402.085 5.051 5.051 0 00-3.227 2.134 4.898 4.898 0 00-.803 3.439l.064.313c.405 1.973.261 4.013-.415 5.902A11.214 11.214 0 016.307 26.9a.396.396 0 01-.258.094zM17.766 29.732a.396.396 0 01-.199-.054.384.384 0 01-.14-.53 20.812 20.812 0 002.527-14.87l-.035-.167a5.008 5.008 0 00-2.471-3.213.384.384 0 01-.152-.527.397.397 0 01.535-.15 5.78 5.78 0 012.897 3.904l.068.329-.006.002c.98 5.186.032 10.53-2.684 15.084a.395.395 0 01-.34.192z"
        fill={fill}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.665 25.795a.395.395 0 01-.305-.142.383.383 0 01.055-.545 8.653 8.653 0 002.617-3.551.396.396 0 01.51-.22.385.385 0 01.224.5 9.431 9.431 0 01-2.852 3.87.396.396 0 01-.25.088zM22.286 22.628a.388.388 0 01-.389-.45 22.488 22.488 0 00-.157-8.253l-.02-.105a6.742 6.742 0 00-2.925-4.21 6.947 6.947 0 00-5.183-1 6.861 6.861 0 00-4.384 2.899 6.654 6.654 0 00-1.079 4.754l.07.344c.194.944.24 1.902.136 2.848a.392.392 0 01-.433.344.389.389 0 01-.35-.427c.081-.74.062-1.49-.055-2.232l-.078-.378a7.416 7.416 0 011.133-5.682 7.645 7.645 0 014.885-3.23 7.74 7.74 0 015.774 1.115 7.511 7.511 0 013.282 4.806l.037.18-.001.002c.546 2.775.588 5.583.125 8.35a.392.392 0 01-.388.325zM20.206 29.044a.398.398 0 01-.172-.04.385.385 0 01-.181-.517 22.742 22.742 0 001.562-4.114.395.395 0 01.482-.274c.21.055.335.268.279.474a23.506 23.506 0 01-1.615 4.253.394.394 0 01-.355.218z"
        fill={fill}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.742 27.796a.399.399 0 01-.14-.025.385.385 0 01-.227-.5 24.274 24.274 0 001.172-13.603l-.02-.098a8.45 8.45 0 00-1.496-3.355.383.383 0 01.086-.54.398.398 0 01.55.084 9.209 9.209 0 011.597 3.498h.002l.033.16a25.036 25.036 0 01-1.19 14.13.394.394 0 01-.367.25zM20.756 8.717a.396.396 0 01-.249-.087 8.803 8.803 0 00-7.255-1.776 8.856 8.856 0 00-1.918.612.396.396 0 01-.521-.191.385.385 0 01.193-.514 9.656 9.656 0 012.09-.667 9.597 9.597 0 017.91 1.936c.168.136.193.38.055.545a.395.395 0 01-.305.142zM3.457 24.45a.396.396 0 01-.307-.146.383.383 0 01.06-.544c1.942-1.535 2.885-3.941 2.506-6.341l-.062-.303c-.702-3.422.575-6.917 3.332-9.12a.398.398 0 01.554.057.383.383 0 01-.058.545c-2.437 1.948-3.613 4.996-3.12 8.024l.07.34c.571 2.783-.475 5.62-2.729 7.402a.396.396 0 01-.246.085z"
        fill={fill}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.428 22.961a.396.396 0 01-.3-.136.383.383 0 01.045-.546 4.967 4.967 0 001.743-4.58l-.047-.23a11.124 11.124 0 01-.217-1.76.39.39 0 01.377-.404c.218-.008.401.158.41.371.019.436.065.873.138 1.303l.07.336a5.731 5.731 0 01-1.965 5.555.396.396 0 01-.254.091zM25.947 14.92a.392.392 0 01-.39-.33 26.84 26.84 0 00-.206-1.188l-.04-.186c-.556-2.717-2.154-5.057-4.5-6.59a10.616 10.616 0 00-7.919-1.529 10.528 10.528 0 00-5.527 2.99 10.298 10.298 0 00-2.78 5.405.393.393 0 01-.455.315.388.388 0 01-.32-.448 11.066 11.066 0 012.986-5.808 11.315 11.315 0 015.94-3.213 11.408 11.408 0 018.51 1.643c2.44 1.595 4.128 4.002 4.777 6.802h.003l.06.28c.094.462.179.938.25 1.412a.388.388 0 01-.39.445zM25.326 25.758a.387.387 0 01-.38-.487 25.91 25.91 0 00.85-8.455.39.39 0 01.369-.411.391.391 0 01.418.362 26.67 26.67 0 01-.877 8.704.393.393 0 01-.38.287z"
        fill={fill}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.568 21.293a.396.396 0 01-.268-.103.383.383 0 01-.02-.548 3.188 3.188 0 00.832-2.686l-.028-.132A12.685 12.685 0 014.02 8.105c1.945-2.879 4.912-4.84 8.355-5.523a13.329 13.329 0 014.362-.142.388.388 0 01.338.435.393.393 0 01-.443.332 12.532 12.532 0 00-4.1.134c-3.238.642-6.028 2.487-7.856 5.193a11.924 11.924 0 00-1.864 8.92l.047.216a3.954 3.954 0 01-1.004 3.499.396.396 0 01-.288.124zM27.845 22.396c-.016 0-.033 0-.05-.003a.389.389 0 01-.341-.432c.372-2.942.27-5.918-.304-8.85l-.054-.25c-.884-4.318-4.086-7.838-8.355-9.185a.386.386 0 01-.255-.487.395.395 0 01.495-.25c4.42 1.394 7.765 4.98 8.807 9.408l.006-.001.078.362c.634 3.095.757 6.24.363 9.349a.392.392 0 01-.39.34z"
        fill={fill}
      />
    </Svg>
  )
}

function KeyboardBackSpace() {
  return (
    <Svg width={60} height={60} viewBox="0 0 60 60" fill="none">
      <Circle cx={30} cy={30} r={30} fill="#2B3239" />
      <Path
        d="M38 21H23c-.7 0-1.2.3-1.6.9L16 30l5.4 8.1c.4.5.9.9 1.6.9h15c1.1 0 2-.9 2-2V23c0-1.1-.9-2-2-2zm-3 12.6L33.6 35 30 31.4 26.4 35 25 33.6l3.6-3.6-3.6-3.6 1.4-1.4 3.6 3.6 3.6-3.6 1.4 1.4-3.6 3.6 3.6 3.6z"
        fill="#fff"
        opacity={0.5}
      />
    </Svg>
  )
}

function KeyboardApply() {
  return (
    <Svg width={60} height={60} viewBox="0 0 60 60" fill="none">
      <Circle cx={30} cy={30} r={30} fill="#554DF0" />
      <Path
        d="M38.61 24.347a1.212 1.212 0 00-.858-.347 1.242 1.242 0 00-.86.347l-9.01 8.758-3.787-3.686a1.24 1.24 0 00-.88-.337 1.268 1.268 0 00-.868.366 1.196 1.196 0 00-.347.854 1.168 1.168 0 00.377.843l4.645 4.508a1.212 1.212 0 00.86.347 1.242 1.242 0 00.858-.347l9.87-9.58a1.145 1.145 0 000-1.726z"
        fill="#fff"
      />
    </Svg>
  )
}

const Dots: React.FC<Props> = ({ size, fill = '#fff' }: Props) => {
  const RATIO = 25 / 5
  return (
    <Svg width={size} height={size / RATIO} viewBox="0 0 25 5">
      <Path
        d="M5 2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM15 2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM25 2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
        fill={fill}
      />
    </Svg>
  )
}

const MoneyNotFound: React.FC<Props> = ({ size, fill = '#fff' }: Props) => {
  const RATIO = 31 / 29
  return (
    <Svg width={size} height={size / RATIO} viewBox="0 0 31 29">
      <Path
        d="M7.25 13.125a1.376 1.376 0 100 2.751 1.376 1.376 0 000-2.751zm8.057-2.131l-9.83-9.845A1.38 1.38 0 003.523 3.1L5.31 4.875H4.5A4.125 4.125 0 00.375 9v11A4.125 4.125 0 004.5 24.125h20.061l3.713 3.726a1.375 1.375 0 001.952 0 1.375 1.375 0 000-1.952L15.308 10.994zm-1.017 2.873l1.843 1.843a1.374 1.374 0 01-.633.165 1.375 1.375 0 01-1.375-1.375c.003-.221.06-.438.165-.633zM4.5 21.375A1.375 1.375 0 013.125 20V9A1.375 1.375 0 014.5 7.625h3.561l4.263 4.262a4.125 4.125 0 00-.949 2.613 4.125 4.125 0 004.125 4.125 4.125 4.125 0 002.613-.949l3.698 3.699H4.5zm22-16.5H16.407a1.375 1.375 0 000 2.75H26.5A1.375 1.375 0 0127.875 9v10.093a1.375 1.375 0 002.75 0V9A4.125 4.125 0 0026.5 4.875zM25.125 14.5a1.375 1.375 0 10-2.75 0 1.375 1.375 0 002.75 0z"
        fill={fill}
      />
    </Svg>
  )
}

const Reward: React.FC<Props> = ({ size, fill = '#fff' }: Props) => {
  const RATIO = 15 / 16
  return (
    <Svg width={size} height={size / RATIO} viewBox="0 0 15 16">
      <Path
        d="M14.881 12.32l-2.256-3.844a5.607 5.607 0 00.7-2.727 5.71 5.71 0 00-1.708-4.065A5.869 5.869 0 007.497 0a5.868 5.868 0 00-4.122 1.684 5.71 5.71 0 00-1.707 4.065c-.002.953.238 1.89.7 2.727L.112 12.32a.813.813 0 00.306 1.123.84.84 0 00.418.11h2.39l1.215 2.02a.826.826 0 00.15.18.84.84 0 00.574.23h.117a.84.84 0 00.607-.402l1.607-2.727 1.607 2.752a.826.826 0 00.608.394h.116a.839.839 0 00.725-.402l1.215-2.021h2.39a.841.841 0 00.843-.834.813.813 0 00-.119-.423zm-9.724 1.257l-.741-1.224a.828.828 0 00-.708-.402h-1.44l1.19-2.037a5.856 5.856 0 002.973 1.511l-1.274 2.152zm2.34-3.72c-.824 0-1.629-.242-2.313-.693A4.12 4.12 0 013.65 7.321a4.055 4.055 0 01-.236-2.373 4.09 4.09 0 011.139-2.102 4.18 4.18 0 012.131-1.124 4.216 4.216 0 012.405.233c.761.311 1.411.838 1.869 1.513a4.068 4.068 0 01-.518 5.185 4.192 4.192 0 01-2.944 1.203zm3.787 2.094a.84.84 0 00-.707.402l-.741 1.224L8.57 11.4a5.906 5.906 0 002.964-1.51l1.19 2.036-1.44.025z"
        fill={fill}
      />
    </Svg>
  )
}

const TxReinvest: React.FC<Props> = ({ size, fill = '#fff' }: Props) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path
        d="M14.328 10.808h-3.624a.8.8 0 100 1.6h1.92A6.4 6.4 0 011.6 8 .8.8 0 000 8a8 8 0 0013.504 5.784V15.2a.8.8 0 101.6 0v-3.6a.8.8 0 00-.776-.792zM10.4 8a2.4 2.4 0 10-4.8 0 2.4 2.4 0 004.8 0zM7.2 8a.8.8 0 111.6 0 .8.8 0 01-1.6 0zM8 0a8 8 0 00-5.504 2.216V.8a.8.8 0 00-1.6 0v3.6a.8.8 0 00.8.8h3.6a.8.8 0 000-1.6h-1.92A6.4 6.4 0 0114.4 8 .8.8 0 0016 8a7.999 7.999 0 00-8-8z"
        fill={fill}
      />
    </Svg>
  )
}

export {
  TxReinvest,
  Dots,
  Calendar,
  Wallet,
  History,
  CoinsSelect,
  Settings,
  Waves,
  Reward,
  MoneyNotFound,
  Logo,
  Email,
  Key,
  Structure,
  User,
  Users,
  Money,
  Arrow,
  Percent,
  CleanLogo,
  Chevron,
  List,
  MoneySend,
  Cross,
  Reinvest,
  Search,
  Savings,
  TouchIcon,
  Filter,
  Copy,
  KeyboardApply,
  KeyboardBackSpace,
  ArrowInCircle,
  Telegram,
  Chat,
}