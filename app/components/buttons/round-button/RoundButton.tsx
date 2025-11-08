import React from "react";
import css from "./RoundButton.module.css";

type ButtonOutlinedProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

function ButtonOutlined({
  children,
  ...attr
}: React.PropsWithChildren<ButtonOutlinedProps>) {
  return (
    <div className="w-35 flex items-center justify-center">
      <button className={css.roundButton} {...attr}>
        {children}
      </button>
    </div>
  );
}

ButtonOutlined.propTypes = {};

export default ButtonOutlined;
