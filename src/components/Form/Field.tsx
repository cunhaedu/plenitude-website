import { HTMLAttributes } from "react";
import cls from 'classnames';

interface FieldProps extends HTMLAttributes<HTMLDivElement> {
  inline?: boolean;
}

export function Field(props: FieldProps) {
  return (
    <div
      className={cls("flex gap-1", {
        "flex-col": !props.inline,
        "items-center": props.inline
      })}
      {...props}
    />
  )
}
