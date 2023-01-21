import * as Checkbox from "@radix-ui/react-checkbox"
import dayjs from "dayjs"
import { Check } from "phosphor-react"
import { useEffect, useState } from "react"
import { api } from "../lib/axios"

interface HabitsListProps {
  date: Date
  onCompletedChange?: (completed: number) => void
}

interface HabitsInfo {
  possibleHabits: Array<{
    id: string
    title: string
    created_at: string
  }>
  completedHabits: string[]
}

export function HabitsList({ date, onCompletedChange }: HabitsListProps) {
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>()

  useEffect(() => {
    api
      .get("day", {
        params: {
          date: date.toISOString(),
        },
      })
      .then((response) => {
        setHabitsInfo(response.data)
      })
  }, [])

  async function handleToggleHabit(habitId: string) {
    await api.patch(`/habits/${habitId}/toggle`)

    const isHabitAlreadyCompleted =
      habitsInfo!.completedHabits.includes(habitId)
    let completedHabits: string[] = []

    if (isHabitAlreadyCompleted) {
      completedHabits = habitsInfo!.completedHabits.filter(
        (habit) => habit !== habitId
      )
    } else {
      completedHabits = [...habitsInfo!.completedHabits, habitId]
    }

    setHabitsInfo({ ...habitsInfo!, completedHabits })
    onCompletedChange?.(completedHabits.length)
  }

  const isDayInPast = dayjs(date).endOf("day").isBefore(new Date())

  return (
    <div className="mt-6 flex flex-col gap-3">
      {habitsInfo?.possibleHabits.map((habit) => (
        <Checkbox.Root
          key={habit.id}
          onCheckedChange={() => handleToggleHabit(habit.id)}
          checked={habitsInfo.completedHabits.includes(habit.id)}
          disabled={isDayInPast}
          className="flex items-center gap-3 group
          focus:outline-none
          disabled:cursor-not-allowed disabled:opacity-50
          "
        >
          <div
            className="h-8 w-8 rounded-lg flex items-center justify-center border-2 border-zinc-800 mr-4
              group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 group-focus:ring-2 group-focus:ring-violet-700 group-focus:ring-opacity-50 group-focus:ring-offset-2 group-focus:ring-offset-zinc-900"
          >
            <Checkbox.Indicator>
              <Check size={20} className="text-white" />
            </Checkbox.Indicator>
          </div>

          <span
            className="font-semibold text-xl text-white leading-tight
              group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400
              "
          >
            {habit.title}
          </span>
        </Checkbox.Root>
      ))}
    </div>
  )
}