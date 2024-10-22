import axios from "axios"

export const getCoinData = async (id) => {
    const myData = axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
    .then((response) => {
        return response.data
    })
    .catch((err) => {
        return err
    })

    return myData
}