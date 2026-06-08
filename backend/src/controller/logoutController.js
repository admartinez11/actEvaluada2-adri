const logoutController = {};

logoutController.logout = (req, res) => {
    res.clearCookie("authCoookie");
    return res.status(200).json({message: "Sesión cerrada"});
}

export default logoutController;