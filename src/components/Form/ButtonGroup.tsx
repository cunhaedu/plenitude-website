import { HTMLAttributes } from "react";

interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {}

export function ButtonGroup(props: ButtonGroupProps) {
  return (
    <div className="flex flex-col-reverse sm:flex-row justify-end px-6 py-3 mt-3 sm:mt-0 sm:px-0 sm:flex gap-2" {...props} />
  )
}
