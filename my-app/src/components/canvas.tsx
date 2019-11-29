import { Box } from "@material-ui/core";
import React from "react";
import cheese from "../assets/images/mapa-hospital.png";

class Canvas extends React.Component {
    componentDidMount() {
      const canvas:any = this.refs.canvas
      const ctx = canvas.getContext("2d")
      const img:any = this.refs.image
      img.onload = () => {
        ctx.drawImage(img, 0, 0,640,425)
        ctx.font = "40px Courier"
        ctx.fillText('Cheese Brie', 210, 75)
      }
    }
    render() {
      return(
        <Box>
          <canvas ref="canvas" width={640} height={425} className="canvas-ref"/>
          <img ref="image" src={cheese} className="hidden" />
        </Box>
      )
    }

    public mostrarUbicacion(){
        this.context.fillStyle = "rgba(255, 0, 0, 0.5)";
        this.context.beginPath();
        this.context.moveTo(121,428);
        this.context.lineTo(145, 313);
        this.context.lineTo(279,447);
        this.context.moveTo(303,333);
        this.context.lineTo(145,313);
        this.context.lineTo(279,447);
        this.context.closePath();
        this.context.fill();
    }
}
export default Canvas