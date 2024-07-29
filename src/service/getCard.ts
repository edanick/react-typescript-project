import axios from 'axios';

export default function getCard(id: string) { return axios.get(`/cards/${id}`); }