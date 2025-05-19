const API_BASE_URL = "https://propnerd-backend.onrender.com"; //python ML + stats backend

export const getTop5Last5Games = async () => {
    const response = await fetch(`${API_BASE_URL}/top5_last5`);
    return response.json();
};

export const get5HeatUpPlayers = async () => {
    const response = await fetch(`${API_BASE_URL}/5players_heating_up`);
    return response.json();
};
