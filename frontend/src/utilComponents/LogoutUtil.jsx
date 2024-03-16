async function LogoutUtil(setlog) {
    console.log(setlog)
    try {
        const response = await fetch("https://onlinegoessilly-server.onrender.com/api/logout", {
            method: "POST",
            headers: { 'Content-Type': "application/json" },
        });

        const responseText = await response.json();
        if (response.ok) {
            console.log("Logout Successful");
            setlog(false)
            document.cookie = `user=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
            document.cookie = `accessToken=; expires=Fri, 01 Jan 1970 23:59:59 GMT; path=/;`;
        } else {
            console.log("Logout failed");
        }
    } catch (err) {
        console.log(err);
    }
}

export default LogoutUtil
