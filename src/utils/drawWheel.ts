import { Option } from '../types/types';

const colorsSet = ['#68113F', '#281758', '#784A8E', '#450024', '#14063A', '#5A2971', '#8B2E5F', '#423075', '#9974AA'];

const getColors = (count: number) => {
  const colors: string[] = [];

  for (let i = 0; i < count; i++) {
    colors.push(colorsSet[i % colorsSet.length]);
  }

  if (colors[0] === colors[colors.length - 1]) {
    colors[colors.length - 1] = colorsSet[1];
  }

  return colors;
};

const outsideRadius = 300;
const textRadius = 200;
const smallTextRadius = 170;
const insideRadius = 0;
const startAngle = (270 * Math.PI) / 180;
const convasCenter = 300;

export const drawWheel = (ctx: CanvasRenderingContext2D, options: Option[]) => {
  const arc = Math.PI / (options.length * 0.5);

  ctx.clearRect(0, 0, 600, 600);

  const colors = getColors(options.length);
  for (let i = 0; i < options.length; i++) {
    const angle = startAngle + i * arc;
    const isBigLabel = options[i].value.length > 12 || options.length > 23;

    ctx.fillStyle = colors[i];

    ctx.beginPath();
    ctx.arc(convasCenter, convasCenter, outsideRadius, angle, angle + arc, false);
    ctx.arc(convasCenter, convasCenter, insideRadius, angle + arc, angle, true);
    ctx.fill();

    ctx.save();
    ctx.fillStyle = 'white';
    ctx.translate(
      convasCenter + Math.cos(angle + arc / 2 + 0.034) * (isBigLabel ? smallTextRadius : textRadius),
      convasCenter + Math.sin(angle + arc / 2 + 0.034) * (isBigLabel ? smallTextRadius : textRadius),
    );
    ctx.rotate(angle + arc / 2 + Math.PI / 2 - 1.6);
    ctx.font = isBigLabel ? 'small-caps 22px Arial' : 'small-caps 32px Arial';
    var text = options[i].value;
    ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
    ctx.restore();
  }
};
