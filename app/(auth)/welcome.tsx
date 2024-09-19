import { router } from "expo-router";
import { useRef, useState } from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import { onboarding as onboardingData } from "@/constants"; // Import your onboarding data
import CustomButton from "@/components/CustumButton";

const Onboarding = () => {
  const SwiperRef = useRef<Swiper>(null);
  const [activeIndex, SetActiveIndex] = useState<number>(0); // Initial value set to 0

  const isLastSlide = activeIndex === onboardingData.length - 1;

  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      {/* Skip Button */}
      <TouchableOpacity
        onPress={() => {
          router.replace("/(auth)/sign-up");
        }}
        className="w-full justify-end items-end p-5"
      >
        <Text className="text-black text-md font-JakartaBold">Skip</Text>
      </TouchableOpacity>

      {/* Swiper Component */}
      <Swiper
        ref={SwiperRef}
        loop={false}
        dot={<View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0]" />}
        activeDot={<View className="w-[32px] h-[4px] mx-1 bg-[#0286FF]" />}
        onIndexChanged={(index) => SetActiveIndex(index)}
      >
        {onboardingData.map((item) => (
          <View key={item.id} className="flex-1  p-5">
            <Image
              source={item.image}
              className="w-full h-[300px]"
              resizeMode="contain"
            />
            <View className="flex flex-row items-center justify-center w-full mt-10">
              <Text className="text-black text-3xl font-bold mx-10 text-center">
                {item.title}
              </Text>
            </View>
            <Text className="text-md font-JakartaSemiBold text-center text-[#858585] mx-10 mt-3">
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>

      {/* Next/Get Started Button */}
      <CustomButton
        title={isLastSlide ? "Get Started" : "Next"}
        onPress={
          () =>
            isLastSlide
              ? router.replace("/(auth)/sign-up")
              : SwiperRef.current?.scrollBy(1) // Scroll to the next slide
        }
        className="w-11/12 mt-10 mb-5"
      />
    </SafeAreaView>
  );
};

export default Onboarding;
