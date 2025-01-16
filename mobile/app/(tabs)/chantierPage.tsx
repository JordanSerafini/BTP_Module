import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChantierPage() {
  return (
    <SafeAreaView className="w-screen h-screen bg-gray-200">
      {/* Chantiers en cours */}
      <View className="h-2.5/10">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="bg-white m-4 flex-row"
          contentContainerStyle={{
            alignItems: 'center', 
          }}
        >
          {Array.from({ length: 20 }).map((_, index) => (
            <Text
              key={index}
              className="text-center mx-2 bg-blue-200 p-2 rounded"
            >
              test {index + 1}
            </Text>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
