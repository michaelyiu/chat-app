let generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: new Date().getTime()
    }
};

let generateLocationMessage = (from, lat, lng) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${lat},${lng}`,
        createdAt: new Date().getTime()
    }
};

https://www.google.com/maps?q=44.0135839,-79.43662139999999

module.exports = { generateMessage, generateLocationMessage };