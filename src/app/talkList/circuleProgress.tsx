import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";

interface CircleProgressProps {
  timeString: string; // 例: "0時間2分"
  totalMinutes: number; // 例: 180
  size?: number;
  strokeWidth?: number;
  strokeColor?: string;
  backgroundColor?: string;
}

export const CircleProgress: React.FC<CircleProgressProps> = ({
  timeString = "0時間0分",
  totalMinutes,
  size = 64,
  strokeWidth = 5,
  strokeColor = "#e3422e",
  backgroundColor = "#F6FBF6",
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // `timeString` を分に変換する関数
  const parseTimeString = (timeString: string) => {
    const regex = /(\d+)時間(\d+)分/;
    const match = timeString.match(regex);
    if (match) {
      const hours = parseInt(match[1], 10);
      const minutes = parseInt(match[2], 10);
      return hours * 60 + minutes;
    }
    return 0;
  };

  // `timeString` を分に変換
  const currentMinutes = parseTimeString(timeString);
  const progressPercent = (currentMinutes / totalMinutes) * 100;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  // 時間をhh:mmフォーマットに変換
  const formatTime = (minutes: number) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: [{ rotate: "-90deg" }] }}>
        <Circle
          r={radius}
          cx={size / 2}
          cy={size / 2}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          r={radius}
          cx={size / 2}
          cy={size / 2}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </Svg>
      <Text style={styles.timeText}>{formatTime(currentMinutes)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  timeText: {
    position: "absolute",
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
  },
});
