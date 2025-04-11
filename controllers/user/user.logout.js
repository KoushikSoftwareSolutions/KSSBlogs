const logout = (req, res) => {
      res.clearCookie("auth", {
        path: "/",
        sameSite: "None",
        secure: true,
        httpOnly: true,
      });
      return res.json({ success: true, message: "Logged out successfully" });
    };
    
    export default logout;
    