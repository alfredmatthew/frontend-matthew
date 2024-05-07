import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [recoverySent, setRecoverySent] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);

  const validateEmail = (value) => {
    // Regular expression for email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const handleSendRecoveryEmail = () => {
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      setIsEmailValid(false);
      return;
    }

    console.log(`Recovery email sent to ${email}`);
    setRecoverySent(true);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    setEmailError(''); // Reset email error when the user starts typing
    setIsEmailValid(true); // Reset email validity
  };

  return (
    <div className="flex justify-center items-center mt-12">
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Password
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Typography variant="body" className="mb-2">
            Forgot your account’s password? Enter your email address and we’ll send you a recovery link.
          </Typography>
          <div className="relative">
            <Input
              label="Email"
              size="lg"
              value={email}
              onChange={handleChangeEmail}
              className={` ${!isEmailValid ? 'border-red-500' : ''}`}
              disabled={recoverySent}
            />
            {!isEmailValid && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              </div>
            )}
          </div>
          {emailError && (
            <Typography variant="error" className="mt-1 text-red-500">
              {emailError}
            </Typography>
          )}
        </CardBody>
        <CardFooter className="pt-0">
          {!recoverySent ? (
            <Button variant="gradient" fullWidth onClick={handleSendRecoveryEmail}>
              Send Recovery Email
            </Button>
          ) : (
            <Typography variant="small" className="flex justify-center" color="blue">
              Recovery email sent to {email}. Check your inbox.
            </Typography>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
