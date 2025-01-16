import { View, Text } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
export default function Page() {
  return (
    <SafeAreaView className="flex-1 bg-blue-100 rounded-xl">
      <Text className="">Welcome to Tailwind</Text>
    </SafeAreaView>
  );
}
