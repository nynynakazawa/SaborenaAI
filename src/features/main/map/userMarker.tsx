import React, { useState, useEffect } from "react";
import { Image, View } from "react-native";
import { styled } from "nativewind";
import { CurrentData } from "../../../types/userDataTypes";
import { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useSelector } from "react-redux";
import UserModal from "../../../components/userModal/userModal";
import { RootState } from "../../../store/store";

const StyledView = styled(View);
const StyledImage = styled(Image);

const UserMarker = ({
  uid,
  currentData,
}: {
  uid: string;
  currentData: CurrentData | null;
}) => {
  const location: Location.LocationObject | null = useSelector(
    (state: RootState) => state.location.value
  );
  const myUid: string | null = useSelector((state: RootState) => state.myUid.value);
  const gender = currentData?.gender;
  const isGps: boolean = useSelector((state: RootState) => state.isGps.value);
  const [isVisibleUserModal, setIsVisibleUserModal] = useState<boolean>(false);

  // State to manage the marker's coordinates
  const [coords, setCoords] = useState({
    latitude: uid === myUid ? location?.coords.latitude || 0 : currentData?.latitude || 0,
    longitude: uid === myUid ? location?.coords.longitude || 0 : currentData?.longitude || 0,
  });

  // Linearly interpolate between old and new coordinates over 0.3 seconds
  useEffect(() => {
    const newCoords = uid === myUid
      ? {
          latitude: location?.coords.latitude || 0,
          longitude: location?.coords.longitude || 0,
        }
      : {
          latitude: currentData?.latitude || 0,
          longitude: currentData?.longitude || 0,
        };

    // If the new coordinates differ, transition smoothly to the new position
    if (
      newCoords.latitude !== coords.latitude ||
      newCoords.longitude !== coords.longitude
    ) {
      // Start animation only if coordinates are different
      const startLatitude = coords.latitude;
      const startLongitude = coords.longitude;
      const endLatitude = newCoords.latitude;
      const endLongitude = newCoords.longitude;
      const duration = 300; // 0.3 seconds
      const interval = 10; // Interval time for updating (smoothness)
      const steps = duration / interval;
      let currentStep = 0;

      const animate = () => {
        currentStep += 1;
        const progress = currentStep / steps;

        const interpolatedLatitude = startLatitude + (endLatitude - startLatitude) * progress;
        const interpolatedLongitude = startLongitude + (endLongitude - startLongitude) * progress;

        setCoords({
          latitude: interpolatedLatitude,
          longitude: interpolatedLongitude,
        });

        if (currentStep < steps) {
          setTimeout(animate, interval);
        } else {
          // Ensure final position is set after the animation completes
          setCoords(newCoords);
        }
      };

      animate();
    }
  }, [location, currentData, uid]);

  let frameColor;
  if (uid === myUid) {
    frameColor = "bg-[#ffc179]";
  } else if (gender === "male") {
    frameColor = "bg-[#79C7FF]";
  } else if (gender === "female") {
    frameColor = "bg-[#F479FF]";
  } else {
    frameColor = "bg-[#79FF82]";
  }

  return (
    <Marker
      coordinate={coords}
      style={{ width: 52, height: 60, paddingBottom: 40 }}
      onPress={() => setIsVisibleUserModal(!isVisibleUserModal)}
    >
      <StyledView className={`flex h-[60px] w-max ${uid === myUid && !isGps && "opacity-60"}`}>
        <StyledView className={`flex h-[52px] w-[52px] items-center justify-center rounded-[14px] ${frameColor}`}>
          <StyledImage
            source={{ uri: currentData?.main_image_url || undefined }}
            style={{ width: 42, height: 42, borderRadius: 10 }}
          />
        </StyledView>
        <StyledView className="absolute bottom-[5px] z-[-5] flex w-full items-center">
          <StyledView className={`h-[20px] w-[20px] rotate-[45deg] ${frameColor}`} />
        </StyledView>
      </StyledView>

      {isVisibleUserModal && (
        <UserModal uid={uid} visible={isVisibleUserModal} onClose={() => setIsVisibleUserModal(false)} />
      )}
    </Marker>
  );
};

export default UserMarker;
