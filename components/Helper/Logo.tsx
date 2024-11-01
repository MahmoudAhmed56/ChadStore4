import Image from "next/image"

const Logo = ({width,height}:{width:number;height:number;}) => {
  return (
    <div>
      <Image src={"/images/ChadLogo.png"} width={width} height={height} alt="logo" />
    </div>
  )
}

export default Logo