

const loginService = async (username, password) => {
    // TODO: check if admin exists wih username password. 
    
    const driver = await Driver.find({username: username, password: password});
    if (!driver) 
        throw new Error("No driver found");
    return driver;
};



export default {loginService};