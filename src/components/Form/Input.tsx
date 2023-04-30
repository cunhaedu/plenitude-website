import { useFormContext } from 'react-hook-form';
import { InputHTMLAttributes } from "react";
import cls from 'classnames';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
}

export function Input(props: InputProps) {
  const { register } = useFormContext()

  return (
    <input
      id={props.name}
      className={cls("disabled:opacity-50 disabled:pointer-events-none", {
        "text-zinc-800 flex-1 rounded border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-violet-500": !['file', 'checkbox'].includes(String(props.type)),
        "text-zinc-800 block w-full text-sm  border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none": props.type === 'file',
        "w-4 h-4 cursor-pointer text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2": props.type === 'checkbox',
      })}
      {...register(props.name)}
      {...props}
    />
  )
}
