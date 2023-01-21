import { useNavigation } from "@react-navigation/native"
import { Text } from "react-native"

export function HabitsEmpty() {
  const { navigate } = useNavigation()
  return (
    <Text>
      <Text className="text-white text-2xl font-semibold">
        Nenhum hábito cadastrado ainda.
        <Text
          className="text-violet-400 text-base underline active:opacity-70"
          onPress={() => navigate("New")}
        >
          {" "}
          Crie um agora!
        </Text>
      </Text>
    </Text>
  )
}
