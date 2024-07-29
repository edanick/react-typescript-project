import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

import Search from './Search';
import SearchIconWrapper from './SearchIconWrapper';
import StyledInputBase from './StyledInputBase';

export default function QueryInput() {

    const [value, setValue] = useState(''),
        navigate = useNavigate(),

        onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
            navigate(`${location.pathname}?q=${e.target.value}`);
        };

    return (
        <Search>
            <SearchIconWrapper><SearchIcon /></SearchIconWrapper>
            <StyledInputBase placeholder="Search…"
                inputProps={{ "aria-label": "search" }} value={value} onChange={onInputChange} />
        </Search>
    );
}