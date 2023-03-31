import { io } from "socket.io-client";
import { socketConfigs, SOCKET_URL } from "../constants";

export const socket = io(SOCKET_URL, socketConfigs);
