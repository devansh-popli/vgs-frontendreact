import React, { useEffect, useState } from "react";
import { InputGroup, FormControl, Button, Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

export const SearchField = () => {
    const [searchText, setSearchText] = useState('');
    const categories = ["Bracelets", "Rings", "Anklets"];
    let currentIndex = 0;
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        setSearchText(categories[currentIndex]);
        currentIndex = (currentIndex + 1) % categories.length;
      }, 4000);
  
      // Clear the interval when the component unmounts
      return () => clearInterval(intervalId);
    }, []); //
  return (
    <InputGroup style={{width:"700px"}}>
      <Form.Control
        placeholder={`Search ${searchText}`}
        aria-label={`Search ${searchText}`}
      />
      <Button variant="outline-secondary" id="button-addon2">
        <FaSearch />
      </Button>
    </InputGroup>
  );
};
