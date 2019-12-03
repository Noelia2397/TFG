import { Box } from "@material-ui/core";
import React from "react";
import cheese from "../../assets/images/mapa-hospital.png";
import { CanvasDto } from "./canvas-dto";

class Canvas extends React.Component<CanvasDto> {
  constructor (props: any){
    super(props);
    
    this.state = {
      start1x: '',
      start1y: '',
      start2x: '',
      start2y: '',
      coor1x: '',
      coor1y:'',
      coor2x: '',
      coor2y:'',
    };
  }
  componentDidMount() {
    const canvas:any = this.refs.canvas
    const ctx = canvas.getContext("2d")
    const img:any = this.refs.image
    img.onload = () => {
      ctx.drawImage(img, 0, 0,800,600)
      ctx.font = "40px Courier"
      ctx.fillText('Cheese Brie', 210, 75)
      ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
      ctx.beginPath();
      ctx.moveTo(this.props.start1x,this.props.start1y);
      ctx.lineTo(this.props.coor1x, this.props.coor1y);
      ctx.lineTo(this.props.coor2x, this.props.coor2y);
      ctx.moveTo(this.props.start2x, this.props.start2y);
      ctx.lineTo(this.props.coor1x, this.props.coor1y);
      ctx.lineTo(this.props.coor2x, this.props.coor2y);
      ctx.closePath();
      ctx.fill();
    }
  }
  render() {
    return(
      <Box>
        <canvas ref="canvas" width={800} height={600} className="canvas-ref"/>
        <img ref="image" src={cheese} className="hidden" />
      </Box>
    )
  }
}
export default Canvas