function getConfig() {
    const USER_ID = "ea011931-80d7-4a92-95af-e5c7f53db911"
    const API_TOKEN = "d4b9b3b2-49b6-4ae2-b155-ad0ea4a15eff"
    return {
        USER_ID,
        API_TOKEN,
        HABITICA_BASE_URL: "https://habitica.com/api/v3",
        CONTENT_URL: "content",
        TASK_URL: "/tasks/user",
        HEADERS: {
            "x-api-user": USER_ID,
            "x-api-key": API_TOKEN,
            "x-client": "InterfaceHabiticaNico",
            "Content-Type": "application/json"
        }
    }
}

const config = getConfig()
