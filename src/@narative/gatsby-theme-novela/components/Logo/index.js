import React from 'react';

/**
 * Paste in your SVG logo and return it from this component.
 * Make sure you have a height set for your logo.
 * It is recommended to keep the height within 25-35px.
 * Logo comes with a property vallue called `fill`. `fill` is useful 
 * when you want to change your logo depending on the theme you are on. 
 */
export default function Logo({ fill }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64px" height="64px"><path fill="#f9e3ae" d="M48.52,23.15a17.5,17.5,0,1,0-35-.29C13.47,29,17.22,34.57,22,39.15V41a4,4,0,0,0,4,4H36a4,4,0,0,0,4-4V39.09C44.75,34.63,48.47,29.16,48.52,23.15Z"/><path fill="#faefde" d="M17.18,15.05a2.47,2.47,0,0,0,3.67-.16,13,13,0,0,1,20.23-.08,2.47,2.47,0,0,0,3.66.15h0a2.51,2.51,0,0,0,.15-3.37A18,18,0,0,0,17,11.69a2.51,2.51,0,0,0,.16,3.36Z"/><path fill="#acb7d0" d="M29 57H33V60H29z" transform="rotate(180 31 58.5)"/><path fill="#c2cde7" d="M29,45h4a6,6,0,0,1,6,6v6a0,0,0,0,1,0,0H23a0,0,0,0,1,0,0V51A6,6,0,0,1,29,45Z" transform="rotate(180 31 51)"/><path fill="#8d6c9f" d="M8 23a1 1 0 0 0-1-1H1a1 1 0 0 0 0 2H7A1 1 0 0 0 8 23zM61 22H55a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2zM8.37 31.06l-3.71 1.5a1 1 0 1 0 .75 1.85l3.71-1.5a1 1 0 0 0-.75-1.85zM53.25 15a1 1 0 0 0 .37-.07l3.71-1.5a1 1 0 0 0-.75-1.85l-3.71 1.5A1 1 0 0 0 53.25 15zM9.12 13.08l-3.71-1.5a1 1 0 1 0-.75 1.85l3.71 1.5a1 1 0 0 0 .75-1.85zM57.34 32.56l-3.71-1.5a1 1 0 1 0-.75 1.85l3.71 1.5a1 1 0 0 0 .75-1.85zM34.29 26.29l-4 4A1 1 0 0 0 30 31v6a1 1 0 0 0 2 0V31.41l3.71-3.71a1 1 0 0 0-1.41-1.41z"/><path fill="#8d6c9f" d="M31,4A19,19,0,0,0,12,23c0,5,2.78,8.69,5.47,12.28C19.62,38.16,21.65,40.89,22,44h0v7a7,7,0,0,0,6,6.92V59a2,2,0,0,0,2,2h2a2,2,0,0,0,2-2V57.92A7,7,0,0,0,40,51V44.9c0-3.5,2.22-6.47,4.57-9.62C47.24,31.69,50,28,50,23A19,19,0,0,0,31,4ZM24,46H38v1.12L24,48.87Zm8,13H30V58h2Zm1-3H29a5,5,0,0,1-5-5v-.12l14-1.75V51s0,.08,0,.12L27.83,52.39a1,1,0,0,0,.12,2h.13l9.39-1.17A5,5,0,0,1,33,56ZM43,34.09c-2.24,3-4.56,6.13-4.92,9.85H32V41a1,1,0,0,0-2,0v2.94H24c-.36-3.73-2.69-6.84-5-9.86C16.58,30.75,14,27.31,14,23a17,17,0,0,1,34,0C48,27.31,45.44,30.76,43,34.09Z"/><path fill="#8d6c9f" d="M29.71 28.29l-2-2a1 1 0 0 0-1.41 1.41l2 2a1 1 0 0 0 1.41-1.41zM38.23 11a1 1 0 0 0-1 1.71 12 12 0 0 1 2.28 1.79A1 1 0 0 0 40.9 13.1 14 14 0 0 0 38.23 11zM33.18 11.2a1 1 0 0 0 .36-2A13.94 13.94 0 0 0 23.31 11.3 1 1 0 0 0 24.41 13 12 12 0 0 1 33.18 11.2z"/></svg>
  );
}