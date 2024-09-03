import React from "react";
import { TouchableOpacity, View } from "react-native";
import { styled } from "nativewind";
import Icon from "react-native-vector-icons/Entypo";
import { useRouter } from "expo-router";
import { UserData } from "../../types/userDataTypes";

const StyledView = styled(View);
const StyledTouchableOpacity = styled(TouchableOpacity);

const SendMessageButton = ({
  userData,
  uid,
  setIsVisibleUserModal,
}: {
  userData: UserData | null;
  uid: string;
  setIsVisibleUserModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // * ################################################################################## *
  const router = useRouter();

  // メッセージ送信処理
  const handleSendMessage = async () => {
    setIsVisibleUserModal(false);

    router.push({
      pathname: "/talkList/talkPage",
      params: { uid: uid, name: userData?.name },
    });
  };

  return (
    <StyledTouchableOpacity
      onPress={() => handleSendMessage()}
      className="absolute bottom-[8%] right-[8%] z-[200] gap-[20px]"
    >
      <StyledView className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#448FFF] shadow-2xl">
        <Icon name="mail" size={30} color="#fff" />
      </StyledView>
    </StyledTouchableOpacity>
  );
};

export default SendMessageButton;
