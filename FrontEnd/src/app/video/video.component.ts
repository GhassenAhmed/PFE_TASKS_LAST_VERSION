import { Component, OnInit } from '@angular/core';
import Peer from 'peerjs';
@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit{

  private peer: Peer;
  peerIdShare!: string;
  peerId!: string;
  private lazyStream:any;
  currentPeer:any
  private peerList:Array<any> = []

  constructor(){
    this.peer=new Peer();
  }



  ngOnInit(): void {
   this.getPeerId()
  }


  private getPeerId = () => {
    //Generate unique Peer Id for establishing connection
        this.peer.on('open', (id) => {
          this.peerId = id;
          //this.createURLToConnect(id);
        });

    // Peer event to accept incoming calls
        this.peer.on('call', (call) => {
          navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
          }).then((stream) => {
            this.lazyStream = stream;

            call.answer(stream);
            call.on('stream', (remoteStream) => {
              if (!this.peerList.includes(call.peer)) {
                this.streamRemoteVideo(remoteStream);
                this.currentPeer = call.peerConnection;
                this.peerList.push(call.peer);
              }
            });

          }).catch(err => {
            console.log(err + 'Unable to get media');
          });
        });
      }

      connectWithPeer():void{
        this.callPeer(this.peerIdShare)
      }

      private callPeer(id: string): void {
        navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        }).then((stream) => {
          this.lazyStream = stream;
          const call = this.peer.call(id, stream);
          call.on('stream', (remoteStream) => {
            if (!this.peerList.includes(call.peer)) {
              this.streamRemoteVideo(remoteStream);
              this.currentPeer = call.peerConnection;
              this.peerList.push(call.peer);
            }
          });
        }).catch(err => {
          console.log(err + 'Unable to connect');
        });
      }

      private streamRemoteVideo(stream:any) {
        const remoteVideoContainer = document.getElementById('video');
        if (remoteVideoContainer) {
          // Continue with video element creation and appending
          console.log('Before creating video element');
          const video = document.createElement('video');
          console.log('After creating video element');
          video.classList.add('video');
          video.srcObject = stream;
          video.play();
          remoteVideoContainer.append(video);
        } else {
          console.error('Remote video container not found in the DOM.');
        }
        console.log('After creating video element');
      }

      screenShare(){
        this.shareScreen();
      }

      private shareScreen(): void {
        // @ts-ignore
        navigator.mediaDevices.getDisplayMedia({
          video: {
            // @ts-ignore
            cursor: 'always'
          },
          audio: {
            echoCancellation: true,
            noiseSuppression: true
          }
        } as MediaStreamConstraints).then(stream => {
          const videoTrack = stream.getVideoTracks()[0];
          videoTrack.onended = () => {
            this.stopScreenShare();
          };
          if (this.currentPeer) {
            const sender = this.currentPeer.getSenders().find((s: RTCRtpSender) => s.track?.kind === videoTrack.kind);

            console.log(sender);
            if (sender) {
              sender.replaceTrack(videoTrack);
            } else {
              console.error('Video sender not found.');
            }
          } else {
            console.error('CurrentPeer is not initialized.');
          }
        }).catch(err => {
          console.log('Unable to get display media ' + err);
        });
      }


      private stopScreenShare() {
        const videoTrack = this.lazyStream.getVideoTracks()[0];
        const sender = this.currentPeer.getSenders().find((s: { track: MediaStreamTrack }) => s.track?.kind === videoTrack.kind);
        sender.replaceTrack(videoTrack);
      }
}
