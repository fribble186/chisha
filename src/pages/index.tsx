import React, { useState, useEffect } from 'react';
import styles from './index.less';
import './index.css';
import rough from 'roughjs';
import { Button } from 'antd';

const FOODS: string[] = (new Array(20)).fill(null).map((_, index) => index.toString());
const TIMES: number[] = (new Array(10))
  .fill(0.2)
  .concat((new Array(30))
    .fill(null)
    .map((_, index) => (0.3 + 0.2 + 0.1 * (index + 1)) * (index + 1) / 2 > 3
      ? undefined
      : (0.2 + 0.1 * (index + 1)).toFixed(1))).filter(Boolean);

const getStringWidth = (str: string) => str.split('').reduce((total: number, cur: string) => cur.charCodeAt(0) > 255 ? total + 2 : total + 1, 0);

export default function IndexPage() {
  const [randomTime, setRandomTime] = useState<number>(-1);
  const [randomIndex, setRandomIndex] = useState<number>(-1);
  useEffect(() => {
    if (randomTime !== -1)
    setTimeout(() => {
      setRandomTime(cur => cur + 1 > TIMES.length - 1 ? -1 : cur + 1)
      setRandomIndex(Math.floor(Math.random()*FOODS.length))
    }, TIMES[randomTime] * 1000)
  }, [randomTime, setRandomTime, setRandomIndex])

  const generateSvg = ({ ref, text, borderColor = 'black', backgroundColor = 'white' }:
    { ref: SVGSVGElement | null, text: string, borderColor?: string, backgroundColor?: string }) => {
    if (ref) {
      if (ref.childNodes.length) ref.removeChild(ref.childNodes[0]);
      const rs = rough.svg(ref);
      let node: SVGGElement | undefined;
      node = rs.rectangle(2, 2, ref.clientWidth - 2, ref.clientHeight - 2, {
        fillStyle: 'solid',
        fill: backgroundColor,
        stroke: borderColor,
      });
      if (node) {
        ref.appendChild(node);
      }
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.dishesContainer}>
        {FOODS.map((food, foodIndex) => <div
          key={food}
          className={`${styles.dish} ${foodIndex === randomIndex ? 'scaleAnimation' : ''}`}
          style={{ width: 50 + getStringWidth(food) * 14, height: 35, animationDuration: `${TIMES[randomTime]}s` }}
        >
          <span>{food}</span>
          <svg ref={ref => generateSvg({ ref, text: food })} style={{ width: 50 + getStringWidth(food) * 14, height: 35 }} />
        </div>)}
      </div>
        <Button type="primary" disabled={randomTime !== -1} onClick={() => setRandomTime(0)}>吃啥</Button>
    </div>
  );
}
