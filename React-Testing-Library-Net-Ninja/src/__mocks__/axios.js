const mockedResponse = {
    data: {
        results: [
            {
                name: {
                    first: "Sekardayu",
                    last: "Pradiani"
                },
                picture: {
                    large: 'https://randomuser.me/api/portraits/women/72.jpg'
                },
                login: {
                    username: 'SekardayuHana'
                }
            }
        ]
    }
}

const mockedAxios = {
    get: jest.fn().mockResolvedValue(mockedResponse)
}

export default mockedAxios