interface ProgressBarProps {
  progress: number
}

export function ProgressBar(props: ProgressBarProps) {
  return (
    <div className="h-3 rounded-xl bg-zinc-700 w-full mt-4">
      <div
        role="progressbar"
        aria-label="Progresso do hábitos completados nesse dia"
        aria-valuenow={props.progress}
        className="h-full rounded-xl bg-violet-500
        transition-all duration-200 ease-in-out
        "
        style={{ width: `${props.progress}%` }}
      ></div>
    </div>
  )
}
