import { RegisterFormData } from "./Register";
import { SignInFormData } from "./SignIn";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include", //ANYTIME WE MAKE A POST REQUEST TO THE REGISTER END-POINT THAT, WE WANT TO INCLUDE HTTP COOKIES ALONG WITH THE REQUEST & WE ALSO WANT TO SET ANY COOKIES THAT WE GET BACK FROM THE SERVER ON THE BROWSER
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include", //ANYTIME WE MAKE A POST REQUEST TO THE REGISTER END-POINT THAT, WE WANT TO INCLUDE HTTP COOKIES ALONG WITH THE REQUEST & WE ALSO WANT TO SET ANY COOKIES THAT WE GET BACK FROM THE SERVER ON THE BROWSER
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Token invalid");
  }
  return response.json();
};

export const signout = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include", //ANYTIME WE MAKE A POST REQUEST TO THE REGISTER END-POINT THAT, WE WANT TO INCLUDE HTTP COOKIES ALONG WITH THE REQUEST & WE ALSO WANT TO SET ANY COOKIES THAT WE GET BACK FROM THE SERVER ON THE BROWSER
  });

  if (!response.ok) {
    throw new Error("Error during sign out");
  }
}