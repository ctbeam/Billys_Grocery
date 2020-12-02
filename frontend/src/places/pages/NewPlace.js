import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './PlaceForm.css';

const NewPlace = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      quantity: {
        value: '',
        isValid: false
      },
      upccode: {
        value: '',
        isValid: false
      },
      location: {
        value: null,
        isValid: false
      },
      creator: {
        value: null,
        isValid: false
      },
      date: {
        value: null,
        isValid: false
      },
      time: {
        value: null,
        isValid: false
      }
    },
    false
  );

  const history = useHistory();

  const placeSubmitHandler = async event => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', formState.inputs.title.value);
      formData.append('quantity', formState.inputs.quantity.value);
      formData.append('upccode', formState.inputs.upccode.value);
      formData.append('location', formState.inputs.location.value);
      formData.append('creator', formState.inputs.creator.value);
      formData.append('date', formState.inputs.date.value);
      formData.append('time', formState.inputs.time.value);
      await sendRequest('http://localhost:5000/api/places', 'POST', formData, {
        Authorization: 'Bearer ' + auth.token
      });
      history.push('/');
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="Product"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid product name."
          onInput={inputHandler}
        />
        <Input
          id="quantity"
          element="textarea"
          label="Quantity"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid quantity."
          onInput={inputHandler}
        />
        <Input
          id="upccode"
          element="input"
          label="UPC Code"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address."
          onInput={inputHandler}
        />
        <Input
          id="location"
          element="input"
          label="Location"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid location."
          onInput={inputHandler}
        />
        <Input
          id="creator"
          element="input"
          label="Employee"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid employee name."
          onInput={inputHandler}
        />
        <Input
          id="date"
          element="input"
          label="Date"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid location."
          onInput={inputHandler}
        />
        <Input
          id="time"
          element="input"
          label="Time"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewPlace;
