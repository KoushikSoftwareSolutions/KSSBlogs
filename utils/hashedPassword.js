import bcrypt from "bcryptjs"

const hashedPassword = async (password) => {

    const salt = await bcrypt.genSalt(10);
    const hasedPwd = await bcrypt.hash(password,salt);

    return hasedPwd;

}

export default hashedPassword;