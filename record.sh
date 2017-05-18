#!/bin/bash
rm /home/pi/webcam/show/public/*h264
rm /home/pi/webcam/show/public/*mp4
# Capture 30 seconds of raw video at 640x480 and 150kB/s bit rate into a pivideo.h264 file:
raspivid -t 10000 -w 640 -h 480 -fps 25 -b 1200000 -p 0,0,640,480 -o /home/pi/webcam/show/public/pivideo.h264 
chmod 777 /home/pi/webcam/show/public/*

# Wrap the raw video with an MP4 container: 
MP4Box -add /home/pi/webcam/show/public/pivideo.h264 /home/pi/webcam/show/public/pivideo.mp4
# Remove the source raw file, leaving the remaining pivideo.mp4 file to play
