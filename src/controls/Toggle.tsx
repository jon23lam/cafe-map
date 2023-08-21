import React, { FunctionComponent, SVGProps, useState } from 'react';
import classNames from 'classnames';

import "./Toggle.scss"

type ToggleProps = {
  text: string,
  icon: JSX.Element
  onClick: (type: string) => void;
}

export function Toggle({ text, icon, onClick }: ToggleProps) {
  
  const [toggled, setToggled] = useState<boolean>(false)

  function onToggleChange() {
    setToggled(!toggled)
    onClick(text)
  }

  const headerClassName = classNames('Toggle', {
    'active': toggled,
  });

  return (
    <div className={headerClassName} onClick={onToggleChange}>
      <div className="Toggle__icon">
        {icon}
      </div>
      <div className="Toggle__text">
        {text}
      </div>
    </div>
  );
}

export default Toggle;