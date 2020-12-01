import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {
  VALIDATOR_REQUIRE
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
        value: '',
        isValid: false
      },
      creator: {
        value: '',
        isValid: false
      },
      time: {
        value: '',
        isValid: false
      },
      date: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const history = useHistory();

  const placeSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        'http://localhost:5000/api/places',
        'POST',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address: formState.inputs.address.value,
          creator: auth.userId
        }),
        { 'Content-Type': 'application/json' }
      );
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
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input
          id="quantity"
          element="number"
          label="Quantity"
          validators={[VALIDATOR_REQUIRE]}
          errorText="Please enter a valid quantity"
          onInput={inputHandler}
        />
        <Input
          id="upccode"
          element="number"
          label="upccode"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid UPC Code."
          onInput={inputHandler}
        />
        <Input
          id="location"
          element="input"
          label="location"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid location."
          onInput={inputHandler}
        />
        <Input
          id="creator"
          element="input"
          label="creator"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid creator."
          onInput={inputHandler}
        />
        <Input
          id="time"
          element="input"
          label="time"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid time."
          onInput={inputHandler}
        />
        <Input
          id="date"
          element="input"
          label="date"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid date."
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
