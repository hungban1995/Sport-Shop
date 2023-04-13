import { SOCKET_URL, socketConfigs } from "@/constant";
import { io } from "socket.io-client";

export const socket = io(SOCKET_URL, socketConfigs);
