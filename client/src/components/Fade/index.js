import React from "react";
import { useTransition, animated } from "react-spring";

const FROM_STYLE = { opacity: 0 };
const TO_STYLE = { opacity: 1 };

export default function FadeTransition(props) {
  const { children, useChildren, keys } = props;

  const transitions = useTransition(children, keys, {
    from: FROM_STYLE,
    enter: TO_STYLE,
    leave: FROM_STYLE,
    config: {
      duration: 800
    }
  });

  return transitions.map(({ item, props, key }) =>
    item ? (
      <animated.div style={props} key={key}>
        {useChildren ? children : item}
      </animated.div>
    ) : null
  );
}
