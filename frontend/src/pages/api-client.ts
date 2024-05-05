import { RegisterFormData } from "./Register";

const API_BASE_URL=import.meta.env.VITE_API_BASE_URL || "http://localhost:7000"

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials:"include",//ANYTIME WE MAKE A POST REQUEST TO THE REGISTER END-POINT THAT, WE WANT TO INCLUDE HTTP COOKIES ALONG WITH THE REQUEST & WE ALSO WANT TO SET ANY COOKIES THAT WE GET BACK FROM THE SERVER ON THE BROWSER
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
