import { LoginFieldType } from "../../types";
import apiClient from "../client";

export const login = (credentials: LoginFieldType) => apiClient.post('/auth/login', credentials);