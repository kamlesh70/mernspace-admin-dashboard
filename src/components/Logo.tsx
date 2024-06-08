import logo from '../assets/pizza-logo-Photoroom.png-Photoroom.png';

function Logo({ width, height }: any) {
  return (
    <div>
      <img width={width} height={height} src={logo} />
    </div>
  );
}

export default Logo;
