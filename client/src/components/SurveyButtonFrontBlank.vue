<template>
    <div>
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1027.32 233.32">
      <defs>
        <radialGradient id="radial-gradient-front" cx="513.66" cy="80.17" fx="513.66" fy="-425.4" r="1524.58" gradientTransform="translate(0 72.73) scale(1 .09)" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#cff3ff"/>
          <stop offset=".03" stop-color="#c5edff"/>
          <stop offset=".22" stop-color="#87c8ff"/>
          <stop offset=".36" stop-color="#60b1ff"/>
          <stop offset=".43" stop-color="#52a9ff"/>
          <stop offset=".53" stop-color="#4fa6fd"/>
          <stop offset=".58" stop-color="#489ef7"/>
          <stop offset=".62" stop-color="#3b90ed"/>
          <stop offset=".66" stop-color="#297ddf"/>
          <stop offset=".66" stop-color="#2679dd"/>
          <stop offset="1" stop-color="#054872"/>
        </radialGradient>
        <radialGradient id="radial-gradient-front-front-2" cx="513.66" cy="116.66" fx="513.66" fy="116.66" r="364.04" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#2771c1" stop-opacity="0"/>
          <stop offset="1" stop-color="#275ac1"/>
        </radialGradient>
        <radialGradient id="radial-gradient-front-3" cx="513.66" cy="116.66" fx="513.66" fy="116.66" r="372.46" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#fff"/>
          <stop offset=".29" stop-color="#e6d9ca"/>
          <stop offset=".45" stop-color="#c2bcb4"/>
          <stop offset=".64" stop-color="#9e9e9e"/>
          <stop offset=".7" stop-color="#8f8f8f"/>
          <stop offset=".8" stop-color="#7b7b7b"/>
          <stop offset=".9" stop-color="#6f6f6f"/>
          <stop offset="1" stop-color="#6b6b6b"/>
        </radialGradient>
        <radialGradient id="radial-gradient-front-4" cx="521.53" cy="53.29" fx="521.53" fy="53.29" r="168.49" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#fff"/>
          <stop offset=".02" stop-color="#f3f8fb"/>
          <stop offset=".08" stop-color="#c7dfef"/>
          <stop offset=".14" stop-color="#a5cce5"/>
          <stop offset=".2" stop-color="#8cbede"/>
          <stop offset=".25" stop-color="#7eb5da"/>
          <stop offset=".29" stop-color="#79b3d9"/>
          <stop offset=".67" stop-color="#0069b0"/>
          <stop offset=".86" stop-color="#0c4f7f"/>
          <stop offset="1" stop-color="#173c5a"/>
        </radialGradient>
        <radialGradient id="radial-gradient-front-5" cx="518.33" cy="56.55" fx="518.33" fy="56.55" r="148.78" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#fff"/>
          <stop offset=".02" stop-color="#f3f8fb"/>
          <stop offset=".1" stop-color="#c7dfef"/>
          <stop offset=".17" stop-color="#a5cce5"/>
          <stop offset=".24" stop-color="#8cbede"/>
          <stop offset=".31" stop-color="#7eb5da"/>
          <stop offset=".36" stop-color="#79b3d9"/>
          <stop offset=".85" stop-color="#0069b0"/>
          <stop offset=".91" stop-color="#014b7f"/>
          <stop offset="1" stop-color="#051b30"/>
        </radialGradient>
        <radialGradient id="radial-gradient-front-6" cx="521.53" cy="66.39" fx="368.97" fy="66.39" r="152.6" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#fff"/>
          <stop offset=".03" stop-color="#f3f8fb"/>
          <stop offset=".15" stop-color="#c7dfef"/>
          <stop offset=".27" stop-color="#a5cce5"/>
          <stop offset=".38" stop-color="#8cbede"/>
          <stop offset=".48" stop-color="#7eb5da"/>
          <stop offset=".57" stop-color="#79b3d9"/>
          <stop offset=".85" stop-color="#0069b0"/>
          <stop offset=".91" stop-color="#014b7f"/>
          <stop offset="1" stop-color="#051b30"/>
        </radialGradient>
        <filter id="luminosity-noclip" x="407.25" y="31.05" width="231" height="159" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse">
          <feFlood flood-color="#fff" result="bg"/>
          <feBlend in="SourceGraphic" in2="bg"/>
        </filter>
        <mask id="mask" x="407.25" y="31.05" width="231" height="159" maskUnits="userSpaceOnUse">
          <g class="cls-8">
            <image width="231" height="159" transform="translate(407.25 31.05)" xlink:href="data:image/png;base64,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"/>
          </g>
        </mask>
        <radialGradient id="radial-gradient-front-7" cx="519.86" cy="55.38" fx="519.86" fy="55.38" r="86.22" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#fff"/>
          <stop offset="1" stop-color="#c0c9db"/>
        </radialGradient>
        <filter id="luminosity-noclip-2" x="368.25" y="-7.95" width="309" height="237" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse">
          <feFlood flood-color="#fff" result="bg"/>
          <feBlend in="SourceGraphic" in2="bg"/>
        </filter>
        <mask id="mask-1" x="368.25" y="-7.95" width="309" height="237" maskUnits="userSpaceOnUse">
          <g class="cls-5">
            <image width="231" height="159" transform="translate(407.25 31.05)" xlink:href="data:image/png;base64,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"/>
          </g>
        </mask>
        <clipPath id="clippath">
          <ellipse class="cls-1" cx="522.32" cy="110.58" rx="112.95" ry="76.94"/>
        </clipPath>
        <radialGradient id="radial-gradient-front-8" cx="522.32" cy="110.58" fx="588.79" fy="57.98" r="103.72" gradientTransform="translate(0 32.84) scale(1 .7)" gradientUnits="userSpaceOnUse">
          <stop offset=".13" stop-color="#1b5087"/>
          <stop offset="1" stop-color="#000f28"/>
        </radialGradient>
        <radialGradient id="radial-gradient-front-9" cx="522.32" cy="110.58" fx="522.32" fy="110.58" r="96.16" gradientUnits="userSpaceOnUse">
          <stop offset=".81" stop-color="#1b5087"/>
          <stop offset="1" stop-color="#000f28"/>
        </radialGradient>
      </defs>
      <g class="cls-18">
        <g id="Layer_1" data-name="Layer 1">
          <g>
            <rect class="cls-17" x="10" y="10" width="1007.32" height="213.32"/>
            <image width="1029" height="235" transform="translate(-.75 -.95)" xlink:href="data:image/png;base64,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"/>
          </g>
          <rect class="cls-13" x="10" y="10" width="1007.32" height="213.32" />
        </g>
      </g>
    </svg>
    </div>
    </template>
    
    <style scoped>
        .cls-1 {
            fill: none;
        }
    
          .cls-2 {
            fill: url(#radial-gradient-front-5);
          }
    
          .cls-2, .cls-3, .cls-4 {
            mix-blend-mode: multiply;
          }
    
          .cls-5 {
            filter: url(#luminosity-noclip-2);
          }
    
          .cls-6 {
            clip-path: url(#clippath);
          }
    
          .cls-7 {
            mask: url(#mask);
          }
    
          .cls-8 {
            filter: url(#luminosity-noclip);
          }
    
          .cls-9, .cls-10 {
            fill: #fff;
          }
    
          .cls-11 {
            fill: url(#radial-gradient-front-8);
            mix-blend-mode: hard-light;
          }
    
          .cls-12, .cls-13 {
            mix-blend-mode: overlay;
          }
    
          .cls-14 {
            fill: url(#radial-gradient-front-4);
          }
    
          .cls-15 {
            fill: url(#radial-gradient-front-9);
          }
    
          .cls-16 {
            fill: url(#radial-gradient-front-7);
          }
    
          .cls-13 {
            fill: url(#radial-gradient-front-2);
            stroke: url(#radial-gradient-front-3);
            stroke-miterlimit: 10;
            stroke-width: 20px;
          }
    
          .cls-4 {
            fill: url(#radial-gradient-front-6);
            opacity: .45;
          }
    
          .cls-10 {
            @apply font-sans font-black;
            font-size: 140px;
          }
    
          .cls-17 {
            fill: url(#radial-gradient-front);
          }
    
          .cls-18 {
            isolation: isolate;
          }
    
          .cls-19 {
            mask: url(#mask-1);
          }
    </style>