import { useEffect, useState } from 'react';

import {toast} from 'react-toastify';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Alert, Button, Container, Divider, Grid, TextField, Typography } from '@mui/material';

import Routes from '../routes/Routes';
import { Card2D } from '../@types';
import validateCard from '../validation/cardValidation';
import useCard from '../hooks/useCard';
import { zipPattern } from '../validation/patterns';


const initialState = {
    title: '',
    subtitle: '',
    phone: '',
    email: '',
    description: '',
    web: '',
    url: '',
    alt: '',
    state: '',
    country: '',
    city: '',
    street: '',
    houseNumber: '',
    zip: '',
}


export default function EditCard() {

    const { id } = useParams(),
        { card } = useCard(id!),
        [formData, setFormData] = useState<Card2D>(initialState),
        {
            title, subtitle, phone, email, description, web, url, alt, state, country, city,
            street, houseNumber, zip
        } = formData,
        [errorsState, setErrorsState] = useState<any>(null);

    useEffect(() => {


        setFormData({
            title: card?.title!,
            subtitle: card?.subtitle!,
            phone: card?.phone!,
            email: card?.email!,
            description: card?.description!,
            web: card?.web!,
            url: card?.image.url!,
            alt: card?.image.alt!,
            state: card?.address.state!,
            country: card?.address.country!,
            city: card?.address.city!,
            street: card?.address.street!,
            houseNumber: String(card?.address.houseNumber!),
            zip: String(card?.address.zip!),
        }
        );

    }, [card]);

    console.log(card);
    const { id: _id } = useParams();

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((formData: Card2D) => ({ ...formData, [e.target.id]: e.target.value }));
    };

    const onUpdateButtonClick = async () => {
        try {

            const errors = validateCard(formData);
            setErrorsState(errors);
            console.log(errors);
            if (errors) return;

            let card = {
                title: title,
                subtitle: subtitle,
                description: description,
                phone: phone,
                email: email,
                web: web,
                image: {
                    url: url,
                    alt: alt,
                },
                address: {
                    state: state,
                    country: country,
                    city: city,
                    street: street,
                    houseNumber: houseNumber
                }
            };

            if (zipPattern.test(zip)) card = { ...card, ...{ address: ({ ...card.address, ...{ zip: parseInt(zip) } }) } };

            await axios.put(`/cards/${_id}`, card);

            toast("Your card is updated sucessfully 👌", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            
        } catch (err: any) {
            
            if (err.response.data.includes("email_1 dup key")) {
                toast.error("E-Mail address is already used for another card", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
            console.log("err", err.response);
        }
    };

    return (
        <Container sx={{ padding: "50px" }}>
            <Typography variant="h2" sx={{ mb: 1, padding: "10px", pb: "0px" }}>
                Card - Edit
            </Typography>
            <Typography variant="body1" sx={{ mb: 1, padding: "3px", ml: "7px" }}>
                Put a new values in the correct input
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Grid container flexDirection={"column"}>
                <TextField id="title" label="Title" variant="outlined" sx={{ mt: "10px" }}
                    onChange={onInputChange} value={title} required />
                {errorsState?.title &&
                    <Alert severity="warning">{errorsState.title}</Alert>}

                <TextField id="subtitle" label="Subtitle" variant="outlined" required
                    sx={{ mt: "10px" }} onChange={onInputChange} value={subtitle} />
                {errorsState?.subtitle &&
                    <Alert severity="warning">{errorsState.subtitle}</Alert>}

                <TextField id="phone" label="Phone Number" variant="outlined"
                    sx={{ mt: "10px" }} onChange={onInputChange} value={phone} required />
                {errorsState?.phone &&
                    <Alert severity="warning">{errorsState.phone}</Alert>}

                <TextField id="description" label="Description" variant="outlined" required
                    sx={{ mt: "10px" }} onChange={onInputChange} value={description} />
                {errorsState?.description &&
                    <Alert severity="warning">{errorsState.description}</Alert>}

                <TextField id="web" label="Web" variant="outlined" sx={{ mt: "10px" }}
                    onChange={onInputChange} value={web} />
                {errorsState?.web &&
                    <Alert severity="warning">{errorsState.web}</Alert>}

                <TextField id="email" label="Email" variant="outlined" sx={{ mt: "10px" }}
                    onChange={onInputChange} value={email} required />
                {errorsState?.email &&
                    <Alert severity="warning">{errorsState.email}</Alert>}

                <TextField id="url" label="Url" variant="outlined" sx={{ mt: "10px" }}
                    onChange={onInputChange} value={url} />
                {errorsState?.url &&
                    <Alert severity="warning">{errorsState.url}</Alert>}

                <TextField id="alt" label="Alt" variant="outlined" sx={{ mt: "10px" }}
                    onChange={onInputChange} value={alt} />
                {errorsState?.alt &&
                    <Alert severity="warning">{errorsState.alt}</Alert>}

                <TextField id="state" label="State" variant="outlined" sx={{ mt: "10px" }}
                    onChange={onInputChange} value={state} />
                {errorsState?.state &&
                    <Alert severity="warning">{errorsState.state}</Alert>}

                <TextField id="country" label="Country" variant="outlined" sx={{ mt: "10px" }}
                    onChange={onInputChange} value={country} required />
                {errorsState?.country &&
                    <Alert severity="warning">{errorsState.country}</Alert>}

                <TextField id="city" label="City" variant="outlined" sx={{ mt: "10px" }}
                    onChange={onInputChange} value={city} required />
                {errorsState?.city &&
                    <Alert severity="warning">{errorsState.city}</Alert>}

                <TextField id="street" label="Street" variant="outlined" sx={{ mt: "10px" }}
                    onChange={onInputChange} value={street} required />
                {errorsState?.street &&
                    <Alert severity="warning">{errorsState.street}</Alert>}

                <TextField id="houseNumber" label="House Number" variant="outlined" required
                    sx={{ mt: "10px" }} onChange={onInputChange} value={houseNumber} />
                {errorsState?.houseNumber &&
                    <Alert severity="warning">{errorsState.houseNumber}</Alert>}

                <TextField id="zip" label="Zip" variant="outlined" sx={{ mt: "10px" }}
                    onChange={onInputChange} value={zip} />
                {errorsState?.zip &&
                    <Alert severity="warning">{errorsState.zip}</Alert>}
            </Grid>
            <Grid container spacing={2}>
                <Grid item lg={8} md={8} sm={8} xs>
                    <Button
                        variant="outlined" onClick={onUpdateButtonClick}
                        sx={{ mt: 2, width: "100%", ml: "0%", bgcolor: "lightskyblue" }}>
                        Update Changes
                    </Button>
                </Grid>
                <Grid item xs>
                    <Link to={Routes.Home}>
                        <Button variant="outlined" sx={{
                            mt: 2, width: "100%", ml: "0%", bgcolor:
                                "navy", color: "gray",
                        }}>
                            Discard Changes
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        </Container>
    );
}