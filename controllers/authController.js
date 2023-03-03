export const login_get = (req, res) => {
    res.render("login")
}

export const signup_get = (req, res) => {
    res.render("signup")
}

export const login_post = (req, res) => {
    res.send("user login")
}

export const signup_post = (req, res) => {
    res.send("new signup")
}

