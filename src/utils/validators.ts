import { InputValidationFunction } from '@components/Input/Input';

function stringIncludesWord(word: string): InputValidationFunction {
  return {
    validator: (value: string) => value.includes(word),
    message: `This value must include the word ${word}`
  };
}

function minLenghtFormat(length: number): InputValidationFunction {
  return {
    validator: (value: string) => value.length >= length,
    message: `This value needs to be at least ${length} characters long`
  };
}

function maxLenghtFormat(length: number): InputValidationFunction {
  return {
    validator: (value: string) => value.length <= length,
    message: `This value needs to be less than ${length} characters long`
  };
}

function isRequired(): InputValidationFunction {
  return {
    validator: (value: string) => value.length > 0,
    message: 'This value is required'
  };
}

function isOnlyNumbers(): InputValidationFunction {
  return {
    validator: (value: string) => Boolean(value.match(/^[0-9]+$/)),
    message: 'This value can only contain numbers'
  };
}

function isOnlyLetters(): InputValidationFunction {
  return {
    validator: (value: string) => Boolean(value.match(/^[a-zA-Z]+$/)),
    message: 'This value can only contain letters'
  };
}

function isValidEmail(): InputValidationFunction {
  return {
    validator: (value: string) =>
      Boolean(
        value.match(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ),
    message: 'This value is not a valid email'
  };
}

export {
  stringIncludesWord,
  minLenghtFormat,
  maxLenghtFormat,
  isRequired,
  isOnlyNumbers,
  isOnlyLetters,
  isValidEmail
};
