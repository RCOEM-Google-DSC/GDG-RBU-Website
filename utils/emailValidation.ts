export const validateEmail = async (email: string): Promise<boolean> => {
  try {
    const response = await fetch(
      `https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.NEXT_PUBLIC_ABSTRACT_API_KEY}&email=${email}`
    );

    const data = await response.json();
    const { is_valid_format, deliverability } = data;

    return is_valid_format.value && deliverability === "DELIVERABLE";
  } catch (error) {
    console.error("Email validation error:", error);
    return false;
  }
};
