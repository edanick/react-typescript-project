import { RegisterUser, RegisterUser2D } from "../@types";

export default function mutateData(data: RegisterUser2D) {
    return (({ first, middle, last, url, alt, state, country, city, street, houseNumber, zip,
        ...r }: any): RegisterUser => (
        {
            name: {
                first: first,
                middle: middle,
                last: last,
            },
            image: {
                url: url,
                alt: alt,
            },
            address: {
                state: state,
                country: country,
                city: city,
                street: street,
                houseNumber: houseNumber,
                zip: zip,
            }, ...r
        }
    ))(data);
}