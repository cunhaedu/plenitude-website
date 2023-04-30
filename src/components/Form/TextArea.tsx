import { TextareaHTMLAttributes } from "react";
import { useFormContext } from 'react-hook-form'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string
}

export function TextArea(props: TextAreaProps) {
  const { register } = useFormContext()

  return (
    <textarea
      id={props.name}
      className="flex-1 rounded border border-gray-300 shadow-sm px-3 py-2 text-zinc-800 focus:outline-none focus:ring-1 focus:ring-violet-500"
      {...register(props.name)}
      {...props}
    />
  )
}
