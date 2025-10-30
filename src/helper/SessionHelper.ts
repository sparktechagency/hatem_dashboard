import type { TProfile } from "@/types/user.type";


class SessionHelper {
  setToken(token: string) {
    localStorage.setItem("token", token);
  }

  getToken() {
    if (typeof window !== "undefined" && window.localStorage) {
      return localStorage.getItem("token");
    }
    return "";
  }

  isLoggedIn() {
    const token = getToken();
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  setEmail(email: string) {
    localStorage.setItem("email", email);
  }

  getEmail() {
    return localStorage.getItem("email");
  }

  setUserDetails(details: TProfile) {
    localStorage.setItem("userDetails", JSON.stringify(details));
  }

  getUserDetails(): TProfile | null{
    if (typeof window !== "undefined" && window.localStorage) {
      const data = localStorage.getItem("userDetails");
      return data ? JSON.parse(data) : null;
    }
    return null
  }

  setOtpToken(otpToken: string) {
    localStorage.setItem("otpToken", otpToken);
  }

  getOtpToken() {
    return localStorage.getItem("otpToken");
  }

  setVerifyEmail(email: string) {
    localStorage.setItem("verifyEmail", email);
  }

  getVerifyEmail() {
    if (typeof window !== "undefined" && window.localStorage) {
      return localStorage.getItem("verifyEmail");
    }
  }

  setOtp(otp: string) {
    localStorage.setItem("otp", otp);
  }

  getOtp() {
    return localStorage.getItem("otp");
  }

  setAuthId(authId: string) {
    localStorage.setItem("authId", authId);
  }

  getAuthId() {
    return localStorage.getItem("authId");
  }

  logout() {
    localStorage.clear();
    window.location.href = "/auth/signin";
  }


}





export const { setToken, getToken, setUserDetails, getUserDetails, setEmail, getEmail, setVerifyEmail, getVerifyEmail, setOtp, getOtp, logout, isLoggedIn, setAuthId, getAuthId, setOtpToken, getOtpToken } = new SessionHelper();