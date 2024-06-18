export const {
    PORT = 8080,
    SALT_ROUNDS = 10,
} = process.env

// const url = new URL('https://nominatim.openstreetmap.org/search')
// // url.searchParams.append('q', 'El Prat de Llobregat, Barcelona')
// url.searchParams.append('lat', '-11.96914')
// url.searchParams.append('lon', '-77.00203')
// url.searchParams.append('format', 'json')
// console.log("URL", url)
// const reponse = await fetch(url);
// const json = await reponse.json()
// console.log("JSON", json)