import { toast } from "react-toastify";

async function LoginUtil(setlog, data, navigate) {
    try {
        const response = await fetch("http://localhost:8080/api/login", {
            method: "POST",
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({ mail: data.mail, password: data.password })
        });

        const responseText = await response.json();
        if (response.ok) {
            const accessToken = responseText.accessToken
            if (accessToken) {
                setlog(true)
                document.cookie = `user=${responseText.Name}; expires=Fri, 31 Dec 2024 23:59:59 GMT; path=/;`;
                document.cookie = `accessToken=${responseText.accessToken}; expires=Fri, 31 Dec 2024 23:59:59 GMT; path=/;`;
                navigate('/')
                toast.success("Login Successfull!")
            }
            else {
                toast.error("Authentication Failed")
            }
        } else {
            toast.error("Login Failed")
        }
    } catch (err) {
        console.log(err);
    }
}

export default LoginUtil
