import * as Popover from "@radix-ui/react-popover"
import clsx from "clsx"
import dayjs from "dayjs"
import { X } from "phosphor-react"
import { useState } from "react"
import { HabitsList } from "./HabitsList"
import { ProgressBar } from "./ProgressBar"

interface HabitDayProps {
  date: Date
  defaultCompleted?: number
  amount?: number
}

export function HabitDay({
  defaultCompleted = 0,
  amount = 0,
  date,
}: HabitDayProps) {
  const [completed, setCompleted] = useState(defaultCompleted)
  const progressPercentageOnDay =
    amount > 0 ? Math.round((completed / amount) * 100) : 0

  const dayAndMonth = dayjs(date).format("DD/MM")
  const dayOfWeek = dayjs(date).format("dddd")

  function handleCompletedChange(completed: number) {
    setCompleted(completed)
  }

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx(
          "w-10 h-10 rounded-lg cursor-pointer transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-violet-800 focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-zinc-900",
          {
            "bg-zinc-900 border-2 border-zinc-800":
              progressPercentageOnDay === 0,
            "bg-violet-900 border-violet-700":
              progressPercentageOnDay > 0 && progressPercentageOnDay < 20,
            "bg-violet-800 border-violet-600":
              progressPercentageOnDay >= 20 && progressPercentageOnDay < 40,
            "bg-violet-700 border-violet-500":
              progressPercentageOnDay >= 40 && progressPercentageOnDay < 60,
            "bg-violet-600 border-violet-500":
              progressPercentageOnDay >= 60 && progressPercentageOnDay < 80,
            "bg-violet-500 border-violet-400": progressPercentageOnDay >= 80,
          }
        )}
      ></Popover.Trigger>

      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-lg bg-zinc-900 shadow-lg flex flex-col">
          <span className="font-semibold text-zinc-400">{dayOfWeek}</span>
          <span className="mt-1 font-extrabold leading-tight text-3xl">
            {dayAndMonth}
          </span>

          <ProgressBar progress={progressPercentageOnDay} />

          <HabitsList date={date} onCompletedChange={handleCompletedChange} />

          <Popover.Arrow className="fill-current text-violet-500" />
          <Popover.Close className="absolute top-0 right-0 p-4 text-zinc-400 hover:text-gray-300 transition-colors duration-200">
            <X size={15} aria-label="Fechar" />
          </Popover.Close>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
