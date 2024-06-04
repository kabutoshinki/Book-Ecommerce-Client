import { v4 as uuidv4 } from "uuid";
export const generateDeviceId = () => {
  // Check if device ID exists in localStorage
  let deviceId = localStorage.getItem("deviceId");
  if (!deviceId) {
    // Generate a new device ID
    deviceId = `guest-${uuidv4()}`;
    // Store the device ID in localStorage
    localStorage.setItem("deviceId", deviceId);
  }
  return deviceId;
};
