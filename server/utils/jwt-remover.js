export const removeToken = async () => {
    return res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Secure in production
        sameSite: "None", // Required for cross-origin cookies
        path: "/", // Ensure it clears across the entire site
    });
}