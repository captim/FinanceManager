export function performLogout() {
    window.localStorage.removeItem("user")
    window.location.href = "/api/logout";
}