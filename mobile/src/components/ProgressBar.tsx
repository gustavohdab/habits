import { useEffect } from "react"
import { View } from "react-native"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"

interface ProgressBarProps {
  progress?: number
}

export function ProgressBar({ progress = 0 }: ProgressBarProps) {
  const progressValue = useSharedValue(progress)
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${progressValue.value}%`,
    }
  })

  useEffect(() => {
    progressValue.value = withTiming(progress, { duration: 500 })
  }, [progress])
  return (
    <View className="w-full h-3 rounded-xl bg-zinc-700 mt-4">
      <Animated.View
        className="h-full rounded-xl bg-violet-500"
        style={animatedStyle}
      />
    </View>
  )
}
