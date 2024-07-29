
export type User = {
    _id: string
    image: {
        url: string
    }
    isAdmin: boolean,
    isBusiness: boolean,
    name: {
        first: string,
        last: string
    }
    address: {
        country: string,
        city: string
    }
}