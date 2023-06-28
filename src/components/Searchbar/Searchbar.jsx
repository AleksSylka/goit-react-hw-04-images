import { SearchbarForm, SearchbarBtn, SearchbarInput, SearchbarTop } from "./Searchbar.styled.jsx";
import { FcSearch } from "react-icons/fc";
import { toast } from 'react-toastify';
import { useState } from "react";

export const Searchbar = (props) => {

    const [inputData, setInputData] = useState('');

    const handleChange = event => {
        setInputData(event.currentTarget.value);
    }

    const formSubmit = (event) => {
        event.preventDefault();
        if (inputData === '') {
            return toast(`Enter your search data`);
        }
        props.onSubmit(inputData);
        setInputData('');
    }

    return (
            <SearchbarTop onSubmit={formSubmit}>
                <SearchbarForm>
            
                    <SearchbarBtn type="submit" className="button">
                        <FcSearch size='100%'/>
                    
                </SearchbarBtn>

                <SearchbarInput
                    className="input"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    name="inputData"
                    onChange={handleChange}
                    value={inputData}
                />
            </SearchbarForm>
        </SearchbarTop>)
}