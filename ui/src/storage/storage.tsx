export const getCurrentUser = () => {
    if (window.localStorage.getItem("user") !== null) {
        return JSON.parse(window.localStorage.getItem("user") as string);
    }
}

export const fillStorage = () => {
    return fetch("/api/checkAccess").then((response) => {
        if (response.redirected) {
            window.location.href = response.url;
        } else {
            response.text().then((user) => {
                window.localStorage.setItem("user", user);
                return JSON.parse(window.localStorage.getItem("user") as string);
            });
        }
    })
}